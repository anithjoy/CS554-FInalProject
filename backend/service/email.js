const {transporter} = require("../config/nodeMailerTransporter");

const sendEmail = async(to, subject, html) => {
    await transporter.sendMail({
        from: '<workmate.webapp@gmail.com>',
        to,
        subject,
        html
      }); 
}

const sendPasswordResetLinkEmail = async(data) =>{
  const html = `<h1> Password Reset </h1> <p>Link = <a href = "http://localhost:3003/reset-password?token=${data.token}">Reset Your Password</a></p>`;
  await sendEmail(data.email, "Password Reset", html);
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
  sendPasswordResetLinkEmail,
  sendProjectCreateEmail,
  sendProjectUpdateEmail,
  sendSprintCreateEmail,
  sendSprintUpdateEmail,
  sendTicketCreateEmail,
  sendTicketUpdateEmail
}