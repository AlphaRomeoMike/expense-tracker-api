const mongoose = require('mongoose')
const moment = require('moment')

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
   month: {
      type: String,
      default: moment().format('MMMM')
   },
   year: {
      type: Date,
      default: moment().format('Y')
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