const nodemailer = require("nodemailer");

const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`; // Change to frontend reset URL

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"No Reply" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset.</p>
           <p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;

