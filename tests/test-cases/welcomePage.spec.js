import { expect } from "@playwright/test";
import {
  validateSchema,
  validationSchemaSuccess,
  welcomeMessageSchema,
} from "../../utils/schemasValidator";
import { test } from "../modules/base/pomFixture";

test.describe("Welcome message and endpoints information", () => {
  test("Get API information", async ({ welcomePage }) => {
    const response = await welcomePage.getApiInformation({});
    const validatedSchema = validateSchema(welcomeMessageSchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
  });
});
