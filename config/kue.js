// importing the kue
const kue = require("kue");
// creating the queue
const queue = kue.createQueue();
// expoting the kue
module.exports = queue;
