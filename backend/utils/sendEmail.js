const nodeMailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Skipping email: EMAIL_USER and EMAIL_PASS are not configured.");
    return;
  }

  try {
    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending Email:", error.message);
  }
};

module.exports = sendEmail;
