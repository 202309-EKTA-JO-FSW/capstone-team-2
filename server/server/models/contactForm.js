const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

module.exports = mongoose.model("ContactForm", contactFormSchema);
