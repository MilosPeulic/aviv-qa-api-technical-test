import { test } from "../modules/base/pomFixture";
import { BOOK_PAYLOAD, HEADER, NONEXISTING_ID } from "../../fixtures";
import {
  bookNotFoundErrorMessageSchema,
  errorMessageSchema,
  validateSchema,
  validationSchemaSuccess,
} from "../../utils/schemasValidator";
import { expect } from "@playwright/test";

test.describe("Remove one Book", () => {
  let createdBookId;

  test.beforeEach("Create a book for removal", async ({ createNewBook }) => {
    let response = await createNewBook.create({
      header: HEADER,
      payload: BOOK_PAYLOAD,
    });
    createdBookId = response.id;
  });

  test("Remove book", async ({ removeBook, getBook }) => {
    await removeBook.remove({ header: HEADER, bookId: createdBookId });
    await getBook.getBook({
      header: HEADER,
      bookId: createdBookId,
      statusCode: 404,
    });
  });

  test.describe("Invalid tests - Remove book", () => {
    test("Can't remove nonexisting book", async ({ removeBook }) => {
      const response = await removeBook.remove({
        header: HEADER,
        bookId: NONEXISTING_ID,
        statusCode: 404,
      });
      const validatedSchema = validateSchema(
        bookNotFoundErrorMessageSchema,
        response
      );
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't remove book without valid authentication", async ({
      removeBook,
    }) => {
      const response = await removeBook.remove({
        bookId: NONEXISTING_ID,
        statusCode: 401,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });
  });
});
