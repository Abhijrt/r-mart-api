// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const usersController = require("../../../controllers/api/v1/users_controller");

// calling the home controller
router.post("/register", usersController.register);
router.post("/login", usersController.createSession);
// exporting the router to be used in different module or files
module.exports = router;
