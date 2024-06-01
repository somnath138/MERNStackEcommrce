const nodeMailer = require("nodemailer"); //use to send the email
//const { options } = require("../app")

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email, //user theke jeee email ta  asche setay pathate hobe
    subject: options.subject,
    text: options.message,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error for proper handling in your application
  }
};
module.exports = sendEmail;
