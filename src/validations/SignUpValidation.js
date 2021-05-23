const Joi = require("joi");

module.exports = Joi.object({
  full_name: Joi.string().required().min(3).max(32),
  phone_number: Joi.number().required().min(998000000000).max(998999999999),
  password: Joi.string().required().min(6).max(32),
  age: Joi.number().required().min(7),
});
