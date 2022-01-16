const RegisterScheme = require('../schema/user.schema')
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  let data = req.body

  const validate = RegisterScheme.validate(data)

  if (!validate.error) {
    // retrieve all users from database where email is equal to the email in the request
    const userData = await User.findOne({ email: data.email, username: data.username })

    if (userData === null) {
      let user = new User()
      user.name = data.name
      user.username = data.username
      user.password = await bcrypt.hash(data.password, 10)
      user.email = data.email

      try {
        await user
          .save()
          .then((result) => {
            return res.status(201).json({
              data: result,
              success: true,
              message: 'User was created',
            })
          })
      } catch (err) {
        res.status(400).json({
          error: validate.error,
          success: false,
          message: 'Please try again',
        })
      }
    }
    else {
      res.status(400).json({
        error: 'Username or email already exists',
        success: false,
        message: 'Please try again',
      })
    }
  }
  else {
    res.status(500).json({
      error: 'Something went wrong!',
      success: false,
      message: 'Please try again',
    })
  }
}

exports.login = (req, res) => {
  let data = req.body;

  User.findOne({ email: data.email.toLowerCase() }).then((response) => {
    if (response && bcrypt.compare(data.password, response.password)) {
      const token = jwt.sign(
        {
          email: response.email,
          user: response._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      )
      res.status(200).json({
        user: response,
        token: token,
        message: 'User successfully logged in',
      })
    } else {
      res.status(400).json({
        user: {},
        message: 'Please try again',
      })
    }
  })
}
