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

module.exports = {
  getPastOrders,
  getCurrentOrders,
  cancelOrder,
  getDishItems,
  searchDishes,
  getDishById,
};
