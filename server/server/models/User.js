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
    validate: {
      validator: function (v) {
        // This regex allows numbers, spaces, parentheses, and hyphens
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number format`,
    },
  },

  preferences: {
    type: String,
    required: false,
  },

  profilePicture: {
    type: String,
    required: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("userSchema", userSchema);
