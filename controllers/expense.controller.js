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

    try {
      await exp
        .save()
        .then((result) => {
          return res.status(201).json({
            data: result,
            success: true,
            message: 'Expense was created',
          })
        })
    } catch (err) {
      res.status(400).json({
        data: [],
        error: 'Something went wrong!',
        success: false,
        message: 'Please try again',
      })
    }

  } else {
    res.status(400).json({
      data: [],
      error: validate.error,
      success: false,
      message: 'Please try again',
    })
  }
}

exports.index = async (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  let decoded = jwt.decode(token)

  try {
    await Expense.find({ created_by: decoded?.user }).then((response) => {
      res.status(200).json({
        data: response,
        success: true,
        message: 'Expense was retrieved',
      })
    })
  } catch (err) {
    res.status(400).json({
      data: [],
      error: 'Something went wrong!',
      success: false,
      message: 'Please try again'
    })
  }
}

exports.delete = async (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  let decoded = jwt.decode(token)

  try {
    await Expense.findByIdAndDelete(req.params.id).then((response) => {
      if (response.created_by == decoded?.user) {
        res.status(200).json({
          data: response,
          success: true,
          message: 'Expense was deleted',
        })
      } else {
        res.status(403).json({
          success: false,
          message: 'You are not authorized to delete this expense',
        })
      }
    })
  } catch (err) {
    res.status(400).json({
      data: [],
      error: 'Something went wrong!',
      success: false,
      message: 'Please try again'
    });
  }
}

exports.search = async (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  let decoded = jwt.decode(token)

  try {
    await Expense.find({ created_by: decoded?.user, name: decoded?.user }).then((response) => {
      res.status(200).json({
        data: response,
        success: true,
        message: 'Expense was retrieved',
      })
    })
  } catch (err) {
    res.status(400).json({
      data: [],
      error: 'Something went wrong!',
      success: false,
      message: 'Please try again'
    })
  }
}
