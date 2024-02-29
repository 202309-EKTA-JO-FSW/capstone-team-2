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

module.exports = {
  getPastOrders,
  getCurrentOrders,
  cancelOrder,
};
