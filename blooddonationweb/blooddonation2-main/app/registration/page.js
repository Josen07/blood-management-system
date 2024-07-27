"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import app, { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
//import { useHistory } from 'react-router-dom';

const DonorRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    DOB: "",
    bloodGroup: "",
    lastDonationDate: "",
    addr1: "",
    secAddr: "",
    city: "",
    district: "",
    pincode: "",
    password: "",
    reqId: "",
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth(app);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation and submission

    try {
      // Registration logic
      const { email, password } = formData; // Extract email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      console.log("uid created is ", uid);

      // Send email verification (optional)
      await sendEmailVerification(userCredential.user);
      setIsEmailVerified(false); // Reset email verification state
      setError("A verification email has been sent to your address.");

      // Save donor data to Firestore after successful registration
      const donorRef = collection(db, "donors"); // Reference to donors collection
      alert(uid);

      //for set
      const donorSetRef = doc(db, "donors", uid);

      try {
        await setDoc(donorSetRef, formData);
        console.log("Registration successful!");
        alert("Registration Successful! Please verify your email.");
        router.push("/login");
      } catch (error) {
        console.error("Error adding donor data:", error);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message); // Set error message for display
    }
  };

  // Check email verification status on component mount (optional)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
      }
    });

    return unsubscribe;
  }, [auth]);

  return (
    <div class="container m-auto bg-red-500 text-white p-4">
      <h1 class="text-center text-3xl">Donor Registration</h1>
      <form class="mt-4">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="name" class="block">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="email" class="block">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>
        </div>
        {/* password */}
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="password" class="block">
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="password1" class="block">
              Password(re-type):
            </label>
            <input
              id="password1"
              type="password"
              name="password1"
              // value={formData.password}
              //onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="phone" class="block">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>

          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="DOB" class="block">
              Date of Birth
            </label>
            <input
              id="DOB"
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="bloodGroup" class="block">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            >
              <option value="" disabled>
                Select your blood group
              </option>
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

          <div class="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="lastDonationDate" class="block">
              Last Donation Date
            </label>
            <input
              id="lastDonationDate"
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleChange}
              required
              class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>

          <div class="w-full md:w-1/2 px-2 mb-4"></div>
        </div>
        {/* new  */}

        {/* Addit info of Donor */}
        <div class="container bg-red-500 text-white p-4">
          <h1 class="text-center text-3xl">Additional Information</h1>

          <label htmlFor="address" class="block">
            Address Line 1
          </label>
          <textarea
            id="address"
            type="text"
            rows="3"
            name="addr1"
            value={formData.addr1}
            onChange={handleChange}
            required
            class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
          />
          <label htmlFor="Secondary_address" class="block">
            SecondaryAddress
          </label>
          <textarea
            id="SecondaryAddress"
            type="text"
            name="secAddr"
            value={formData.secAddr}
            onChange={handleChange}
            required
            class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
          />

          <label htmlFor="city" class="block">
            City
          </label>
          <textarea
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
          />

          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="district" class="block">
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
              >
                <option value="" disabled>
                  Select your district
                </option>
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

            <div class="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="pincode" class="block">
                Pincode
              </label>
              <input
                id="pincode"
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                class="input-field col s6 w-full bg-red-100 text-red-800 border border-red-500 rounded p-2"
              />
            </div>

            <div class="w-full md:w-1/2 px-2 mb-4"></div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          class="btn bg-white text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded"
          // type="submit"
          name="action"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default DonorRegistration;
