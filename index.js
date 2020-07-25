// importing the express server
const express = require("express");
const bodyParser = require("body-parser");
// Giving the port number on which the server run
const port = 8000;

// take the server as a app
const app = express();

// tell the server to use database
const db = require("./config/mongoose");

// tell the server to use the assets
app.use(express.static("./assets"));

// for using the json as a input
app.use(express.json());
// for using the request for taking the inputs
app.use(express.urlencoded());
// for using the json as a input
app.use(bodyParser.json());

// tell the server to use jwt strategy
const passportJWT = require("./config/passport-jwt-strategy");

// tell the app to use the router
app.use("/", require("./routes"));

// tell the server to run on the port number 800
app.listen(port, function (err) {
  if (err) {
    console.log("Error on connecting to the Server");
    return;
  }
  console.log(`Connected Successfully to the server on port number ${port}`);
});
