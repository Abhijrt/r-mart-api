const nodeMailer = require("../config/nodemailer");
exports.newRegistration = (user) => {
  // taking the html content from the template
  let htmlString = nodeMailer.renderTemplate({ user: user }, "mailer.ejs");
  // send mail with defined Transporter Object
  nodeMailer.transporter.sendMail(
    {
      from: "abhi.jrt12@gmail.com",
      to: user.email,
      subject: "Registration SuccessFull",
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
