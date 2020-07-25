// importing the user model
const User = require("../../../model/users");
// importing the Product Model for adding the product
const Product = require("../../../model/stock");
// importing the bcrypt for password encrypted
const bcrypt = require("bcrypt");

// when a register call come then the this function call
module.exports.register = async function (req, res) {
  try {
    // converting email to lower case
    let email = req.body.email;
    let newEmail = email.toLowerCase();

    // finding the user if already present
    let user = await User.findOne({ email: newEmail });

    //  if password and confirm password not match then send the message
    if (req.body.password != req.body.confirm_password) {
      return res.status(400).json({
        message: "Password and Confirm Password must be same",
      });
    }

    // password convert in encrypted form
    let password = req.body.password;
    let newPassword = await bcrypt.hash(password, 10);

    //   if user not present then create a new user
    if (!user) {
      let user = await User.create({
        email: newEmail,
        name: req.body.name,
        password: newPassword,
        category: "admin",
      });
      return res.status(200).json({
        message: "Admin Registered SuccessFully",
        success: true,
      });
    }
    //   if the email address is already register then send a message
    else {
      return res.status(200).json({
        message: "This Email Address has Already account",
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: "Internal Server Error",
    });
  }
};

// when a admin add the product then this function will call
module.exports.addProduct = async function (req, res) {
  try {
    // finding the product if already present
    let product = await Product.findOne({
      product_name: req.body.product_name,
    });

    // if present then send message
    if (product) {
      return res.status(200).json({
        message: "Product Already In Stock",
        success: true,
      });
    }
    // if already not present then add the product
    Product.create({
      product_name: req.body.product_name,
      stock_quantity: req.body.stock_quantity,
      selling_price: req.body.selling_price,
      marked_price: req.body.marked_price,
      description: req.body.description,
      category: req.body.category,
      sold_by: req.body.sold_by,
      product_image: "Added",
    });
    // sending the message
    return res.status(200).json({
      message: "Product Added",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal Server Error On adding Products",
      success: false,
    });
  }
};

// when admin update any quantity
module.exports.updateProducts = async function (req, res) {
  try {
    // finding the product and updating
    await Product.findOneAndUpdate(
      { product_name: req.body.product_name },
      {
        product_name: req.body.product_name,
        stock_quantity: req.body.stock_quantity,
        selling_price: req.body.selling_price,
        marked_price: req.body.marked_price,
        description: req.body.description,
        category: req.body.category,
        sold_by: req.body.sold_by,
        product_image: "Updated",
      }
    );
    return res.status(200).json({
      message: "Product Updated",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal Server Error on Updating Products",
    });
  }
};

// when we want to delete the Product
module.exports.deleteProduct = async function (req, res) {
  try {
    let productId = req.params.product_id;
    // checking that product is present or not
    let product = await Product.findById(productId);
    console.log("Hii");
    if (product) {
      // finding the product and deleting
      await Product.findByIdAndDelete(productId);
      return res.status(200).json({
        message: "Product Deleted SuccessFully",
      });
    }
    return res.status(200).json({
      message: "Product is not in the List",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error on deleteing the product",
    });
  }
};
