const Expense = require('../models/Expense.model')
const schema = require('../schema/expense.schema')
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {
  let data = req.body

  //console.log(req.get('Authorization'));
  const validate = schema.validate(data)

  if (validate) {
    let exp = new Expense()

    let token = req.headers.authorization.split(' ')[1]
    let decoded = jwt.decode(token)

    exp.name = data.name
    exp.description = data.description
    exp.amount = data.amount
    exp.created_by = decoded?.user
    exp.created_at = data.created_at

    await exp
      .save()
      .then((result) => {

        res.status(201).send({
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
  }

  if (validate.error != '') {
    return res.status(400).json({
      error: validate.error,
      success: false,
      message: 'Please try again',
    })
  }
}
