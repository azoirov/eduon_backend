const Joi = require("joi");

module.exports = Joi.object({
  phone_number: Joi.number().required().min(998000000000).max(998999999999),
  password: Joi.string().required().min(6).max(32),
});
