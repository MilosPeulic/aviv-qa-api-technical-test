import { expect } from "playwright/test";
import { HEADER, URLS } from "../../../fixtures";

export class RemoveBookPage {
  constructor(page) {
    this.page = page;
  }

  async remove({ header, bookId, statusCode = 204 }) {
    const response = await this.page.request.delete(
      `${process.env.BASE_URL}${URLS.API_BOOKS}/${bookId}`,
      {
        headers: header,
      }
    );

    expect(response.status()).toBe(statusCode);
  }
}
