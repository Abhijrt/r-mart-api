// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// when v1 url come then call the v1 route use
router.use("/v1", require("./v1"));

// exporting the router to be used in different module or files
module.exports = router;
