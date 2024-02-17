const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    //   userLocation: {
    //     type: String,
    //     required: true,
    //     maxlength: 200,
    //   },
    totalBill: {
      type: Number,
      required: true,
    },
    // products: {
    //     type:[
    //          {type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel'},
    //         // count: {type: Number}
    //     ],
    // },
    orderItem: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DishSchema",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["waiting", "recivied", "cancelled"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderSchema", orderSchema);
