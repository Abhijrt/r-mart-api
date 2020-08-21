// importing the mongoose
const mongoose = require("mongoose");

// creating the new database
mongoose.connect(
  `mongodb://heroku_zct8hdr0:m4igsv9q4spahagb5kaa8cfnt2@ds241268.mlab.com:41268/heroku_zct8hdr0` ||
    `mongodb://localhost/r-mart`
);

// connet the database and server
const db = mongoose.connection;

// if data base has error on connecting
db.on(
  "error",
  console.error.bind(console, "Error on connecting to the data base")
);

// if database is connedted successfully
db.once("open", function () {
  console.log("Successfully Connecting to the Database");
});

module.exports = db;
