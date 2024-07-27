"use client";
import React from "react";
import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app, { db } from "../../firebase"; // Assuming your Firebase config file
import notifyDonors2 from "./../../fun/notify2";
// import { sendNotify } from "../../lib/api";

function BloodRequestPage() {
  const [formData, setFormData] = useState({
    bloodgroup: "",
    unite: "",
    urgency: "",
    date: "",
    time: "",
    rname: "",
    rnumber: "",
    raddr: "",
    hospitalname: "",
    hospitaladdr: "",
    district: "",
    status: "pending",
    donorlist: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandel = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const db = getFirestore(app); // Get Firestore instance
      const requestsCollection = collection(db, "requests-list");

      if (!formData.bloodgroup) {
        alert("Please select a blood group.");
        return;
      }

      // Add the request to Firestore
      const newRequest = await addDoc(requestsCollection, {
        ...formData, // Spread the entire formData object
      });

      //Send Notifiation
      notifyDonors2(formData);


      console.log("Request successfully added:", newRequest.id);
      alert("Your request has been submitted successfully!");

      //clear the form after successful submission
      setFormData({
        bloodgroup: "",
        unit: "",
        urgency: "",
        date: "",
        time: "",
        rname: "",
        rnumber: "",
        raddr: "",
        hospitalname: "",
        hospitaladdr: "",
        district: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding request:", error);
      alert(
        "An error occurred while submitting your request. Please try again."
      );
    }
    // const val = { a: "Data", b: "Data2" };
    // await sendNotify(val);
    alert("Your request has been submitted successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded shadow-md p-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800">
          Request Applying Form
        </h2>
        <div className="grid grid-cols-1 gap-9">
          <div className="flex items-center">
            <label htmlFor="bloodType" className="mr-2 text-gray-700">
              Blood Type:
            </label>
            <select
              onChange={handleChange}
              name="bloodgroup"
              id="bloodType"
              className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="unit" className="mr-2 text-gray-700">
              Unit Required:
            </label>
            <input
              id="unit"
              type="number" // Use type="number" for numeric input
              name="unite" // Name changed to "unit"
              className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
              min="0" // Set minimum value to 0 (positive number)
              required // Make the input required
            />
          </div>

          <div className="flex items-center">
            <h3 className="text-base font-bold text-gray-800 mr-2">Urgency:</h3>
            <select
              id="urgency"
              name="urgency"
              className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="">Select Urgency</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* Time */}
          <div className="flex flex-col w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="date" className="block text-gray-700 mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <label htmlFor="time" className="block text-gray-700 mt-2">
              Time
            </label>
            <input
              id="time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* Diatrict selection */}
          <div className="flex items-center">
            <label htmlFor="district" className="mr-2 text-gray-700">
              District:
            </label>
            <select
              id="district"
              name="district"
              className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="">Select District</option>
              <option value="alappuzha">Alappuzha</option>
              <option value="ernakulam">Ernakulam</option>
              <option value="idukki">Idukki</option>
              <option value="kannur">Kannur</option>
              <option value="kasaragod">Kasaragod</option>
              <option value="kollam">Kollam</option>
              <option value="kottayam">Kottayam</option>
              <option value="kozhikode">Kozhikode</option>
              <option value="malappuram">Malappuram</option>
              <option value="palakkad">Palakkad</option>
              <option value="pathanamthitta">Pathanamthitta</option>
              <option value="thrissur">Thrissur</option>
              <option value="thiruvananthapuram">Thiruvananthapuram</option>
              <option value="wayanad">Wayanad</option>
            </select>
          </div>

          {/* Additional filter options can be added here */}
          <div className="flex flex-col gap-8">
            <h3 className="text-base font-bold text-gray-800 mr-2">
              Recipient Information:
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label htmlFor="recipientName" className="block text-gray-700">
                  Recipient Name:
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="rname"
                  value={formData.rname}
                  onChange={handleChange}
                  className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {/* Optionally include fields for phone number or address */}
              <div>
                <label htmlFor="recipientPhone" className="block text-gray-700">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={formData.rnumber}
                  onChange={handleChange}
                  id="recipientPhone"
                  name="rnumber"
                  className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="recipientAddress"
                  className="block text-gray-700"
                >
                  Address:
                </label>
                <textarea
                  value={formData.raddr}
                  onChange={handleChange}
                  id="recipientAddress"
                  name="raddr"
                  rows="3"
                  className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="HosptialName" className="block text-gray-700">
                  Hosptial Name:
                </label>
                <input
                  onChange={handleChange}
                  value={formData.hospitalname}
                  type="text"
                  id="HosptialName"
                  name="hospitalname"
                  rows="3"
                  className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="HosptialAddress"
                  className="block text-gray-700"
                >
                  Hosptial Address:
                </label>
                <textarea
                  onChange={handleChange}
                  value={formData.hospitaladdr}
                  id="HosptialAddress"
                  name="hospitaladdr"
                  rows="3"
                  className="w-full rounded shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Adding recipient information is optional and will be used for
              potential communication regarding the donation.
            </p>
          </div>
        </div>
        <button
          // onSubmit={submitHandel}
          onClick={submitHandel}
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post Request
        </button>
      </div>
    </div>
  );
}

export default BloodRequestPage;
