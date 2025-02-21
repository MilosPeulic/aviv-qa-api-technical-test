import { expect } from "playwright/test";
import { URLS, HEADER } from "../../../fixtures";

export class PartiallyUpdateBookPage {
  constructor(page) {
    this.page = page;
  }

  async updatePartially({ header, bookId, payload, statusCode = 200 }) {
    const response = await this.page.request.patch(
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

  async checkIsBookPropertyUpdated(
    property,
    responseBookBeforeUpdate,
    responseBookAfterUpdate
  ) {
    switch (property) {
      case "title":
        expect(responseBookBeforeUpdate.title).not.toBe(
          responseBookAfterUpdate.title
        );
        expect(responseBookBeforeUpdate.author).toBe(
          responseBookAfterUpdate.author
        );
        expect(responseBookBeforeUpdate.publishedDate).toBe(
          responseBookAfterUpdate.publishedDate
        );
        break;
      case "author":
        expect(responseBookBeforeUpdate.title).toBe(
          responseBookAfterUpdate.title
        );
        expect(responseBookBeforeUpdate.author).not.toBe(
          responseBookAfterUpdate.author
        );
        expect(responseBookBeforeUpdate.publishedDate).toBe(
          responseBookAfterUpdate.publishedDate
        );
        break;
      case "publishedDate":
        expect(responseBookBeforeUpdate.title).toBe(
          responseBookAfterUpdate.title
        );
        expect(responseBookBeforeUpdate.author).toBe(
          responseBookAfterUpdate.author
        );
        expect(responseBookBeforeUpdate.publishedDate).not.toBe(
          responseBookAfterUpdate.publishedDate
        );
        break;

      default:
        break;
    }
  }
}
