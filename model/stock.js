// importing the mongoose
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock_quantity: {
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
    category: {
      type: String,
      required: true,
    },
    sold_by: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// to remove a password from an instance
if (!productSchema.options.toObject) productSchema.options.toObject = {};
productSchema.options.toObject.transform = function (doc, ret, options) {
  // delete the passworc and createdAt and UpdatedAt of every document before retuning the result
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  return ret;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
