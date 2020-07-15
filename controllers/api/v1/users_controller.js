// importing the user model
const User = require("../../../model/users");
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
      User.create({
        email: newEmail,
        phone: req.body.phone,
        name: req.body.name,
        password: newPassword,
        category: "user",
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
      });
    }

    // if user is present and password match then we send the response with token
    return res.json(200, {
      message: "Sign in Successfull",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "hospital", { expiresIn: "10000" }),
      },
    });
  } catch (err) {
    return res.json(400, {
      message: "Internal Server Error",
    });
  }
};
