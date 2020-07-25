// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const adminController = require("../../../controllers/api/v1/admin_controller");
const passport = require("passport");

// calling the register controller
router.post("/register", adminController.register);

// calling the addProduct Controller
router.post(
  "/addProducts",
  passport.authenticate("jwt", {
    session: false,
  }),
  adminController.addProduct
);
// calling the updateProduct Controller
router.post(
  "/updateProducts",
  passport.authenticate("jwt", {
    session: false,
  }),
  adminController.updateProducts
);
// calling the delte controller
router.get(
  "/deleteProduct/:product_id",
  // passport.authenticate("jwt", { session: false }),
  adminController.deleteProduct
);
// exporting the router to be used in different module or files
module.exports = router;
