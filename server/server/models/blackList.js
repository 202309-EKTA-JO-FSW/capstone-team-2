const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlackListModel", blackListSchema);
