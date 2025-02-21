import { expect } from "@playwright/test";
import {
  BOOK_PAYLOAD,
  EMPTY_OBJECT,
  HEADER,
  INVALID_DATA_TYPES,
  LONG_STRING,
  NONEXISTING_ID,
  SPECIAL_CHARACTERS_STRING,
} from "../../fixtures";
import {
  bookNotFoundErrorMessageSchema,
  bookSchema,
  errorMessageSchema,
  validateSchema,
  validationSchemaSuccess,
} from "../../utils/schemasValidator";
import { test } from "../modules/base/pomFixture";

test.describe("Partially update a Book", () => {
  let createdBookId;
  let responseBeforeUpdate;

  test.beforeEach(
    "Create a book for partial update",
    async ({ createNewBook }) => {
      responseBeforeUpdate = await createNewBook.create({
        header: HEADER,
        payload: BOOK_PAYLOAD,
      });
      createdBookId = responseBeforeUpdate.id;
    }
  );

  for (let property in BOOK_PAYLOAD) {
    test(`Partially update books property - ${property}`, async ({
      partiallyUpdateBook,
    }) => {
      let payload = { [property]: BOOK_PAYLOAD[property] };

      const responseAfterUpdate = await partiallyUpdateBook.updatePartially({
        header: HEADER,
        bookId: createdBookId,
        payload: payload,
      });

      const validatedSchema = validateSchema(bookSchema, responseAfterUpdate);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
      await partiallyUpdateBook.checkIsBookPropertyUpdated(
        [property],
        responseBeforeUpdate,
        responseAfterUpdate
      );
    });
  }

  test("Partially update only Book title with long string", async ({
    partiallyUpdateBook,
  }) => {
    let payload = { ...BOOK_PAYLOAD, title: LONG_STRING };

    const responseAfterUpdate = await partiallyUpdateBook.updatePartially({
      header: HEADER,
      bookId: createdBookId,
      payload: payload,
    });

    const validatedSchema = validateSchema(bookSchema, responseAfterUpdate);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    await partiallyUpdateBook.checkIsBookPropertyUpdated(
      "title",
      responseBeforeUpdate,
      responseAfterUpdate
    );
  });

  test("Partially update only Book title with special characters string", async ({
    partiallyUpdateBook,
  }) => {
    const payload = {
      ...BOOK_PAYLOAD,
      title: SPECIAL_CHARACTERS_STRING,
    };

    const responseAfterUpdate = await partiallyUpdateBook.updatePartially({
      header: HEADER,
      bookId: createdBookId,
      payload: payload,
    });
    const validatedSchema = validateSchema(bookSchema, responseAfterUpdate);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    await partiallyUpdateBook.checkIsBookPropertyUpdated(
      "title",
      responseBeforeUpdate,
      responseAfterUpdate
    );
  });

  test.describe("Invalid tests - updating partially book", () => {
    test("Can't update partially Book with empty object", async ({
      partiallyUpdateBook,
    }) => {
      const response = await partiallyUpdateBook.updatePartially({
        header: HEADER,
        bookId: createdBookId,
        payload: EMPTY_OBJECT,
        statusCode: 400,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't partially update books without valid authentication", async ({
      partiallyUpdateBook,
    }) => {
      const response = await partiallyUpdateBook.updatePartially({
        payload: BOOK_PAYLOAD,
        bookId: createdBookId,
        statusCode: 401,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't partially update nonexisting Book", async ({
      partiallyUpdateBook,
    }) => {
      const response = await partiallyUpdateBook.updatePartially({
        header: HEADER,
        bookId: NONEXISTING_ID,
        payload: BOOK_PAYLOAD,
        statusCode: 404,
      });
      const validatedSchema = validateSchema(
        bookNotFoundErrorMessageSchema,
        response
      );
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't partially partially books without data in body", async ({
      partiallyUpdateBook,
    }) => {
      const response = await partiallyUpdateBook.updatePartially({
        header: HEADER,
        statusCode: 400,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    for (let data in INVALID_DATA_TYPES) {
      for (let property in BOOK_PAYLOAD) {
        test(`Can't partially update book with invalid value -${data}- in property - ${property}`, async ({
          partiallyUpdateBook,
        }) => {
          let payload = { [property]: INVALID_DATA_TYPES[data] };

          const response = await partiallyUpdateBook.updatePartially({
            header: HEADER,
            payload: payload,
            statusCode: 400,
          });
          const validatedSchema = validateSchema(errorMessageSchema, response);
          const validationSuccess = validationSchemaSuccess(validatedSchema);
          expect(validationSuccess).toBeTruthy();
        });
      }
    }
  });
});
