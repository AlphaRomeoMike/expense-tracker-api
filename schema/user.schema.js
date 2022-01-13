const Joi = require('joi')

const RegisterSchema = Joi.object({
   name: Joi.string().min(3).required(),
   username: Joi.string().min(3).max(20).required(),
   email: Joi.string().email({ tlds: { allow: false } }).required(),
   password: Joi.string().required(),
   created_at: Joi.date()
});

module.exports = RegisterSchema;