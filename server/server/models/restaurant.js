/* last one 
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
*/

/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    required: true },

  description: { 
    type: String, 
    required: true },

  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],

});

module.exports = mongoose.model("Restaurant", restaurantSchema);

*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// review embedded 

const reviewSchema = new mongoose.Schema({
  dishID: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "dishSchema",
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

////
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

  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "DishModel",
    },
  ],
  reviewSchema : [reviewSchema],
  // review: {
  //   type: [String],
  //   required: true,
  // },
});

module.exports = mongoose.model("RestaurantModel", restaurantSchema);
