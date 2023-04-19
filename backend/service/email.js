const {transporter} = require("../config/nodeMailerTransporter");

const sendEmail = async(to, subject, html) => {
    await transporter.sendMail({
        from: '<doctolib.app@gmail.com>',
        to,
        subject,
        html
      }); 
}

module.exports = {

}