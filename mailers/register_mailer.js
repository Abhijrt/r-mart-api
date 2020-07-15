const nodeMailer = require("../config/nodemailer");
exports.newRegistration = (user) => {
  nodeMailer.transporter.sendMail(
    {
      from: "abhi.jrt12@gmail.com",
      to: user.email,
      subject: "Registration SuccessFull",
      html: "<h1>You are registered successfull</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending the mail");
        return;
      }
      console.log("Message Send");
      return;
    }
  );
};
