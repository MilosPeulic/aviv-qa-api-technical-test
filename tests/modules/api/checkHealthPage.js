import { expect } from "playwright/test";
import { URLS, HEADER } from "../../../fixtures";

export class CheckHealthPage {
  constructor(page) {
    this.page = page;
  }

  async checkApiHealth({ statusCode = 200 }) {
    const response = await this.page.request.get(
      `${process.env.BASE_URL}${URLS.API_HEALTH}`,
      {
        headers: HEADER,
      }
    );

    expect(response.status()).toBe(statusCode);
    const responseJSON = await response.json();
    return responseJSON;
  }
}
