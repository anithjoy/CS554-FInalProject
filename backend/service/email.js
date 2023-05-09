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
  const passWordReset = `
  <body>
  <div style="background-color: #f5f5f5; padding: 20px">
  <h1>Password Reset</h1>

    <p>Hello,</p>

    <p>
      We received a request to reset your password for WorkMate. Please
      click the following link to reset your password:
    </p>

    <p><a href="http://localhost:3003/reset-password?token=${data.token}">Reset Password</a></p>

    <p>Thank you for using WorkMate!</p>
  </div>
    
  </body>
`;
  await sendEmail(data.email, "Password Reset", passWordReset);
}

const sendProjectCreateEmail = async(data) =>{
  const projectCreate = `

  <body>
    <div style="background-color: #f5f5f5; padding: 20px">
      <h1>New Project Created</h1>
      <p>Hello,</p>
      <p>A new project has been created. The project details are as follows:</p>
      <ul>
        <li><strong>Project Name:</strong> ${data.name}</li>
        <li><strong>Project Description:</strong> ${data.description}</li>
        <li><strong>Project Manager:</strong> ${data.manager}</li>
      </ul>
      <p>You can view the project details by logging in to our platform.</p>
    </div>
  </body>
`;
  await sendEmail(data.watchers, "Project Creation", projectCreate);
}

const sendProjectUpdateEmail = async(data) =>{
  const porjectUpdate = `
<body>
    <div style="background-color: #f5f5f5; padding: 20px">
      <h1>Project Update</h1>
      <p>Hello,</p>
      <p>The following updates have been made to the project:</p>
      <ul>
        <li><strong>Project Name:</strong> ${data.name}</li>
        <li><strong>Project Description:</strong> ${data.description}</li>
        <li><strong>Project Manager:</strong> ${data.manager}</li>
      </ul>
      <p>
        You can view the updated project details by logging in to our platform.
      </p>
    </div>
  </body>
`;
  await sendEmail(data.watchers, "Project Update", porjectUpdate);
}

const sendSprintCreateEmail = async(data) =>{
  const sprintCreate = `
<body>
    <div style="background-color: #f5f5f5; padding: 20px">
      <h1>New Sprint Created</h1>
      <p>Hello,</p>
      <p>A new sprint has been created for the following project:</p>
      <ul>
        <li><strong>Project Name:</strong> ${data.projectName}</li>
        <li><strong>Sprint Name:</strong> ${data.name}</li>
        <li><strong>Start Date:</strong> ${data.startDate}</li>
        <li><strong>Description:</strong> ${data.description}</li>
      </ul>
      <p>
        You can view the details of the new sprint by logging in to our
        platform.
      </p>
    </div>
  </body>
`;
  await sendEmail(data.watchers, "Sprint Creation", sprintCreate);
}

const sendSprintUpdateEmail = async(data) =>{
  const sprintUpdate = `

  <body>
      <div style="background-color: #f5f5f5; padding: 20px">
        <h1>Sprint Updated</h1>
        <p>Hello,</p>
        <p>The following sprint of ${data.projectName} has been updated:</p>
        <ul>
          <li><strong>Sprint Name:</strong> ${data.name}</li>
          <li><strong>Start Date:</strong> ${data.startDate}</li>
          <li><strong>Description:</strong> ${data.description}</li>
        </ul>
        <p>
          You can view the details of the updated sprint by logging in to our
          platform.
        </p>>
      </div>
    </body>
  `;
  
  await sendEmail(data.watchers, "Sprint Update", sprintUpdate);
}

const sendTicketCreateEmail = async(olddata) =>{
  const data = {...olddata}
  if(!data.expectedDate)
    data.expectedDate = "Not assigned"
  const ticketCreate = `
<body>
    <div style="background-color: #f5f5f5; padding: 20px">
      <h1>New Ticket Created</h1>
      <p>Hello,</p>
      <p>A new ticket has been created.</p>
      <ul>
        <li><strong>Ticket Name:</strong> ${data.name}</li>
        <li><strong>Creator:</strong> ${data.creator}</li>
        <li><strong>Type:</strong> ${data.type}</li>
        <li><strong>Priority:</strong> ${data.priority}</li>
        <li><strong>Assignee:</strong> ${data.assign}</li>
        <li><strong>Expected Date:</strong> ${data.expectedDate}</li>
        <li><strong>Description:</strong> ${data.description}</li>
      </ul>
      <p>
        You can view the details of the ticket by logging in to our platform.
      </p>
    </div>
  </body>

`;
  await sendEmail(data.watchers, "Ticket Creation", ticketCreate);
}

const sendTicketUpdateEmail = async(olddata) =>{
  const data = {...olddata}
  if(!data.expectedDate)
  data.expectedDate = "Not assigned"
  if(!data.closeDate)
  data.closeDate = "Not closed yet"
  if(!data.reopenDate)
  data.reopenDate = "Not reopened yet"

  const ticketUpdate = `
  <body>
  <div style="background-color: #f5f5f5; padding: 20px">
  <h1>Ticket Update</h1>

      <p>Hello,</p>

      <p>A ticket has been updated</p>

      <ul>
        <li><strong>Ticket Name:</strong> ${data.name}</li>
        <li><strong>Creator:</strong> ${data.creator}</li>
        <li><strong>Type:</strong> ${data.type}</li>
        <li><strong>Priority:</strong> ${data.priority}</li>
        <li><strong>Assignee:</strong> ${data.assign}</li>
        <li><strong>Expected Date:</strong> ${data.expectedDate}</li>
        <li><strong>Reopen Date:</strong> ${data.reopenDate}</li>
        <li><strong>Close Date:</strong> ${data.closeDate}</li>
        <li><strong>Description:</strong> ${data.description}</li>
      </ul>

      <p>Thank you for your attention to this matter.</p>
  </div>
    
    </body>
  `;
  await sendEmail(data.watchers, "Ticket Update", ticketUpdate);
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
