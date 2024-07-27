// import nodemailer from "nodemailer";

// // Replace with your SMTP service credentials
// const transporter = nodemailer.createTransport({
//   service: "gmail", // e.g., 'SendGrid', 'Mailgun'
//   auth: {
//     user: "projectblooddonation24@gmail.com",
//     pass: "zefsszprjxmkudky",
//   },
// });

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const data = req.body;

//     console.log(req.body);
//     console.log(" test email");
//     //   try {
//     //     // Fetch email addresses from Firestore
//     //     const admin = require("firebase-admin");
//     //     const serviceAccount = require("../path/to/your/serviceAccountKey.json"); // Replace with your service account key path
//     //     admin.initializeApp({
//     //       credential: admin.credential.cert(serviceAccount),
//     //     });

//     // const db = admin.firestore();
//     // const emailsRef = db.collection("emailList");
//     // const emailSnapshot = await emailsRef.get();

//     // const emailList = emailSnapshot.docs.map((doc) => doc.data().email);
//     const emailList = ["anandsudeep5@gmail.com"];
//     // Create email content
//     const subject = "Notification from ProjectBloodDonation24";
//     const htmlContent = "<p>This is the notification content.</p>"; // Customize as needed

//     // Send emails
//     const emailsToSend = emailList.map((email) => ({
//       from: "projectblooddonation24@gmail.com",
//       to: email,
//       subject,
//       html: htmlContent,
//     }));

//     try {
//       transporter.sendMail({
//         emailsToSend,
//       });
//     } catch (error) {
//       console.log(error);
//     }

//     // await Promise.all(
//     //   emailsToSend.map((mailOptions) => transporter.sendMail(mailOptions))
//     // );
//   }

//   res.status(200).json({ message: "Emails sent successfully!" });
//   //   } catch (error) {
//   //     console.error(error);
//   //     res.status(500).json({ message: "Error sending emails" });
//   //   }
// }
