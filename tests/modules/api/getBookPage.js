import { expect } from "playwright/test";
import { HEADER, URLS } from "../../../fixtures";

export class GetBookPage {
  constructor(page) {
    this.page = page;
  }

  async getBook({ header, bookId, statusCode = 200 }) {
    const response = await this.page.request.get(
      `${process.env.BASE_URL}${URLS.API_BOOKS}/${bookId}`,
      {
        headers: header,
      }
    );

    expect(response.status()).toBe(statusCode);
    const responseJSON = await response.json();
    return responseJSON;
  }
}
