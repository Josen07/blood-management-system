"use server";
import emailjs from "emailjs";

// bloodgroup: string;
//     unite: string;
//     urgency: string;
//     date: string;
//     time: string;
//     rname: string;
//     rnumber: string;
//     raddr: string;
//     hospitalname: string;
//     hospitaladdr: string;
//     district: string;
//     status: string;
//     donorlist: any[];

export default async function notifyDonors2(data) {
  const emailjsClient = await emailjs.init({
    user: "projectblooddonation24@gmail.com",
    password: "zefsszprjxmkudky",
    service: "gmail",
  });

  const emailData = {
    from: "projectblooddonation24@gmail.com",
    to: "anandsudeep5@gmail.com",
    subject: "Notification from ProjectBloodDonation24",
    html: `
    <h1>Blood Donation Request Details</h1>
    <ul>
      <li><b>Urgency:</b> ${data.urgency}</li>
      <li><b>Units Needed:</b> ${data.unite}</li>
      <li><b>Blood Group:</b> ${data.bloodgroup}</li>
      <li><b>Recipient Contact:</b> ${data.rnumber}</li>
      <li><b>Recipient District:</b> ${data.district}</li>
    </ul>
  `,
  };

  emailjsClient
    .send("service_id", "template_id", emailData)
    .then((response) => {
      console.log("Email sent successfully:", response.status, response.text);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}
