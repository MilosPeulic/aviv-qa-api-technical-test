import { expect } from "playwright/test";
import { URLS, HEADER } from "../../../fixtures";

export class UpdateBookPage {
  constructor(page) {
    this.page = page;
  }

  async update({ header, bookId, payload, statusCode = 200 }) {
    const response = await this.page.request.put(
      `${process.env.BASE_URL}${URLS.API_BOOKS}/${bookId}`,
      {
        headers: header,
        data: payload,
      }
    );

    expect(response.status()).toBe(statusCode);
    const responseJSON = await response.json();
    return responseJSON;
  }

  async checkIsBookUpdated(responseBookBeforeUpdate, responseBookAfterUpdate) {
    expect(responseBookBeforeUpdate.title).not.toBe(
      responseBookAfterUpdate.title
    );
    expect(responseBookBeforeUpdate.author).not.toBe(
      responseBookAfterUpdate.author
    );
    expect(responseBookBeforeUpdate.publishedDate).not.toBe(
      responseBookAfterUpdate.publishedDate
    );
  }
}
