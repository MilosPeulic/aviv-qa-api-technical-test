import { expect } from "playwright/test";
import { URLS } from "../../../fixtures";

export class GetAllBooksPage {
  constructor(page) {
    this.page = page;
  }

  async getAllBooks({ header, statusCode = 200 }) {
    const response = await this.page.request.get(
      `${process.env.BASE_URL}${URLS.API_BOOKS}`,
      {
        headers: header,
      }
    );

    expect(response.status()).toBe(statusCode);
    const responseJSON = await response.json();
    return responseJSON;
  }
}
