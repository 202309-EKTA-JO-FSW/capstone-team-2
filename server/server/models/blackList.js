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

/*
const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlackList", blackListSchema);

 */
