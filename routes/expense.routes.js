const express        = require('express')
const router         = express.Router()

const ExpenseController = require('../controllers/expense.controller')

router.post('/expenses', ExpenseController.create)
router.get('/expenses/index', ExpenseController.index)
router.delete('/expenses/:id', ExpenseController.delete)

module.exports = router;