// importing node mailer
const nodemailer = require("nodemailer");
// importing path
const path = require("path");

// importing the ejs
const ejs = require("ejs");

// creating reusable transporter object using the default SMPT transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "abhi.jrt12@gmail.com",
    pass: "",
  },
});

// rendering template for sending the mail
let renderTemplate = (data, relativepath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativepath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering the HTML", err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
