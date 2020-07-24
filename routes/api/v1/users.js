// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const usersController = require("../../../controllers/api/v1/users_controller");

// calling the home controller for register
router.post("/register", usersController.register);
// calling the login controller
router.post("/login", usersController.createSession);

// show user profile
router.post("/profile", usersController.profile);

// update user profile
router.post("/update", usersController.update);
// exporting the router to be used in different module or files
module.exports = router;
