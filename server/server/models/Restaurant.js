const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  dishID: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  restaurantLocation: { type: String, required: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  userLocation: { type: String, required: true },
});

module.exports = mongoose.model("restaurantSchema", restaurantSchema);
