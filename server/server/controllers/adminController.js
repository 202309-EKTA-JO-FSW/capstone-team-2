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
  } catch (error) {
    console.error("Error adding restaurant:", error);
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
      .json({ message: "Dish added to the restaurant successfully", newDish });
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
      return res.status(404).json({ message: error.message });
    }

    // Find all dishes associated with the restaurant
    const dishes = await DishModel.find({ restaurantID: restaurantId });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete Restaurant or Restaurants
const deleteRestaurant = async (req, res) => {
  try {
    // Example: { ids: ['id1', 'id2', 'id3'] }
    const { ids } = req.body;
    const deleteItems = await RestaurantModel.deleteMany({ _id: { $in: ids } });

    if (deleteItems.deletedCount > 0) {
      res.json({ message: `${deleteItems.deletedCount} documents deleted` });
    } else {
      res.status(422).json({
        message: "The Restaurant you are trying to delete wasn't found",
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete dish for specific Restaurant
const removeOneOrManyItems = async (req, res) => {
  try {
    // Example: { ids: ['id1', 'id2', 'id3'] }
    const { ids } = req.body;
    const deleteItems = await DishModel.deleteMany({ _id: { $in: ids } });

    if (deleteItems.deletedCount > 0) {
      // Update the corresponding restaurant's dishes array
      await RestaurantModel.updateMany(
        { dishes: { $in: ids } },
        { $pull: { dishes: { $in: ids } } },
        { multi: true }
      );
      res.json({ message: `${deleteItems.deletedCount} documents deleted` });
    } else {
      res
        .status(422)
        .json({ message: "The Dish you are trying to delete wasn't found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// for search dishes minPrice and maxPrice and category and name
const searchDishes = async (req, res) => {
  try {
    const { minPrice, maxPrice, category, name } = req.query;

    // Define the search criteria
    const searchCriteria = {};
    if (minPrice !== undefined && !isNaN(minPrice)) {
      searchCriteria.price = { $gte: minPrice };
    }
    if (maxPrice !== undefined && !isNaN(maxPrice)) {
      searchCriteria.price = { ...searchCriteria.price, $lte: maxPrice };
    }
    if (category) {
      searchCriteria.category = { $regex: new RegExp(category, "i") };
    }
    if (name) {
      // Use a regular expression to perform a case-insensitive search by name
      searchCriteria.dishName = { $regex: new RegExp(name, "i") };
    }

    // Perform the search
    const dishes = await DishModel.find(searchCriteria);

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// edit Restaurant
const editRestaurant = async (req, res) => {
  try {
    const { restaurantID } = req.query;
    const { name, restaurantLocation, imageURL, description, dishes } =
      req.body;

    // Check if ID is provided
    if (!restaurantID) {
      return res.status(400).json({ error: "Restaurant ID is required" });
    }

    // Find the restaurant by its ID
    let restaurant = await RestaurantModel.findById(restaurantID);

    // If the restaurant doesn't exist, return an error
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
   
    // Update the restaurant fields
    restaurant.name = name || restaurant.name;
    restaurant.restaurantLocation =
      restaurantLocation || restaurant.restaurantLocation;
    restaurant.imageURL = imageURL || restaurant.imageURL;
    restaurant.description = description || restaurant.description;

    // Save the updated restaurant object
    const updatedRestaurant = await restaurant.save();

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error editing restaurant:", error);
    res.status(500).json({ message: error.message });
  }
};

// edit dish
const editDish = async (req, res) => {
  try {
    const { dishID } = req.query;
    const { restaurantID, dishName, dishImage, description, price, category } =
      req.body;

    // Check if ID is provided
    if (!dishID) {
      return res.status(400).json({ error: "Dish ID is required" });
    }

    // Find the dish by its ID
    const dish = await DishModel.findById(dishID);

    // If the dish doesn't exist, return an error
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    // Update the dish fields
    dish.restaurantID = restaurantID || dish.restaurantID;
    dish.dishName = dishName || dish.dishName;
    dish.dishImage = dishImage || dish.dishImage;
    dish.description = description || dish.description;
    dish.price = price || dish.price;
    dish.category = category || dish.category;

    // Save the updated dish object
    const updatedDish = await dish.save();

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get past completed orders for report 
const allPastOrders = async (req, res) => {
  try {
    // const {userID } = req.params
    const orders = await OrderModel.find({
      // userID: userID,
      // status: "waiting",
      // status: "recivied",
      cardID:OrderModel
    });
    res.json(orders);
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
  deleteRestaurant,
  removeOneOrManyItems,
  searchDishes,
  editRestaurant,
  editDish,
  allPastOrders,
};