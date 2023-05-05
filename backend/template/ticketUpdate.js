export const ticketUpdate = `
<body>
<div style="background-color: #f5f5f5; padding: 20px">
 <h1>Ticket Update</h1>

    <p>Hello,</p>

    <p>A ticket has been updated in the ${projectname} project:</p>

    <ul>
      <li><strong>Ticket Name:</strong> ${ticket_name}</li>
      <li><strong>Updater:</strong> ${updater_name}</li>
      <li><strong>Type:</strong> ${ticket_type}</li>
      <li><strong>Priority:</strong> ${ticket_priority}</li>
      <li><strong>Assigned to:</strong> ${assignee_name}</li>
      <li><strong>Watchers:</strong> ${watcher_name}</li>
      <li><strong>Expected Completion Date:</strong> ${expected_date}</li>
      <li><strong>Reopen Date:</strong> ${reopen_date}</li>
      <li><strong>Close Date:</strong> ${close_date}</li>
      <li><strong>Description:</strong> ${ticket_description}</li>
    </ul>

    <p>Thank you for your attention to this matter.</p>

    <p>Best regards,</p>
    <p>${company_name}</p>
</div>
   
  </body>
`;
