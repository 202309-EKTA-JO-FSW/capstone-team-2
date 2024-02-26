const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureGuest, ensureAuth, verifyIsAdmin } = require('../middlewares/userAuth');

// muna
// const { createOrder } = require('../controller/orderController');
/*
router.get("/Dishes", userController.getDishItems);
router.get("/Dishes/search", userController.searchDishes);
router.get("/Dishes/:itemId", userController.getDishById);
*/
// router.post("/cart", userController.addToCart);


  

//   //checkout
//   router.post(
//     "/checkout",
//      customerCtrl.checkout
//   );
  
//   //item by id
//   router.get(
//     "/Dishes/:itemId",
//      customerCtrl.getShopItemById
//   );
  

  // Create new order
router.post('/orders',
//  isAuthenticated,
  userController.createOrder);
// Get past completed orders
router.get('/users/:userId/orders/past',
//  isAuthenticated,
   userController.getPastOrders);

// Get current active orders
router.get('/users/:userId/orders/current',
//  isAuthenticated,
  userController.getCurrentOrders);

// Cancel an order
router.patch('/orders/:orderId/cancel',
//  isAuthenticated,
//  isOrderOwner, 
 userController. cancelOrder);

// farah
// get all dishes for user ok
router.get("/Dishes", userController.getDishItems);
// search for dish name min max price and catogire ok 
router.get("/Dishes/search", userController.searchDishes);
// detials for one dish for dynamic id in react ok 
router.get("/Dishes/:itemId", userController.getDishById);
//Get all Dishes in specific Restaurant ok 
router.get("/Restaurants/:restaurantID", userController.getDishesByRestaurant); 
// Add Dish to Cart ok 
router.post("/cart", userController.addToCart);


// ramah
// for test
router.get("/allUsers", 
// ensureAuth,
userController.getUsersData);
router.get("/allTokens", userController.getTokens);
router.delete("/delete", userController.removeUser);
router.delete("/deleteTokens", userController.removeTokens);

// Check if the user not auth to login with google
router.get("/google", ensureGuest, (_, res) => {
  res.send('<a href="/auth/google">Authentication with Google</a>');
});

// signin & signout without google 
// sign in ok 
router.post("/signin", ensureGuest, userController.signin);
// sign out ok 
router.get("/signout", userController.signout);
// get one user profile ok 
router.get("/:id", 
//  ensureAuth,
  userController.getUserProfile);
// add new user ok 
router.post("/newUser", ensureGuest, userController.addNewUser);
// update user info ok
router.put("/updateInfo/:id", 
// ensureAuth, 
userController.updateUserData);

module.exports = router;