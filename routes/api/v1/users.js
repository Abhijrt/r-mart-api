// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const usersController = require("../../../controllers/api/v1/users_controller");
const passport = require("passport");

// calling the home controller for register
router.post("/register", usersController.register);
// calling the login controller
router.post("/login", usersController.createSession);

// show user profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  usersController.profile
);

// update user profile
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  usersController.update
);
// exporting the router to be used in different module or files
module.exports = router;
