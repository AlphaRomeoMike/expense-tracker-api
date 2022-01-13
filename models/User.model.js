const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name: {
      type: String
   },
   username: {
      type: String,
      unique: true
   },
   email: {
      type: String,
      unique: true,
      min: 10
   },
   password: {
      type: String
   },
   created_at: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);