// importing the express server
const express = require("express");

// Giving the port number on which the server run
const port = 8000;

// take the server as a app
const app = express();

// tell the server to use database
const db = require("./config/mongoose");

// tell the server to use the assets
app.use(express.static("./assets"));

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
