const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "workmate.webapp@gmail.com",
        pass: "yfglyzcnfcelgird",
    }
  });

  module.exports = {
    transporter
  }
