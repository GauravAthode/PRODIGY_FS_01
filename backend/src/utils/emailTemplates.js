/**
 * Email Templates
 * All templates use inline CSS for maximum email client compatibility.
 */

export const otpEmailTemplate = (otp, purpose = "verification") => {
  const title =
    purpose === "reset" ? "Reset Your Password" : "Verify Your Account";
  const subtitle =
    purpose === "reset"
      ? "Use the OTP below to reset your password."
      : "Use the OTP below to verify your email address.";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="100%" max-width="480" cellpadding="0" cellspacing="0" border="0" style="max-width:480px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700; letter-spacing:0.5px;">${title}</h1>
              <p style="color:rgba(255,255,255,0.85); margin:10px 0 0; font-size:14px;">${subtitle}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px; text-align:center;">
              <p style="color:#4b5563; font-size:15px; margin:0 0 24px; line-height:1.6;">
                Your one-time password (OTP) is:
              </p>
              
              <div style="display:inline-block; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:4px; border-radius:12px; margin-bottom:24px;">
                <div style="background:#ffffff; border-radius:10px; padding:20px 40px;">
                  <span style="font-size:36px; font-weight:800; letter-spacing:12px; color:#1f2937; font-family:'Courier New', monospace;">${otp}</span>
                </div>
              </div>

              <p style="color:#6b7280; font-size:13px; margin:0 0 8px;">
                This OTP will expire in <strong style="color:#dc2626;">5 minutes</strong>.
              </p>
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                &copy; ${new Date().getFullYear()} SecureAuth. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const welcomeEmailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome!</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="100%" max-width="480" cellpadding="0" cellspacing="0" border="0" style="max-width:480px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700; letter-spacing:0.5px;">Welcome, ${name}! 🎉</h1>
              <p style="color:rgba(255,255,255,0.9); margin:10px 0 0; font-size:14px;">Your account has been successfully verified.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px; text-align:center;">
              <p style="color:#4b5563; font-size:15px; margin:0 0 24px; line-height:1.6;">
                Thank you for joining us! Your email has been verified and your account is now active.
              </p>
              
              <a href="#" style="display:inline-block; background:linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color:#ffffff; text-decoration:none; padding:14px 36px; border-radius:8px; font-size:15px; font-weight:600; box-shadow:0 4px 15px rgba(17,153,142,0.3);">
                Go to Dashboard
              </a>

              <p style="color:#9ca3af; font-size:12px; margin:24px 0 0;">
                If you have any questions, feel free to reach out to our support team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                &copy; ${new Date().getFullYear()} SecureAuth. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const resetPasswordEmailTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="100%" max-width="480" cellpadding="0" cellspacing="0" border="0" style="max-width:480px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding:40px 30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700; letter-spacing:0.5px;">Reset Your Password</h1>
              <p style="color:rgba(255,255,255,0.9); margin:10px 0 0; font-size:14px;">We received a request to reset your password.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px; text-align:center;">
              <p style="color:#4b5563; font-size:15px; margin:0 0 24px; line-height:1.6;">
                Enter the OTP below on the password reset page to continue:
              </p>
              
              <div style="display:inline-block; background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding:4px; border-radius:12px; margin-bottom:24px;">
                <div style="background:#ffffff; border-radius:10px; padding:20px 40px;">
                  <span style="font-size:36px; font-weight:800; letter-spacing:12px; color:#1f2937; font-family:'Courier New', monospace;">${otp}</span>
                </div>
              </div>

              <p style="color:#6b7280; font-size:13px; margin:0 0 8px;">
                This OTP will expire in <strong style="color:#dc2626;">5 minutes</strong>.
              </p>
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                If you didn't request a password reset, please ignore this email or contact support.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                &copy; ${new Date().getFullYear()} SecureAuth. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

