const express = require("express");
const router = express.Router();
const { route } = require("..");

const adminController = require("../controllers/adminController");

// farah

// Define admin routes
router.get("/Dishes", adminController.getDishItems);
// router.post("/Dishes", adminController.addDish);
router.post("/Restaurant", adminController.addRestaurant);
router.post("/DishToRestaurant", adminController.addDishToRestaurant); // Add this line

// ahmad
// router.post("/restaurant", adminController.addRestaurant);
router.post("/dish", adminController.addDish);
router.get("/restaurants", adminController.getAllRestaurants);
router.get("/restaurants/:restaurantId", adminController.getAllDishes);
router.delete("/restaurantDelete", adminController.deleteRestaurant);
router.delete("/dishDelete", adminController.deleteDishs);
router.get("/searchDishes", adminController.searchDishes);

//in line 14
router.put("/restaurant/edit", adminController.editRestaurant);
// in line 15
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
