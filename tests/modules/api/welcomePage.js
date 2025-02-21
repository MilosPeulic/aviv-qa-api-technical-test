import { expect } from "playwright/test";

export class WelcomePage {
  constructor(page) {
    this.page = page;
  }

  async getApiInformation({ statusCode = 200 }) {
    const response = await this.page.request.get(`${process.env.BASE_URL}`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    expect(response.status()).toBe(statusCode);
    const responseJSON = await response.json();
    return responseJSON;
  }
}
