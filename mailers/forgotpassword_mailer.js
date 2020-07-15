const nodeMailer = require("../config/nodemailer");
exports.forgotPassword = (user) => {
  // taking the html content from the template
  let htmlString = nodeMailer.renderTemplate({ user: user }, "/forgot.ejs");
  // send mail with defined Transporter Object
  nodeMailer.transporter.sendMail(
    {
      from: "abhi.jrt12@gmail.com",
      to: user.email,
      subject: "Reset Passsword Link",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending the mail", err);
        return;
      }
      console.log("Message Sent!");
      return;
    }
  );
};
