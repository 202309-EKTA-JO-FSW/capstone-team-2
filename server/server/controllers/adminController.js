const RestaurantModel = require("../models/restaurant");
const DishModel = require("../models/dish");
const OrderModel = require("../models/order")

//get all dishes
const getDishItems = async (req, res) => {
  try {
    const dishes = await DishModel.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new Restaurant
const addRestaurant = async (req, res) => {
  try {
    const { name, restaurantLocation, imageURL, description, dishes } =
      req.body;

    const newRestaurant = new RestaurantModel({
      name,
      restaurantLocation,
      imageURL,
      description,
      dishes: [...dishes],
    });

    await newRestaurant.save();

    res
      .status(201)
      .json({ message: "Restaurant added successfully", newRestaurant });
      console.error("Error adding restaurant:", error);
  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
};

//Add Dish to selected Resturant
const addDishToRestaurant = async (req, res) => {
  try {
    const { restaurantID } = req.query;
    const { dishName, dishImage, description, price, category } = req.body;
    // Check if the restaurant exists
    const restaurant = await RestaurantModel.findById(restaurantID);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    // Create a new Dish
    const newDish = new DishModel({
      restaurantID,
      dishName,
      dishImage,
      description,
      price,
      category,
    });
    // Save the new Dish to the database
    await newDish.save();
    // Add the new Dish to the restaurant's dishes array
    restaurant.dishes.push(newDish);
    // Save the updated restaurant with the new dish reference
    await restaurant.save();
    res
      .status(201)
      .json({ newDish });
  } catch (error) {
    console.error("Error adding dish to the restaurant:", error);
    res.status(500).json({ message: error.message });
  }
};

// get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get dishes for one Restaurant
const getAllDishes = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Find the restaurant by its ID
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message:"there is no retaraurant with that id " });
    }

    // Find all dishes associated with the restaurant
    const dishes = await DishModel.find({ restaurantID: restaurantId });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getDishItems,
  addRestaurant,
  addDishToRestaurant,
  getAllRestaurants,
  getAllDishes,

};
