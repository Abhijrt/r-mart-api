// importing the order schema
const Order = require("../../../model/order");

// when a user place order
module.exports.placeOrder = async function (req, res) {
  try {
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

// when a perticular order details find
module.exports.orderDetail = async function (req, res) {
  try {
    let orderId = req.params.order_id;
    let order = await Order.findById(orderId);
    if (order) {
      return res.status(200).json({
        message: "Order Details",
        success: true,
        order: order.toObject(),
      });
    }
    return res.status(400).json({
      message: "Invalid Order Id",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error on fetching the order Details",
    });
  }
};

// when a all order find
module.exports.getAllOrder = async function (req, res) {
  try {
    let orders = await Order.find({ user: req.user._id });
    // if order present thensend order and message
    if (orders) {
      // creating the new Array
      let newOrders = new Array(orders.length);
      // calling the to object method
      for (let i of orders) {
        newOrders.push(i.toObject());
      }
      return res.status(200).json({
        message: "ALL Order Details",
        success: true,
        orders: newOrders,
      });
    }
    // if user dont have any order
    return res.status(404).json({
      message: "You dont Have Any Order",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error on Fetching order Details",
    });
  }
};

module.exports.deleteOrder = async function (req, res) {
  try {
    let orderId = req.params.order_id;
    let order = await Order.findById(orderId);
    if (order) {
      if (order.order_status === "pending") {
        await Order.findByIdAndDelete(orderId);
        return res.status(200).json({
          message: "Order Cancelled Successfully",
          success: true,
        });
      }
      return res.status(401).json({
        message: "You can not delete this Order ",
      });
    }
    return res.status(404).json({
      message: "This order id is not valid",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error on deleting the order",
    });
  }
};
