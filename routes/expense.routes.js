const express        = require('express')
const router         = express.Router()
const ExpenseController = require('../controllers/expense.controller')

router.post('/', ExpenseController.create)
