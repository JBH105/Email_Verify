const nodemailer = require("nodemailer");

const EmailAuth = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jbh.globaliasoft@gmail.com",
    pass: "yrfjthzxtqqocqyn",
  },
});

module.exports = { EmailAuth };
