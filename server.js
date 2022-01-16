const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const users = require('./routes/user.routes')
const expenses = require('./routes/expense.routes')

/**
 * -----
 * Create express app
 * -----
 * @var app
 * @type Object
 */
const app = express()
app.use(express.urlencoded({ extended: true }))
//app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Mongodb Status: ${mongoose.connection.readyState}`)
  })
  .catch((err) => {
    console.log(err)
  })

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Expense app',
    app: {
      health: 100,
      status: 'Running'
    }
  })
})

/** ### External routes
 * @description This portion provides all routes available
 */
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

if (process.env.ENV === 'local' || process.env.ENV === 'dev') {
  console.log(`Environment is: ${process.env.ENV}`)
  const morgan = require('morgan')
  app.use(morgan('combined'))
}

app.use('/api', users)
app.use('/api', expenses)

app.listen(PORT, () => {
  console.log(`Server started on: http://locahost:${PORT}/`)
})
