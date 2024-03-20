// const mongoose = require("mongoose");

// //order item embedded
// const orderItemSchema = new mongoose.Schema({
//   dishID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "DishModel",
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//     default: 1,
//   },
//   specificRequests: {
//     type: String,
//   },
//   // dishName: {
//   //   type: String,
//   // },
//   // dishPrice: {
//   //   type:Number,
//   // },
//   // totalItemPrice:{
//   //   type:Number,
//   // }
// });

// const orderSchema = new mongoose.Schema(
//   {
//     userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "UserModel",
//       required: true,
//     },
//     //   userLocation: {
//     //     type: String,
//     //     required: true,
//     //     maxlength: 200,
//     //   },
//     restaurant: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "RestaurantModel",
//       required: true,
//     },
//     totalBill: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["waiting", "recivied", "cancelled"],
//       default: "waiting",
//     },
//     durationDelivery: {
//       type: Number,
//     },
//     orderDate: {
//       type: Date,
//     },
//     pickupDate: {
//       type: Date,
//     },
//     orderItems: [orderItemSchema],
//     hasConfirmedOrder: {
//       type: Boolean,
//       default: false,
//     },
//   },

//   { timestamps: true }
// );

// module.exports = mongoose.model("OrderModel", orderSchema);


const mongoose = require("mongoose");

// Define the order item schema
const orderItemSchema = new mongoose.Schema({
  dishID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DishModel",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  specificRequests: {
    type: String,
  },
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RestaurantModel",
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["waiting", "received", "cancelled"],
    default: "waiting",
  },
  durationDelivery: {
    type: Number,
  },
  orderDate: {
    type: Date,
  },
  pickupDate: {
    type: Date,
  },
  orderItems: [orderItemSchema],
  hasConfirmedOrder: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("OrderModel", orderSchema);