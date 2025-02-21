import { expect } from "playwright/test";
import { URLS } from "../../../fixtures";

export class CreateNewBookPage {
  constructor(page) {
    this.page = page;
  }

  async create({ header, payload, statusCode = 201 }) {
    const response = await this.page.request.post(
      `${process.env.BASE_URL}${URLS.API_BOOKS}`,
      {
        headers: header,
        data: payload,
      }
    );

    expect(response.status()).toBe(statusCode);
    const responseJSON = await response.json();
    return responseJSON;
  }
}
