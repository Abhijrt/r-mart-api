// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const adminController = require("../../../controllers/api/v1/admin_controller");

// calling the register controller
router.post("/register", adminController.register);
// exporting the router to be used in different module or files
module.exports = router;
