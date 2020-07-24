// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const adminController = require("../../../controllers/api/v1/admin_controller");
const passport = require("passport");

// calling the home controller
router.post(
  "/register",
  passport.authenticate("jwt", {
    session: false,
  }),
  adminController.register
);
router.post(
  "/addProducts",
  passport.authenticate("jwt", {
    session: false,
  }),
  adminController.addProduct
);
router.post(
  "/updateProducts",
  passport.authenticate("jwt", {
    session: false,
  }),
  adminController.updateProducts
);
// exporting the router to be used in different module or files
module.exports = router;
