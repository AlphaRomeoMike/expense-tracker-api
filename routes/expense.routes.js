const express        = require('express')
const router         = express.Router()

const ExpenseController = require('../controllers/expense.controller')

router.post('/expenses', ExpenseController.create)

module.exports = router;