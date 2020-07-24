// importing the user model
const User = require("../../../model/users");

// importing bcrypt for password encryption
const bcrypt = require("bcrypt");

// for generating the random token
const crypto = require("crypto");

// imporing the registration mailer for sending the mail when user created
const registrationMailer = require("../../../mailers/register_mailer");
const loginMailer = require("../../../mailers/login_mailer");
const forgotMailer = require("../../../mailers/forgotpassword_mailer");

// Email worker for call the email
const registerEmailWorker = require("../../../workers/register_worker");
const queue = require("../../../config/kue");

// importing jsonwebtoken for generating token
const jwt = require("jsonwebtoken");

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
      user = await User.create({
        email: newEmail,
        phone: req.body.phone,
        name: req.body.name,
        password: newPassword,
        category: "user",
      });
      // calling the new registration mailer for sending the mail
      // registrationMailer.newRegistration(user);
      let job = queue.create("register", user).save(function (err) {
        if (err) {
          console.log("Error in creating the job queue");
          return;
        }
        console.log("job enqueued", job.id);
      });
      return res.status(200).json({
        message: "User Registered SuccessFully",
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

// when user want to login
module.exports.createSession = async function (req, res) {
  try {
    // converting email to lower case
    let email = req.body.email;
    let newEmail = email.toLowerCase();
    // finding the user that are present in the database or not by email
    let user = await User.findOne({ email: newEmail });

    // comparing the users password and requested password
    let userPassword = await bcrypt.compare(req.body.password, user.password);
    // if user not present or password not match then
    if (!user || !userPassword) {
      return res.status(422).json({
        message: "Invalid username or Password",
      });
    }
    if (user.category === "admin") {
      return res.status(200).json({
        message: "Logged In Admin SuccessFully",
        success: true,
        data: {
          token: jwt.sign(user.toJSON(), "social-api", {
            expiresIn: "100000",
          }),
        },
      });
    }
    loginMailer.userLogin(user);
    console.log("at last");
    // if user is present and password match then we send the response with token
    return res.status(200).json({
      message: "Sign in Successfull",
      success: true,
      data: {
        token: jwt.sign(user.toObject(), "social-api", {
          expiresIn: "100000",
        }),
      },
    });
  } catch (err) {
    console.log("erroir", err);
    return res.json(400, {
      message: "Internal Server Error",
    });
  }
};

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
  let user = User.findOne({ resetLink: token });
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
    console.log(newPassword);
    return res.status(200).json({
      message: "Rest Password SuccessFulyy",
    });
  }
  return res.status(400).json({
    message: "Wrong Email",
  });
};
