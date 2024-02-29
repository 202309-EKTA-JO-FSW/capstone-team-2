const express = require("express");
const router = express.Router();
const { route } = require("..");
const { ensureAuth, verifyIsAdmin } = require("../middlewares/userAuth");

const adminController = require("../controllers/adminController");

// Define admin routes

// for get all dishes
router.get("/Dishes", ensureAuth, verifyIsAdmin, adminController.getDishItems);


module.exports = router;
