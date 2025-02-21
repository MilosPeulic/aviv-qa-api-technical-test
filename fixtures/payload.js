import { faker } from "@faker-js/faker";

const BOOK_PAYLOAD = {
  title: faker.lorem.words(3).toUpperCase(),
  author: `${faker.person.firstName()} ${faker.person.lastName()}`,
  publishedDate: faker.date.past(100).toISOString(),
};

export { BOOK_PAYLOAD };
