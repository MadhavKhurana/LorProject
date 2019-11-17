const nodemailer = require("nodemailer");
// const Myusername = require("../config/keys").EmailId;
// const Mypassword = require("../config/keys").Password;

module.exports.smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testemailidformail@gmail.com",
    pass: "plmplmplm"
  }
});
