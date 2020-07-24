const Products = require("../../../model/stock");
const Product = require("../../../model/stock");
// When a home page open this controller will work
module.exports.home = async function (req, res) {
  let products = await Product.find({});
  var newProducts = new Array(products.length);
  for (let i of products) {
    newProducts.push(i.toObject());
  }
  return res.status(200).json({
    message: "It A Home Page",
    success: true,
    products: newProducts,
  });
};
