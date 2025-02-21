import { expect } from "playwright/test";
import { URLS } from "../../../fixtures";

export class InvalidApiCallsPage {
  constructor(page) {
    this.page = page;
  }

  async apiCall({ method, header, payload = null, statusCode = 400 }) {
    const requestOptions = {
      headers: header,
    };
    if (payload) {
      requestOptions.data = payload;
    }
    const response = await this.page.request[method](
      `${process.env.BASE_URL}${URLS.API_BOOKS}`,
      requestOptions
    );

    expect(response.status()).toBe(statusCode);
    if (response.status() === 404) {
      return;
    }
    const responseJSON = await response.json();
    return responseJSON;
  }
}
