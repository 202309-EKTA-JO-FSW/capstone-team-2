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

module.exports = router;
