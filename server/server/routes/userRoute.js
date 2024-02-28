const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  ensureGuest,
  ensureAuth,
  verifyIsAdmin,
} = require("../middlewares/userAuth");

// get past completed orders ok
router.get(
  "/orders/past",
  //  isAuthenticated,
  userController.getPastOrders
);

// Get current active orders ok
router.get(
  "/orders/current",
  //  isAuthenticated,
  userController.getCurrentOrders
);

// Cancel an order ok
router.patch(
  "/orders/:orderId/cancel",
  //  isAuthenticated,
  //  isOrderOwner,
  userController.cancelOrder
);

// get all dishes for user ok
router.get("/Dishes", userController.getDishItems);

// search for dish name min max price and catogire ok
router.get("/Dishes/search", userController.searchDishes);



module.exports = router;
