import { expect } from "@playwright/test";
import { test } from "../modules/base/pomFixture";
import {
  bookNotFoundErrorMessageSchema,
  bookSchema,
  errorMessageSchema,
  validateSchema,
  validationSchemaSuccess,
} from "../../utils/schemasValidator";
import { HEADER, NONEXISTING_ID } from "../../fixtures";

test.describe("Get one Book", () => {
  test("Get a Book", async ({ getBook }) => {
    const response = await getBook.getBook({ header: HEADER, bookId: 2 });
    const validatedSchema = validateSchema(bookSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
  });

  test.describe("Invalid tests - Get book", () => {
    test("Can't get nonexisting book", async ({ getBook }) => {
      const response = await getBook.getBook({
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
      getBook,
    }) => {
      const response = await getBook.getBook({
        bookId: NONEXISTING_ID,
        statusCode: 401,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });
  });
});
