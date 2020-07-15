const nodeMailer = require("../config/nodemailer");
exports.userLogin = (user) => {
  nodeMailer.transporter.sendMail(
    {
      from: "abhi.jrt12@gmail.com",
      to: user.email,
      subject: "Login SuccessFull",
      html: "<h1>You are just Login To our Website</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending the mail");
        return;
      }
      console.log("Message Sent!");
      return;
    }
  );
};
