// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the home controller
const productController = require("../../../controllers/api/v1/product_controller");
const passport = require("passport");

// calling the addProduct Controller
router.post(
  "/addProducts",
  passport.authenticate("jwt", {
    session: false,
  }),
  productController.addProduct
);
// calling the updateProduct Controller
router.post(
  "/updateProducts",
  passport.authenticate("jwt", {
    session: false,
  }),
  productController.updateProducts
);
// calling the delte controller
router.get(
  "/deleteProduct/:product_id",
  passport.authenticate("jwt", { session: false }),
  productController.deleteProduct
);
// exporting the router to be used in different module or files
module.exports = router;
