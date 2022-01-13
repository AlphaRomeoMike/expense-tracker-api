const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
   name: {
      type: String
   },
   description: {
      type: String,
   },
   amount: {
      type: Number
   },
   created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   created_at: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Expense', ExpenseSchema);