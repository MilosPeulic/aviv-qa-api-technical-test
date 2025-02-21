import { expect } from "@playwright/test";
import {
  BOOK_PAYLOAD,
  HEADER,
  LONG_STRING,
  SPECIAL_CHARACTERS_STRING,
  METHODS,
  INVALID_DATA_TYPES,
} from "../../fixtures";
import {
  bookSchema,
  validateSchema,
  validationSchemaSuccess,
  errorMessageSchema,
} from "../../utils/schemasValidator";
import { test } from "../modules/base/pomFixture";

test.describe.configure({ mode: "serial" });
test.describe("Create a new Book", () => {
  let noOfBooksBeforeCreating;
  let noOfBooksAfterCreating;

  test.beforeEach("Get all books", async ({ getAllBooks }) => {
    let response = await getAllBooks.getAllBooks({ header: HEADER });
    noOfBooksBeforeCreating = response.length;
  });

  test("Create a new Book", async ({ createNewBook, getAllBooks }) => {
    const response = await createNewBook.create({
      header: HEADER,
      payload: BOOK_PAYLOAD,
    });
    const validatedSchema = validateSchema(bookSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    let responseGetAllAfterCreating = await getAllBooks.getAllBooks({
      header: HEADER,
    });
    noOfBooksAfterCreating = await responseGetAllAfterCreating.length;
    expect(noOfBooksAfterCreating).toBe(noOfBooksBeforeCreating + 1);
  });

  test("Create a new Book with long string in title", async ({
    createNewBook,
    getAllBooks,
  }) => {
    const payload = { ...BOOK_PAYLOAD, title: LONG_STRING };

    const response = await createNewBook.create({
      header: HEADER,
      payload: payload,
    });
    const validatedSchema = validateSchema(bookSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    let responseGetAllAfterCreating = await getAllBooks.getAllBooks({
      header: HEADER,
    });
    noOfBooksAfterCreating = await responseGetAllAfterCreating.length;
    expect(noOfBooksAfterCreating).toBe(noOfBooksBeforeCreating + 1);
  });

  test("Create a new Book with special characters string in title and author", async ({
    createNewBook,
    getAllBooks,
  }) => {
    const payload = {
      ...BOOK_PAYLOAD,
      title: SPECIAL_CHARACTERS_STRING,
      author: SPECIAL_CHARACTERS_STRING,
    };

    const response = await createNewBook.create({
      header: HEADER,
      payload: payload,
    });

    const validatedSchema = validateSchema(bookSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
    let responseGetAllAfterCreating = await getAllBooks.getAllBooks({
      header: HEADER,
    });
    noOfBooksAfterCreating = await responseGetAllAfterCreating.length;
    expect(noOfBooksAfterCreating).toBe(noOfBooksBeforeCreating + 1);
  });

  test.describe("Invalid tests - Creating a book", () => {
    test("Can't create books without valid authentication", async ({
      createNewBook,
    }) => {
      const response = await createNewBook.create({
        payload: BOOK_PAYLOAD,
        statusCode: 401,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't create books without data in body", async ({
      createNewBook,
    }) => {
      const response = await createNewBook.create({
        header: HEADER,
        statusCode: 400,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    test("Can't create a new Book with invalid method", async ({
      invalidApiCalls,
    }) => {
      const response = await invalidApiCalls.apiCall({
        method: METHODS.DELETE,
        header: HEADER,
        payload: BOOK_PAYLOAD,
        statusCode: 404,
      });
      const validatedSchema = validateSchema(errorMessageSchema, response);
      const validationSuccess = validationSchemaSuccess(validatedSchema);
      expect(validationSuccess).toBeTruthy();
    });

    for (let property in BOOK_PAYLOAD) {
      test(`Can't create book with missing property - ${property}`, async ({
        createNewBook,
      }) => {
        const { [property]: _, ...payloadWithMissingProperty } = BOOK_PAYLOAD;

        const response = await createNewBook.create({
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
        test(`Can't create book with invalid value -${data}- in property - ${property}`, async ({
          createNewBook,
        }) => {
          const payload = {
            ...BOOK_PAYLOAD,
            [property]: INVALID_DATA_TYPES[data],
          };

          const response = await createNewBook.create({
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
