const {transporter} = require("../config/nodeMailerTransporter");

const sendEmail = async(to, subject, html) => {
    await transporter.sendMail({
        from: '<doctolib.app@gmail.com>',
        to,
        subject,
        html
      }); 
}

const sendProjectCreateEmail = async(data) =>{
  const html = `<h1> Project Creation </h1>`;
  await sendEmail(data.watchers, "Project Creation", html);
}

const sendProjectUpdateEmail = async(data) =>{
  const html = `<h1> Project Update </h1>`
  await sendEmail(data.watchers, "Project Update", html);
}

const sendSprintCreateEmail = async(data) =>{
  const html = `<h1> Sprint Creation </h1>`;
  await sendEmail(data.watchers, "Sprint Creation", html);
}

const sendSprintUpdateEmail = async(data) =>{
  const html = `<h1> Sprint Update </h1>`
  await sendEmail(data.watchers, "Sprint Update", html);
}

const sendTicketCreateEmail = async(data) =>{
  const html = `<h1> Ticket Creation </h1>`;
  await sendEmail(data.watchers, "Ticket Creation", html);
}

const sendTicketUpdateEmail = async(data) =>{
  const html = `<h1> Ticket Update </h1>`
  await sendEmail(data.watchers, "Ticket Update", html);
}

module.exports = {
  sendProjectCreateEmail,
  sendProjectUpdateEmail,
  sendSprintCreateEmail,
  sendSprintUpdateEmail,
  sendTicketCreateEmail,
  sendTicketUpdateEmail
}