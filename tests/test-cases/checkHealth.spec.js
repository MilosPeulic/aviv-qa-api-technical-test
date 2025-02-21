import { expect } from "@playwright/test";
import {
  apiIsHealthySchema,
  validateSchema,
  validationSchemaSuccess,
} from "../../utils/schemasValidator";
import { test } from "../modules/base/pomFixture";

test.describe("Check API health", () => {
  test("Check API health", async ({ checkHealth }) => {
    const response = await checkHealth.checkApiHealth({});
    const validatedSchema = validateSchema(apiIsHealthySchema, response);
    const validationSuccess = validationSchemaSuccess(validatedSchema);
    expect(validationSuccess).toBeTruthy();
  });
});
