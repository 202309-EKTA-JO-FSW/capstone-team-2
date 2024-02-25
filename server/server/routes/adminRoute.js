const express = require("express");
const router = express.Router();
const { route } = require("..");
const { ensureAuth, verifyIsAdmin } = require('../middlewares/userAuth');

const adminController = require("../controllers/adminController");

// farah

// Define admin routes
// for get all dishes
router.get("/Dishes",ensureAuth, verifyIsAdmin, adminController.getDishItems);
// for add new Restaurant
router.post("/Restaurant",ensureAuth, verifyIsAdmin, adminController.addRestaurant);
// add dish for selected Restaurant
router.post("/DishToRestaurant", ensureAuth, verifyIsAdmin,adminController.addDishToRestaurant); // Add this line

// ahmad
// router.post("/restaurant", adminController.addRestaurant);
// router.post("/dish", adminController.addDish);

// get all Restaurant
router.get("/restaurants",ensureAuth, verifyIsAdmin, adminController.getAllRestaurants);
// get dishes for one Restaurant
router.get("/restaurants/:restaurantId", ensureAuth, verifyIsAdmin,adminController.getAllDishes);
// delete Restaurant or Restaurants
router.delete("/restaurantDelete",ensureAuth, verifyIsAdmin, adminController.deleteRestaurant);

// router.delete("/dishDelete", adminController.deleteDishs);

// delete dish for specific Restaurant
router.delete("/dishDelete", ensureAuth, verifyIsAdmin,adminController.removeOneOrManyItems);
// for search dishes minPrice and maxPrice and category and name
router.get("/searchDishes", ensureAuth, verifyIsAdmin,adminController.searchDishes);

//edit restaurant 
router.put("/restaurant/edit",ensureAuth, verifyIsAdmin, adminController.editRestaurant);
// edit dish
router.put("/dish/edit", ensureAuth, verifyIsAdmin,adminController.editDish);

module.exports = router;

/************************************************* */

/*const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminCtrl");

// Define admin routes
router.get('/Dishes',adminController.getDishItems);
router.post("/Dishes", adminController.addDish);

module.exports = router; 

*/
/************************************************ muna*/
/*
const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminctrl");

// Define admin routes
router.get('/Dishes',adminController.getDishItems);
router.post("/Dishes", adminController.addDish);

module.exports = router; 
*/
