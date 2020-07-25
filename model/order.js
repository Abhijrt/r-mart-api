// importing the mongoose
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        product_id: {
          type: String, //mongoose.Schema.Types.ObjectId,
          // ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        marked_price: {
          type: Number,
          required: true,
        },
        selling_price: {
          type: Number,
          required: true,
        },
        sold_by: {
          type: String,
          required: true,
        },
      },
    ],
    total_amount: {
      type: Number,
      required: true,
    },
    payment_mode: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    shipping_cost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// to remove a password from an instance
if (!orderSchema.options.toObject) orderSchema.options.toObject = {};
orderSchema.options.toObject.transform = function (doc, ret, options) {
  // delete the passworc and createdAt and UpdatedAt of every document before retuning the result
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  return ret;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
