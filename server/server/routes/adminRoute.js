const express = require("express");
const router = express.Router();
const { route } = require("..");
const { ensureAuth, verifyIsAdmin } = require("../middlewares/userAuth");

const adminController = require("../controllers/adminController");

// Define admin routes

// for get all dishes
router.get("/dishes", ensureAuth, verifyIsAdmin, adminController.getDishItems);
// for add new Restaurant
router.post(
  "/restaurant",
  // ensureAuth,
  // verifyIsAdmin,
  adminController.addRestaurant
);
// add dish for selected Restaurant
router.post(
  "/dishtorestaurant",
  // ensureAuth,
  // verifyIsAdmin,
  adminController.addDishToRestaurant
);
// get all Restaurant
router.get(
  "/restaurants",
  // ensureAuth,
  // verifyIsAdmin,
  adminController.getAllRestaurants
);
// get dishes for one Restaurant
router.get(
  "/restaurants/:restaurantId",
  ensureAuth,
  verifyIsAdmin,
  adminController.getAllDishes
);
// delete Restaurant or Restaurants
router.delete(
  "/restaurantdelete",
  // ensureAuth,
  // verifyIsAdmin,
  adminController.deleteRestaurant
);
// delete dish for specific Restaurant
router.delete(
  "/dishdelete",
  // ensureAuth,
  // verifyIsAdmin,
  adminController.removeOneOrManyItems
);
// for search dishes minPrice and maxPrice and category and name
router.get(
  "/searchdishes",
  ensureAuth,
  verifyIsAdmin,
  adminController.searchDishes
);
//edit restaurant
router.put(
  "/restaurant/edit",
  // ensureAuth,
  // verifyIsAdmin,
  adminController.editRestaurant
);
// edit dish
router.put("/dish/edit",
//  ensureAuth, 
//  verifyIsAdmin,
  adminController.editDish);

// Get past completed orders for report on admin
router.get('/orders/past',
//  isAuthenticated,
   adminController.allPastOrders);


module.exports = router;
