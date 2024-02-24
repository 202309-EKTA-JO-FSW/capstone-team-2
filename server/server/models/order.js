const mongoose = require("mongoose");


// card or order item embedded 
const cartSchema = new mongoose.Schema({
  dishID: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "dishSchema",
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
/////
const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    //   userLocation: {
    //     type: String,
    //     required: true,
    //     maxlength: 200,
    //   },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantModel",
      required: true,
    },
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
          ref: "DishModel",
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
    // review: {
    //   type: [String],
    //   required: true,
    // },
    cartSchema :[cartSchema],
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", orderSchema);

/*
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  
    totalBill: {
      type: Number,
      required: true,
    },

    orderItem: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
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
    review: { 
      type: [String], 
      required: true 
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);


*/
