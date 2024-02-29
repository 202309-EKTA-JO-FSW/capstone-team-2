const express = require("express");
const router = express.Router();
const { route } = require("..");
const { ensureAuth, verifyIsAdmin } = require("../middlewares/userAuth");

const adminController = require("../controllers/adminController");

// Define admin routes

// for get all dishes
router.get("/Dishes", ensureAuth, verifyIsAdmin, adminController.getDishItems);
// for add new Restaurant
router.post(
  "/Restaurant",
  ensureAuth,
  verifyIsAdmin,
  adminController.addRestaurant
);
// add dish for selected Restaurant
router.post(
  "/DishToRestaurant",
  ensureAuth,
  verifyIsAdmin,
  adminController.addDishToRestaurant
);
// get all Restaurant
router.get(
  "/restaurants",
  ensureAuth,
  verifyIsAdmin,
  adminController.getAllRestaurants
);
// get dishes for one Restaurant
router.get(
  "/restaurants/:restaurantId",
  ensureAuth,
  verifyIsAdmin,
  adminController.getAllDishes
);


module.exports = router;
