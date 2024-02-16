const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  preferences: {
    type: String,
  },

  profilePicture:{
    type: String,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
}

});


module.exports = mongoose.model("userSchema", userSchema);