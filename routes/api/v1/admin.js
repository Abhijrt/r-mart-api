// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const adminController = require("../../../controllers/api/v1/admin_controller");

// calling the home controller
router.post("/register", adminController.register);
router.post("/addProducts", adminController.addProduct);

// exporting the router to be used in different module or files
module.exports = router;
