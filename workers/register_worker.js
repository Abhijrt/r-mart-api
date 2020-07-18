// importing queue
const queue = require("../config/kue");
// importing register mailer
const registerMailer = require("../mailers/register_mailer");

// when any email come into the queue then it run
// process method tell the worker whenever a new task is added to the queue you need to run the code inside the process method
queue.process("register", function (job, done) {
  console.log("emails worker is processing");
  registerMailer.newRegistration(job.data);
  done();
});
