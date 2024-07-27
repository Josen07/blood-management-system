import nodemailer from "nodemailer";

// Replace with your SMTP service credentials
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "projectblooddonation24@gmail.com",
    pass: "zefsszprjxmkudky",
  },
});

export default async function notifyDonors() {
  const emailList = ["anandsudeep5@gmail.com"];
  // Create email content
  const subject = "Notification from ProjectBloodDonation24";
  const htmlContent = "<p>This is the notification content.</p>"; // Customize as needed

  // Send emails
  console.log("Mail send start");
  const emailsToSend = emailList.map((email) => ({
    from: "projectblooddonation24@gmail.com",
    to: email,
    subject,
    html: htmlContent,
  }));

  await Promise.all(
    emailsToSend.map((mailOptions) => transporter.sendMail(mailOptions))
  );
  console.log("Mail send end");

  res.status(200).json({ message: "Emails sent successfully!" });
}
