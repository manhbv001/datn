// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

export async function resetPassword(newPassword: string, email: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Reset Password',
    html: `<div class="container">
        <h2>New Password</h2>
        <p>Your new password is: <span class="password">${newPassword}</span></p>
        <p>Please login with this new password and consider changing it to a memorable one.</p>
        <div class="footer">
            <p>If you did not request a password reset, please contact support.</p>
        </div>
    </div>`,
  };
  await transporter.sendMail(mailOptions);
}
