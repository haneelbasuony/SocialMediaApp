export const EmailTemplate = (otp: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your OTP Code</title>
      <style>
        body {
          background-color: #f9f9f9;
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 30px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4f46e5;
          color: #ffffff;
          padding: 20px;
          text-align: center;
          font-size: 22px;
          font-weight: bold;
        }
        .content {
          padding: 30px;
          text-align: center;
          color: #333333;
        }
        .otp-box {
          display: inline-block;
          background-color: #f1f5f9;
          padding: 15px 30px;
          margin-top: 20px;
          font-size: 24px;
          letter-spacing: 6px;
          font-weight: bold;
          color: #1e293b;
          border-radius: 6px;
        }
        .footer {
          padding: 20px;
          font-size: 13px;
          text-align: center;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Verification Code</div>
        <div class="content">
          <p>Hello,</p>
          <p>
            Use the following One-Time Password (OTP) to complete your sign-in or
            verification process. This code is valid for 5 minutes:
          </p>
          <div class="otp-box">${otp}</div>
          <p style="margin-top: 20px">
            If you did not request this code, you can safely ignore this email.
          </p>
        </div>
        <div class="footer">
          &copy; 2025 Your Company. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
};
