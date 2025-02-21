import { faker } from "@faker-js/faker";

const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

const INVALID_DATA_TYPES = {
  NUMBER: 123.45,
  BOOLEAN: false,
  ARRAY: ["a", 1, {}],
  OBJECT: { A: "a", B: "b" },
};

const LONG_STRING = faker.lorem.words(50).toUpperCase();

const ONE_LETTER_STRING = "a";

const SPECIAL_CHARACTERS_STRING = "!@#$%^&*()";

const NONEXISTING_ID = 9999999;

const EMPTY_OBJECT = {};

export {
  METHODS,
  INVALID_DATA_TYPES,
  LONG_STRING,
  ONE_LETTER_STRING,
  SPECIAL_CHARACTERS_STRING,
  NONEXISTING_ID,
  EMPTY_OBJECT,
};
