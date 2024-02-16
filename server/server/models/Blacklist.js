const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "userSchema",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blackListSchema", blackListSchema);
