// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const homeControllers = require("../../../controllers/api/v1/home_controller");

// calling the home controller
router.get("/", homeControllers.home);

// when users route come then this route call
router.use("/users", require("./users"));

// when a admin route come then this route use
router.use("/admin", require("./admin"));

// exporting the router to be used in different module or files
module.exports = router;
