const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// review embedded

const reviewSchema = new mongoose.Schema({
  dishID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DishModel",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  restaurantLocation: {
    type: String,
    required: true,
  },

  imageURL: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  
  cuisineType: {
    type: String,
    required: true,
  },

  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "DishModel",
    },
  ],
  reviews: [reviewSchema],
});

module.exports = mongoose.model("RestaurantModel", restaurantSchema);
