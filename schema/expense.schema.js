const Joi = require('joi')

const ExpenseSchema = Joi.object({
   name: Joi.string().min(3).required(),
   description: Joi.string().min(3).required(),
   amount: Joi.number(),
   created_by: Joi.string().required(),
   created_at: Joi.date()
});

module.exports = ExpenseSchema;