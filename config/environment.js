// const fs = require("fs");
// const path = require("path");

const development = {
  name: "development",
  assetss_path: "/assets",
  session_cookie_key: "blashsomething",
  db: "",
  smtp: {
    service: "gmail",
    post: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  },
  Google_client_ID: "",
  Google_client_secret: "",
  Google_callback_URL: "",
  Google_JWT_Secret: "",
};
const production = {
  name: "production",
  assetss_path: "/assets",
  session_cookie_key: "blashsomething",
  db: "",
  smtp: {
    service: "gmail",
    post: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  },
  Google_client_ID: "",
  Google_client_secret: "",
  Google_callback_URL: "",
  Google_JWT_Secret: "",
  redisURL:
    "redis://h:pef5f83fd553d0f1bd8d5f9b4de3e08a0255565eff7381b02310709471b53ca3e@ec2-54-198-31-23.compute-1.amazonaws.com:9189",
};

module.exports = development;

// for production mode or a developement
// module.exports = eval(production == undefined) ? development : eval(production);
