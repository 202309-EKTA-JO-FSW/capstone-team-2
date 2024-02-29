const bcrypt = require("bcrypt");
const cookie = require("cookie");

const BlackListModel = require("../models/blackList");
const UserModel = require("../models/user");
const DishModel = require("../models/dish");
// const CartModel = require("../models/cart");
const OrderModel = require("../models/order");
const RestaurantModel = require("../models/restaurant");

// Get past completed orders ok
const getPastOrders = async (req, res) => {
  try {
    const { userID } = req.query;
    console.log("UserID:", userID);

    const orders = await OrderModel.find({
      userID,
    });
    console.log("Orders:", orders);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current active order ok
const getCurrentOrders = async (req, res) => {
  try {
    const { userID } = req.query;
    const orders = await OrderModel.find({
      userID,
      status: { $in: ["placed", "preparing", "waiting"] },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel an order ok
const cancelOrder = async (req, res) => {
  try {
    const { userID } = req.query;
    const deleteOperation = await OrderModel.deleteMany({
      userID,
      status: "cancelled",
    });
    const updateOperation = await OrderModel.updateMany({ userID });
    await Promise.all([deleteOperation, updateOperation]);
    const order = await OrderModel.findOne({
      userID,
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

// get all Dish and filter it by category ok
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
    res.status(500).json({ message: error.message });
  }
};

// search for Dish ok
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

// Get single Dish information ok
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
    res.status(500).json({ message: error.message });
  }
};

//Get all Dishes in specific Restaurant ok both solutions
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
    res.status(500).json({ message: error.message });
  }
};

// Add Dish to Cart ok
const addToCart = async (req, res) => {
  try {
    const { userID, dishID, quantity, specificRequests } = req.body;

    // Validate the user
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the dish by ID
    const dish = await DishModel.findById(dishID);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    // Find or create the user's cart
    let cart = await OrderModel.findOne({ userID, status: "waiting" });
    if (!cart) {
      cart = new OrderModel({
        userID,
        restaurant: dish.restaurantID,
        totalBill: 0,
        status: "waiting",
        orderItems: [],
      });
    }

    // Check if the dish is already in the cart
    let existingItem = cart.orderItems.find((item) =>
      item.dishID.equals(dish._id)
    );
    if (existingItem) {
      // Update existing item in the cart
      existingItem.quantity += quantity;
      if (specificRequests) {
        existingItem.specificRequests = specificRequests;
      }
    } else {
      // Add a new item to the cart
      cart.orderItems.push({
        dishID: dish._id,
        quantity,
        specificRequests,
      });
    }

    cart.totalBill = 0; // Reset totalBill to 0 before recalculating
    for (const item of cart.orderItems) {
      const dishItem = await DishModel.findById(item.dishID);
      if (dishItem && dishItem.price) {
        cart.totalBill += dishItem.price * item.quantity;
      } else {
        // Handle the case where dishItem or price is not available
        throw new Error("Invalid dish or price");
      }
    }

    // Save the cart
    await cart.save();

    res.status(201).json({
      message: "Dish added to cart successfully",
      cart: cart, // Send the full cart back to the user
    });
  } catch (error) {
    console.error("Error adding dish to cart:", error);
    res.status(500).json({ message: error.message });
  }
};

// Sign in ok
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
      maxAge: 180 * 60 * 1000, // 3 hours
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

const cleanupExpiredTokens = async () => {
  try {
    const currentTime = new Date();
    // Find and remove tokens where the creation date is too old
    const expirationTime = new Date(currentTime - 180 * 60 * 1000);
    await BlackListModel.deleteMany({ createdAt: { $lt: expirationTime } });
    console.log("Expired tokens cleaned up.");
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
  }
};

setInterval(cleanupExpiredTokens, 180 * 60 * 1000);

// sign out ok
const signout = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          return next(err);
        }

        req.session.destroy();
        res.redirect("/user/google");
        res.end();
      });
    } else {
      const authHeader = req.headers["cookie"];

      if (!authHeader) {
        return res.sendStatus(204);
      }

      const cookies = cookie.parse(authHeader);
      const accessToken = (cookies["SessionID"] || "").trim();

      if (!accessToken) {
        return res.sendStatus(401);
      }

      const checkIfBlackListed = await BlackListModel.findOne({
        token: accessToken,
      });

      if (checkIfBlackListed) {
        return res.status(200).json({ message: "You are already logged out!" });
      }

      const newBlackList = new BlackListModel({ token: accessToken });

      await newBlackList.save();

      res.setHeader("Clear-Site-Data", '" cookies"');
      res.status(200).json({ message: "You are logged out!" });
      res.end();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get single user profile one user ok
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

// User signUp add new user ok
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

// Update user profile information ok
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
const getUsersData = async (_, res) => {
  try {
    const users = await UserModel.find({}).select("+password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getTokens = async (_, res) => {
  try {
    const tokens = await BlackListModel.find({});
    res.status(200).json(tokens);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


module.exports = {
  getPastOrders,
  getCurrentOrders,
  cancelOrder,
  getDishItems,
  searchDishes,
  getDishById,
  getDishesByRestaurant,
  addToCart,
  getUserProfile,
  addNewUser,
  updateUserData,
  signin,
  signout,
  getTokens,
  getUsersData,
};
