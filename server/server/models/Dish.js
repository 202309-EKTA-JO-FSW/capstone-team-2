const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  restaurantID: { type: mongoose.Schema.Types.ObjectId, required: true, ref : "restaurantSchema" },
  dishName: { type: String, required: true },
  dishImage: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: [String], required: true },
  review: { type: [String], required: true },
});

module.exports = mongoose.model("dishSchema", dishSchema);
