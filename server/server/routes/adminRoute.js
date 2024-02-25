const express = require("express");
const router = express.Router();
const { route } = require("..");

const adminController = require("../controllers/adminController");

// farah

// Define admin routes
// for get all dishes
router.get("/Dishes", adminController.getDishItems);
// for add new Restaurant
router.post("/Restaurant", adminController.addRestaurant);
// add dish for selected Restaurant
router.post("/DishToRestaurant", adminController.addDishToRestaurant); // Add this line

// ahmad
// router.post("/restaurant", adminController.addRestaurant);
// router.post("/dish", adminController.addDish);

// get all Restaurant
router.get("/restaurants", adminController.getAllRestaurants);
// get dishes for one Restaurant
router.get("/restaurants/:restaurantId", adminController.getAllDishes);
// delete Restaurant or Restaurants
router.delete("/restaurantDelete", adminController.deleteRestaurant);

// router.delete("/dishDelete", adminController.deleteDishs);

// delete dish for specific Restaurant
router.delete("/dishDelete", adminController.removeOneOrManyItems);
// for search dishes minPrice and maxPrice and category and name
router.get("/searchDishes", adminController.searchDishes);

//edit restaurant 
router.put("/restaurant/edit", adminController.editRestaurant);
// edit dish
router.put("/dish/edit", adminController.editDish);

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
