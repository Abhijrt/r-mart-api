// importing the user model
const User = require("../../../model/users");

// importing bcrypt for password encryption
const bcrypt = require("bcrypt");

// for generating the random token
const crypto = require("crypto");

// importing jsonwebtoken for generating token
const jwt = require("jsonwebtoken");

const forgotMailer = require("../../../mailers/forgotpassword_mailer");

// when forgot password link call then this function call
module.exports.forgotPassword = async function (req, res) {
  try {
    // converting email to lower case
    let email = req.body.email;
    let newEmail = email.toLowerCase();
    // finding the user that are request for the forgot password
    let user = await User.findOne({ email: newEmail });

    // if user present then update rest link and send mail
    if (user) {
      let token = await jwt.sign(user.toObject(), "social-api", {
        expiresIn: "10000",
      });
      await User.findOneAndUpdate({ email: newEmail }, { resetLink: token });
      console.log("Token Updated", token);
      user = await User.findOne({ email: newEmail });
      forgotMailer.forgotPassword(user);
      return res.status(200).json({
        message: "We send you the mail for reset password",
      });
    }
    // if not present user then send message
    return res.status(401).json({
      message: "Invaild User",
    });
  } catch (err) {
    console.log("error", err);
    return res.status(401).json({
      message: "Internal Server Error",
    });
  }
};

// when a password reset for the user then this call
module.exports.changePassword = async function (req, res) {
  let token = req.params.token;
  let user = await User.findOne({ resetLink: token });
  console.log("User", user);
  if (user) {
    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({
        message: "Password And Confirm password must be same",
      });
    }
    let password = req.body.password;
    let newPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { resetLink: token },
      { password: newPassword }
    );
    await User.findOneAndUpdate({ resetLink: token }, { resetLink: "" });
    return res.status(200).json({
      message: "Reset Password SuccessFulyy",
    });
  }
  return res.status(400).json({
    message: "Link Expired",
  });
};
