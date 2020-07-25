// importing the order schema
const Order = require("../../../model/order");

// when a user place order
module.exports.placeOrder = async function (req, res) {
  try {
    // console.log("Hii");
    // console.log(req.body);
    // console.log(Date.now());
    // console.log(req.body.order_id);
    // console.log(req.body.products);
    // console.log(req.body.total_amount);
    // console.log(req.body.payment_mode);
    // console.log(req.body.order_status);
    // console.log(req.body.address);
    // console.log(req.body.mobile_no);
    // console.log(req.body.city);
    // console.log(req.body.pincode);
    // console.log(req.body.shipping_cost);
    let order = await Order.create({
      user: req.user.id,
      order_id: Date.now(),
      products: req.body.products,
      total_amount: req.body.total_amount,
      payment_mode: req.body.payment_mode,
      order_status: req.body.order_status,
      address: req.body.address,
      mobile_no: req.body.mobile_no,
      city: req.body.city,
      pincode: req.body.pincode,
      shipping_cost: req.body.shipping_cost,
    });
    console.log("Hiiii");
    if (order) {
      return res.status(200).json({
        message: "Order Placed ",
        success: true,
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      message: "Internal Server Error on Placing the Order",
    });
  }
};
