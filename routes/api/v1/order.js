// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// fetching the order controller
const orderController = require("../../../controllers/api/v1/order_controller");
const passport = require("passport");

// placing the order
router.post(
  "/place_order",
  passport.authenticate("jwt", { session: false }),
  orderController.placeOrder
);

router.get(
  "/orderDetail/:order_id",
  passport.authenticate("jwt", { session: false }),
  orderController.orderDetail
);

// exporting the router to be used in different module or files
module.exports = router;
