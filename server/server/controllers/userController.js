const bcrypt = require("bcrypt");
const cookie = require("cookie");

const BlackListModel = require("../models/blackList");
const UserModel = require("../models/user");
const DishModel = require("../models/dish");
// const CartModel = require("../models/cart");
const OrderModel = require("../models/order");
const RestaurantModel = require("../models/restaurant");

// muna

/*
// get all Dish and filter it by category
const getDishItems = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const dishes = await DishModel.find(query);
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search for Dish
const searchDishes = async (req, res) => {
  try {
    const { query } = req.query;
    const dishes = await DishModel.find({
      dishName: { $regex: query, $options: "i" },
    });

    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Dish information
const getDishById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const dish = await DishModel.findById(itemId);

    if (!dish) {
      return res.status(404).json({ message: "This dish not found" });
    }

    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/
// Create new Order
const createOrder = async (req, res) => {
  try {
    const { restaurantId, dishes, specialInstructions } = req.body;

    // Validate the request data...

    let order = new OrderModel({
      customer: req.userId,
      restaurant: restaurantId,
      dishes,
      specialInstructions,
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    // res.status(500).json({ message: 'Error placing order', error: error.message });
    res.status(500).json({ message: error.message });
  }
};

// Get past completed orders
const getPastOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      customer: req.user._id,
      status: "completed",
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current active order
const getCurrentOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      customer: req.user._id,
      status: { $in: ["placed", "preparing"] },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const order = await OrderModel.findOne({
      _id: req.params.orderId,
      customer: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the order is in a state that can be cancelled
    if (order.status === "delivered" || order.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Order cannot be cancelled at this stage." });
    }

    // Update the order status to 'cancelled'
    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order has been cancelled.", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// farah

// get all Dish and filter it by category
const getDishItems = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const dishes = await DishModel.find(query);
    res.json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.massage });
  }
};

// search for Dish
const searchDishes = async (req, res) => {
  try {
    const { query } = req.query;
    const dishes = await DishModel.find({
      dishName: { $regex: query, $options: "i" },
    });

    res.json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.massage });
  }
};

// Get single Dish information
const getDishById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const dish = await DishModel.findById(itemId);

    if (!dish) {
      return res.status(404).json({ message: "This dish not found" });
    }

    res.json(dish);
  } catch (error) {
    console.error("Error getting dish:", error);
    res.status(500).json({ message: error.massage });
  }
};

//Get all Dishes in specific Restaurant
const getDishesByRestaurant = async (req, res) => {
  try {
    const { restaurantID } = req.params;

    const restaurant = await RestaurantModel.findById(restaurantID).populate({
      path: "dishes",
      select: "dishName dishImage description price category",
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ dishes: restaurant.dishes });
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ message: error.massage });
  }
};

// Add Dish to Cart (by Farah)
const addToCart = async (req, res) => {
  try {
    const { customerId, dishId, quantity, specificRequests } = req.body;
    // Find the dish by ID
    const dish = await DishModel.findById(dishId);
    // Check if the dish exists
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    // Find or create the cart
    let cart = await OrderModel.findOne({ userID });
    if (!cart) {
      cart = new OrderModel({ userID, orderItems: [] });
    }
    // Check if the dish is already in the cart
    const existingItem = cart.items.find((item) =>
      item.dishId.equals(dish._id)
    );
    if (existingItem) {
      // Update existing item in the cart
      existingItem.quantity += quantity;
      if (specificRequests) {
        existingItem.specificRequests = specificRequests;
      }
    } else {
      // Add a new item to the cart with dishPrice and dishName
      const newItem = {
        dishId: dish._id,
        dishName: dish.dishName,
        quantity,
        specificRequests,
        dishPrice: dish.price,
      };
      // Log the new item for debugging
      console.log("New Item:", newItem);
      cart.items.push(newItem);
    }
    // Save the cart in the database
    await cart.save();

    // Include dishPrice, dishName, and totalItemPrice in each item of the response
    const responseItems = cart.items.map((item) => ({
      dishId: item.dishId,
      dishName: item.dishName,
      quantity: item.quantity,
      specificRequests: item.specificRequests,
      dishPrice: item.dishPrice,
      totalItemPrice: item.dishPrice * item.quantity,
    }));
    res.status(201).json({
      message: "Dish added to cart successfully",
      cart: {
        items: responseItems,
      },
    });
  } catch (error) {
    console.error("Error adding dish to cart:", error);
    res.status(500).json({ message: error.massage });
  }
};

// ramah

// Sign in authentication
const signin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    let options = {
      maxAge: 20 * 60 * 1000, // 20 min
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    const token = user.generateAccessJWT();
    res.cookie("SessionID", token, options);

    res.status(200).json({ message: "You have successfully logged in." });
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// sign out authentication
const signout = async (req, res) => {
  try {
    const authHeader = req.headers["cookie"];

    if (!authHeader) {
      return res.sendStatus(204);
    }

    const cookies = cookie.parse(authHeader);
    const accessToken = cookies["SessionID"];

    if (!accessToken) {
      return res.sendStatus(401);
    }

    const checkIfBlackListed = await BlackListModel.findOne({
      token: accessToken,
    });

    if (checkIfBlackListed) {
      return res.sendStatus(204);
    }

    const newBlackList = new BlackListModel({ token: accessToken });

    await newBlackList.save();

    res.setHeader("Clear-Site-Data", '" cookies"');
    res.status(200).json({ message: "You are logged out!" });
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get single user profile
const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const userInfo = await UserModel.findById(id);

    if (!userInfo) {
      res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add user profile information
const addNewUser = async (req, res) => {
  const newUserData = req.body;

  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      const newUser = await UserModel.create(newUserData);
      return res.status(201).json(newUser);
    } else {
      return res.status(400).json({ message: "user already exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile information
const updateUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUserInfo = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUserInfo) {
      res.status(422).json({
        message: "The data not updated",
      });
    } else {
      res.json(updatedUserInfo);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//for test
const getData = async (_, res) => {
  try {
    const users = await UserModel.find({}).select("+password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const removeUser = async (req, res) => {
  try {
    // Example: { ids: ['id1', 'id2', 'id3'] }
    const { ids } = req.body;
    const deleteItems = await UserModel.deleteMany({ _id: { $in: ids } });

    if (deleteItems.deletedCount > 0) {
      res.json({ message: `${deleteItems.deletedCount} documents deleted` });
    } else {
      res
        .status(422)
        .json({ message: "The user you are trying to delete wasn't found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  // muna
  // getDishItems,
  // searchDishes,
  // getDishById,
  createOrder,
  getPastOrders,
  getCurrentOrders,
  cancelOrder,
  // farah
  getDishItems,
  searchDishes,
  getDishById,
  getDishesByRestaurant,
  addToCart,
  // ramah
  getUserProfile,
  addNewUser,
  updateUserData,
  signin,
  signout,
  getData,
  removeUser,
};

/*************************************** */
/*const Dish = require("../models/Dish");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");


// get all Dish and filter it by category 
const getDishItems = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const dishes = await DishModel.find(query);
    res.json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

// search for Dish
const searchDishes = async (req, res) => {
  try {
    const { query } = req.query;
    const dishes = await DishModel.find({ dishName: { $regex: query, $options: "i" } });

    res.json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

  // Get single Dish information
  const getDishById = async (req, res) => {
    try {
      const { itemId } = req.params;
      const dish = await DishModel.findById(itemId);
  
      if (!dish) {
        return res.status(404).json({ message: "This dish not found" });
      }
  
      res.json(dish);
    } catch (error) {
      console.error("Error getting dish:", error);
      res.status(500).json({ message: "server error" });
    }
  };
  

  // const addToCart = async (req, res) => {
  //   try {
  //     const { dishID, quantity, specificRequests } = req.body;
  
  //     // Check if the dish exists
  //     const dish = await DishModel.findById(dishID);
  //     if (!dish) {
  //       return res.status(404).json({ error: "Dish not found" });
  //     }
  
  //     // Check if the user already has a cart
  //     // let userCart = await CartModel.findOne({ userID });
  
  //     // If the user doesn't have a cart, create one
  //     // if (!userCart) {
  //     //   userCart = await Cart.create({ userID, items: [] });
  //     // }
  
  //     // Check if the dish is already in the user's cart
  //     // const existingItemIndex = userCart.items.findIndex(
  //     //   (item) => item.dishID.toString() === dishID
  //     // );
  
  //     // If the dish is in the cart, update the quantity
  //     // if (existingItemIndex !== -1) {
  //     //   userCart.items[existingItemIndex].quantity += quantity;
  //     // } else {
  //       // If the dish is not in the cart, add it with the specified quantity
  //       userCart.items.push({ dishID, quantity, specificRequests });
  //     }
  
  //     // Save the updated cart
  //     await userCart.save();
  
  //     res.json({ message: "Dish added to cart successfully", userCart });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Server Error" });
  //   }
  // };
  



module.exports = {
  getDishItems,
  searchDishes,
  getDishById,
  // addToCart
}
*/
