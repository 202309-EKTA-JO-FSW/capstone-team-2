const RestaurantModel = require("../models/restaurant");
const DishModel = require("../models/dish");

// farah

//get all dishes (BY FARAH)
const getDishItems = async (req, res) => {
  try {
    const dishes = await DishModel.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new Restaurant (BY FARAH)
const addRestaurant = async (req, res) => {
  try {
    const { name, restaurantLocation, imageURL, description, dishes } =
      req.body;

    const newRestaurant = new RestaurantModel({
      name,
      restaurantLocation,
      imageURL,
      description,
      dishes: [...dishes], // Copy the existing dishes array
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

//Add Dish to Resturant (BY FARAH)
const addDishToRestaurant = async (req, res) => {
  try {
    const {restaurantID}= req.query;
    const {  dishName, dishImage, description, price, category } =
      req.body;
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



// ahmad
/*
const addRestaurant = async (req, res) => {
   
  try {
    const {name,restaurantLocation,imageURL,description,dishes}= req.body
    const newRestaurant = new RestaurantModel({
      name,
      restaurantLocation,
      imageURL,
      description,
      dishes
    });
     await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

*/
////////////
/*
const addDish = async (req, res) => {
  try {
    const { restaurantID, dishName, dishImage, description, price, category } =
      req.body;

    // Create a new dish object
    const newDish = new DishModel({
      restaurantID,
      dishName,
      dishImage,
      description,
      price,
      category,
    });

    // Save the new dish to the database
    const savedDish = await newDish.save();

    res.status(201).json(savedDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/
//////////////////

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/////////////

const getAllDishes = async (req, res) => {
  try {
    const { restaurantId } = req.params; // Assuming restaurantId is passed in the URL params

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

//////////////////

const deleteRestaurant = async (req, res) => {
  try {
    // Example: { ids: ['id1', 'id2', 'id3'] }
    const { ids } = req.body;
    const deleteItems = await RestaurantModel.deleteMany({ _id: { $in: ids } });

    if (deleteItems.deletedCount > 0) {
      res.json({ message: `${deleteItems.deletedCount} documents deleted` });
    } else {
      res.status(422).json({ message: "The Restaurant you are trying to delete wasn't found" });
    };
  } catch (error) {
    res.status(500).json(error.message);
  };
};

/*
  try {
    const { id } = req.params;
    const { ids } = req.body;

    // Check if neither id nor ids are provided or if ids is not an array
    if (!id && (!ids || !Array.isArray(ids))) {
      return res.status(400).json({ error: "Invalid request" });
    }

    if (id) {
      // If ID is provided in the URL, delete the single restaurant
      const deleted = await RestaurantModel.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: message.error });
      }
      return res.json({ message: "Restaurant deleted successfully", deleted });
    } else {
      // If IDs are provided in the request body, delete multiple restaurants
      const deleted = await RestaurantModel.deleteMany({ _id: { $in: ids } });
      return res.json({
        message: "Restaurants deleted successfully",
        deletedCount: deleted.deletedCount,
      });
    }
  } catch (error) {
    console.error("Error deleting restaurants:", error);
    res.status(500).json({ message: error.message });
  }
};
*/
//////////////////////
/*
const deleteDishs = async (req, res) => {
  try {
    const { id } = req.params;
    const { ids } = req.body;

    // Check if neither id nor ids are provided or if ids is not an array
    if (!id && (!ids || !Array.isArray(ids))) {
      return res.status(400).json({ error: "Invalid request" });
    }

    if (id) {
      // If ID is provided in the URL, delete the single dish
      const deletedDish = await DishModel.findByIdAndDelete(id);
      if (!deletedDish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      return res.json({ message:  'DDish deleted successfully', deletedDish });
    } else {
      // If IDs are provided in the request body, delete multiple dishes
      const deletedDishes = await DishModel.deleteMany({ _id: { $in: ids } });
      return res.json({
        message: 'Dishes deleted successfully',
        deletedCount: deletedDishes.deletedCount,
      });
    }
  } catch (error) {
    console.error("Error deleting dishes:", error);
    res.status(500).json({ message: error.message });
  }
};
*/
/////////////
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
      res.status(422).json({ message: "The Dish you are trying to delete wasn't found" });
    };
  } catch (error) {
    res.status(500).json(error.message);
  };
};
////////
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

const editRestaurant = async (req, res) => {
  try {
    const {restaurantID}= req.query;
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
    // restaurant.dishes = dishes || restaurant.dishes;

    // Save the updated restaurant object
    const updatedRestaurant = await restaurant.save();

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error editing restaurant:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDish = async (req, res) => {
  try {
    const {dishID}= req.query;
    const {
      restaurantID,
      dishName,
      dishImage,
      description,
      price,
      category,
    } = req.body;

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

module.exports = {
  // farah
  getDishItems,
  addRestaurant,
  addDishToRestaurant,
  // ahmad
  // addRestaurant,
  // addDish,
  getAllRestaurants,
  getAllDishes,
  deleteRestaurant,
  // deleteDishs,
  removeOneOrManyItems,
  searchDishes,
  editRestaurant,
  editDish,
};

/************************************************** */
/*const Dish = require("../models/Dish");

//get all dishes
const getDishItems = async (req, res) => {
    try {
      const dishes = await Dish.find();
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// Add new dish item
const addDish = async (req, res) => {
  try {
    // Extract Dish details from request body
    const { dishName, dishImage, description, price, category } = req.body;
    // Create new Dish
    const newDish = new Dish({
      dishName,
      dishImage,
      price,
      description,
      category
    });
    // Save new Dish to database
    await newDish.save();

    res.status(201).json({ message: "Shop item added successfully", newDish });
  } catch (error) {
    console.error("Error adding shop item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
    getDishItems,
    addDish,
};

*/
/********************************************************************************* muna*/

/*
const Dish = require("../models/dish");

//get all dishes
const getDishItems = async (req, res) => {
    try {
      const dishes = await Dish.find();
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// Add new dish item
const addDish = async (req, res) => {
  try {
    // Extract Dish details from request body
    const { dishName, dishImage, description, price, category } = req.body;
    // Create new Dish
    const newDish = new Dish({
      dishName,
      dishImage,
      price,
      description,
      category
    });
    // Save new Dish to database
    await newDish.save();

    res.status(201).json({ message: "Shop item added successfully", newDish });
  } catch (error) {
    console.error("Error adding shop item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
    getDishItems,
    addDish,
}; 

*/
