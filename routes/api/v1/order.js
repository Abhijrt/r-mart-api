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

// when perticular order details route come
router.get(
  "/orderDetail/:order_id",
  passport.authenticate("jwt", { session: false }),
  orderController.orderDetail
);

// when all order detail route come
router.get(
  "/get_all_order",
  passport.authenticate("jwt", { session: false }),
  orderController.getAllOrder
);

// when a order delete controller come
router.get(
  "/delete_order/:order_id",
  passport.authenticate("jwt", { session: false }),
  orderController.deleteOrder
);

// exporting the router to be used in different module or files
module.exports = router;
