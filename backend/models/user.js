const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  dob: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create user model
const User = mongoose.model('User', userSchema);

module.exports = User;
