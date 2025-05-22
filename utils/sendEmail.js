const nodemailer = require("nodemailer");

const sendVerificationEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const link = `http://localhost:5000/api/verify-registration?token=${token}`;

  const mailOptions = {
    from: `"Secure App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email",
    html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;

