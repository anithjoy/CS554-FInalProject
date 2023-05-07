export const sprintCreate = `
<body>
    <div style="background-color: #f5f5f5; padding: 20px">
      <h1>New Sprint Created</h1>
      <p>Hello,</p>
      <p>A new sprint has been created for the following project:</p>
      <ul>
        <li><strong>Project Name:</strong> ${projectName}</li>
        <li><strong>Sprint Name:</strong> ${sprintName}</li>
        <li><strong>Start Date:</strong> ${startDate}</li>
        <li><strong>Description:</strong> ${sprintDescription}</li>
      </ul>
      <p>
        You can view the details of the new sprint by logging in to our
        platform.
      </p>
      <p>Thank you,</p>
      <p>The ${COMPANY_NAME} Team</p>
    </div>

`;
