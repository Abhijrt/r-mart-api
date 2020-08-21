// importing the kue
const kue = require("kue");

const env = require("./environment");

let queue = null;

if (env.name === "development") {
  queue = kue.createQueue();
} else {
  queue = kue.createQueue({ redis: env.redisURL });
}
// creating the queue

// expoting the kue
module.exports = queue;
