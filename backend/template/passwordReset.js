export const passWordReset = `

  <body>
  <div style="background-color: #f5f5f5; padding: 20px">
  <h1>Password Reset</h1>

    <p>Hello,</p>

    <p>
      We received a request to reset your password for [your app name]. Please
      click the following link to reset your password:
    </p>

    <p><a href="http://localhost:3003/reset-password?token=${data.token}">Reset Password</a></p>

    <p>
      If you did not request to reset your password, please ignore this message
      and your password will remain unchanged.
    </p>

    <p>Thank you for using [your app name]!</p>

    <p>Best regards,</p>
    <p>${companyName}</p>
  </div>
    
  </body>
`;
