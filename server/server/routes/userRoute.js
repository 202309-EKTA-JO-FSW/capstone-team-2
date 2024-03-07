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
router.get("/dishes", userController.getDishItems);

// search for dish name min max price and catogire ok
router.get("/dishes/search", userController.searchDishes);

// detials for one dish for dynamic id in react ok
router.get("/dishes/:itemId", userController.getDishById);

//Get all Dishes in specific Restaurant ok
router.get("/restaurants/:restaurantID", userController.getDishesByRestaurant);

// Add Dish to Cart ok
router.post("/cart", userController.addToCart);

// signin & signout without google
// sign in ok
router.post("/signin", ensureGuest, userController.signin);

// sign out ok
router.get("/signout", userController.signout);

// get one user profile ok
router.get(
  "/:id",
  //  ensureAuth,
  userController.getUserProfile
);

// add new user ok
router.post("/newuser", ensureGuest, userController.addNewUser);

// update user info ok
router.put(
  "/updateinfo/:id",
  // ensureAuth,
  userController.updateUserData
);

// for test
router.get(
  "/allusers",
  // ensureAuth,
  userController.getUsersData
);
router.get("/alltokens", userController.getTokens);
router.delete("/delete", userController.removeUser);
router.delete("/deletetokens", userController.removeTokens);

// Check if the user not auth to login with google
router.get("/google", ensureGuest, (_, res) => {
  res.send('<a href="/auth/google">Authentication with Google</a>');
});

module.exports = router;
