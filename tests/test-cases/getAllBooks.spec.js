import { test } from "../modules/base/pomFixture";
import { expect } from "@playwright/test";
import {
  allBooksSchema,
  errorMessageSchema,
  validateSchema,
  validationSchemaSuccess,
} from "../../utils/schemasValidator";
import { HEADER, METHODS } from "../../fixtures";

test.describe("Get all Books", () => {
  test("Get all Books", async ({ getAllBooks }) => {
    const response = await getAllBooks.getAllBooks({ header: HEADER });
    const validatedSchema = validateSchema(allBooksSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
  });

  test.describe("Invalid test case", () => {
    test("Can't get books without valid authentication", async ({
      getAllBooks,
    }) => {
      const response = await getAllBooks.getAllBooks({ statusCode: 401 });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test(`Can't get books with POST method`, async ({ invalidApiCalls }) => {
      const response = await invalidApiCalls.apiCall({
        method: METHODS.POST,
        header: HEADER,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test(`Can't get books with PUT method`, async ({ invalidApiCalls }) => {
      const response = await invalidApiCalls.apiCall({
        method: METHODS.PUT,
        header: HEADER,
        statusCode: 404,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test(`Can't get books with PATCH method`, async ({ invalidApiCalls }) => {
      const response = await invalidApiCalls.apiCall({
        method: METHODS.PATCH,
        header: HEADER,
        statusCode: 404,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test(`Can't get books with DELETE method`, async ({ invalidApiCalls }) => {
      const response = await invalidApiCalls.apiCall({
        method: METHODS.DELETE,
        header: HEADER,
        statusCode: 404,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });
  });
});
