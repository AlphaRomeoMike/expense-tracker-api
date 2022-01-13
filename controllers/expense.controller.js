const Expense = require('../models/Expense.model')
const schema = require('../schema/expense.schema')

exports.create = async (req, res, next) => {
  let data = req.body

  const validate = schema.validate(data)

  if (!validate) {
    let exp = new Expense()

    exp.name = data.name
    exp.description = data.description
    exp.amount = data.amount
    exp.created_by = data.created_by
    exp.created_at = data.created_at

    await exp
      .save()
      .then((result) => {
        return res.status(201).json({
          message: 'Expense added succesfully',
          success: true,
          data: result,
        })
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          success: false,
          message: 'Something went wrong',
        })
      })
  } else {
    res.status(400).json({
      error: validate.error.details,
      success: false,
      message: 'Please try again',
    })
  }
}
