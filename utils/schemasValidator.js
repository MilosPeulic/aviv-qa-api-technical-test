import { error } from "console";

const Joi = require("joi");

const bookSchema = Joi.object({
  id: Joi.number().integer().max(1000).required(),
  title: Joi.string().min(1).uppercase().required(),
  author: Joi.string().min(1).required(),
  publishedDate: Joi.string().isoDate().required(),
});

const welcomeMessageSchema = Joi.object({
  message: Joi.string().min(1).required(),
  endpoints: Joi.object({
    docs: Joi.string().min(1).required(),
    books: Joi.string().min(1).required(),
    health: Joi.string().min(1).required(),
  }),
});

const allBooksSchema = Joi.array().items(bookSchema).required();

const errorMessageSchema = Joi.object({
  error: Joi.string().min(1).required(),
});

const bookNotFoundErrorMessageSchema = Joi.object({
  message: Joi.string().min(1).required(),
});

const apiIsHealthySchema = Joi.object({
  status: Joi.string().length(2).required(),
  timestamp: Joi.string().isoDate().required(),
});

const validateSchema = (schema, response) => {
  return schema.validate(response);
};

const validationSchemaSuccess = (schemaResponse) => {
  if (schemaResponse.hasOwnProperty("error")) {
    return false;
  }
  return true;
};

export {
  validateSchema,
  validationSchemaSuccess,
  bookSchema,
  welcomeMessageSchema,
  allBooksSchema,
  errorMessageSchema,
  bookNotFoundErrorMessageSchema,
  apiIsHealthySchema,
};
