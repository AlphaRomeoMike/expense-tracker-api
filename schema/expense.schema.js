const Joi = require('joi')

const ExpenseSchema = Joi.object({
   name: Joi.string().min(3).required(),
   description: Joi.string().min(3).required(),
   amount: Joi.number()
});

module.exports = ExpenseSchema;