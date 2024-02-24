/************************************last one used 
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  dishID: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "dishSchema",
    ref: "Dish",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  specificRequests: {
    type: String,
  },
});

module.exports = mongoose.model("CartModel", cartSchema);








*/

/******************************************* */
/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  dishID: {
    type: Schema.Types.ObjectId,
    ref: "Dish",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  specificRequests: {
    type: String,
  },
});

module.exports = mongoose.model("Cart", cartSchema);

*/
