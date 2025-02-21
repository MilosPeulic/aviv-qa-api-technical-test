import { test as baseTest } from "@playwright/test";
import { WelcomePage } from "../api/welcomePage";
import { GetAllBooksPage } from "../api/getAllBooksPage";
import { CreateNewBookPage } from "../api/createNewBookPage";
import { GetBookPage } from "../api/getBookPage";
import { UpdateBookPage } from "../api/updateBookPage";
import { RemoveBookPage } from "../api/removeBookPage";
import { PartiallyUpdateBookPage } from "../api/partiallyUpdateBookPage";
import { CheckHealthPage } from "../api/checkHealthPage";

const testPages = baseTest.extend({
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  getAllBooks: async ({ page }, use) => {
    await use(new GetAllBooksPage(page));
  },
  createNewBook: async ({ page }, use) => {
    await use(new CreateNewBookPage(page));
  },
  getBook: async ({ page }, use) => {
    await use(new GetBookPage(page));
  },
  updateBook: async ({ page }, use) => {
    await use(new UpdateBookPage(page));
  },
  removeBook: async ({ page }, use) => {
    await use(new RemoveBookPage(page));
  },
  partiallyUpdateBook: async ({ page }, use) => {
    await use(new PartiallyUpdateBookPage(page));
  },
  checkHealth: async ({ page }, use) => {
    await use(new CheckHealthPage(page));
  },
});

export const test = testPages;
