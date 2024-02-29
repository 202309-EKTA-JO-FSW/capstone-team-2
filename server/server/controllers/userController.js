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

module.exports = {
  getPastOrders,
};
