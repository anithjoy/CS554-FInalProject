export const ticketCreate = `
<body>
    <div style="background-color: #f5f5f5; padding: 20px">
      <h1>New Ticket Created</h1>
      <p>Hello,</p>
      <p>A new ticket has been created in the ${projectname} project::</p>
      <ul>
        <li><strong>Ticket Name:</strong> ${ticketName}</li>
        <li><strong>Creator:</strong> ${creator}</li>
        <li><strong>Type:</strong> ${type}</li>
        <li><strong>Priority:</strong> ${priority}</li>
        <li><strong>Assignee:</strong> ${assignee}</li>
        <li><strong>Watchers:</strong> ${watchers}</li>
        <li><strong>Expected Date:</strong> ${expectedDate}</li>
        <li><strong>Reopen Date:</strong> ${reopenDate}</li>
        <li><strong>Close Date:</strong> ${closeDate}</li>
        <li><strong>Description:</strong> ${ticketDescription}</li>
      </ul>
      <p>
        You can view the details of the ticket by logging in to our platform.
      </p>
      <p>Thank you,</p>
      <p>The ${COMPANY_NAME} Team</p>
    </div>
  </body>

`;
