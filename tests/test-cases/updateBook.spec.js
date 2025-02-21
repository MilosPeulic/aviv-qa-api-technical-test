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
  bookSchema,
  validateSchema,
  validationSchemaSuccess,
  errorMessageSchema,
  bookNotFoundErrorMessageSchema,
} from "../../utils/schemasValidator";
import { test } from "../modules/base/pomFixture";

test.describe("Update a Book", () => {
  let createdBookId;
  let responseBeforeUpdate;

  test.beforeEach("Create a book for update", async ({ createNewBook }) => {
    responseBeforeUpdate = await createNewBook.create({
      header: HEADER,
      payload: BOOK_PAYLOAD,
    });
    createdBookId = responseBeforeUpdate.id;
  });

  test("Update existing Book", async ({ updateBook }) => {
    const response = await updateBook.update({
      header: HEADER,
      bookId: createdBookId,
      payload: BOOK_PAYLOAD,
    });
    const validatedSchema = validateSchema(bookSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    await updateBook.checkIsBookUpdated(createdBookId, response);
  });

  test("Update a new Book with long string in title", async ({
    updateBook,
  }) => {
    const payload = { ...BOOK_PAYLOAD, title: LONG_STRING };

    const response = await updateBook.update({
      header: HEADER,
      bookId: createdBookId,
      payload: payload,
    });

    const validatedSchema = validateSchema(bookSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    await updateBook.checkIsBookUpdated(createdBookId, response);
  });

  test("Update a new Book with special characters string in title and author", async ({
    updateBook,
  }) => {
    const payload = {
      ...BOOK_PAYLOAD,
      title: SPECIAL_CHARACTERS_STRING,
      author: SPECIAL_CHARACTERS_STRING,
    };

    const response = await updateBook.update({
      header: HEADER,
      bookId: createdBookId,
      payload: payload,
    });
    const validatedSchema = validateSchema(bookSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    await updateBook.checkIsBookUpdated(createdBookId, response);
  });

  test.describe("Invalid tests - updating a book", () => {
    test("Can't update Book with empty object", async ({ updateBook }) => {
      const response = await updateBook.update({
        header: HEADER,
        bookId: createdBookId,
        payload: EMPTY_OBJECT,
        statusCode: 400,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't update books without valid authentication", async ({
      updateBook,
    }) => {
      const response = await updateBook.update({
        payload: BOOK_PAYLOAD,
        statusCode: 401,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't update nonexisting Book", async ({ updateBook }) => {
      const response = await updateBook.update({
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

    test("Can't update books without data in body", async ({ updateBook }) => {
      const response = await updateBook.update({
        header: HEADER,
        statusCode: 400,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    for (let property in BOOK_PAYLOAD) {
      test(`Can't update book with missing property - ${property}`, async ({
        updateBook,
      }) => {
        const { [property]: _, ...payloadWithMissingProperty } = BOOK_PAYLOAD;

        const response = await updateBook.update({
          header: HEADER,
          payload: payloadWithMissingProperty,
          statusCode: 400,
        });
        const validatedSchema = validateSchema(errorMessageSchema, response);
        const validationSuccess = validationSchemaSuccess(validatedSchema);
        expect(validationSuccess).toBeTruthy();
      });
    }

    for (let data in INVALID_DATA_TYPES) {
      for (let property in BOOK_PAYLOAD) {
        test(`Can't update book with invalid value -${data}- in property - ${property}`, async ({
          updateBook,
        }) => {
          const payload = {
            ...BOOK_PAYLOAD,
            [property]: INVALID_DATA_TYPES[data],
          };

          const response = await updateBook.update({
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
