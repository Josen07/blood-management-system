"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import DonorCard from "../../ui/donor-card"; // Assuming DonorCard component for displaying donor information
import SidNav from "../sidnav";
import app, { db } from "../../firebase";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [filterDistrict, setFilterDistrict] = useState(""); // State for district filter
  const [filterBloodGroup, setFilterBloodGroup] = useState(""); // State for blood group filter

  useEffect(() => {
    const donorsCollection = collection(db, "donors");

    const fetchData = async () => {
      try {
        // Build query based on filter selections
        let q = query(donorsCollection);
        if (filterDistrict) {
          q = query(q, where("district", "==", filterDistrict));
        }
        if (filterBloodGroup) {
          q = query(q, where("bloodGroup", "==", filterBloodGroup));
        }

        const querySnapshot = await getDocs(q);
        const donorData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread donor data
        }));
        setDonors(donorData);
        console.log(donorData);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, [filterDistrict, filterBloodGroup]); // Re-fetch data on filter changes

  const handleDistrictFilterChange = (event) => {
    setFilterDistrict(event.target.value);
  };

  const handleBloodGroupFilterChange = (event) => {
    setFilterBloodGroup(event.target.value);
  };

  return (
    <div className="flex w-full h-screen">
      <SidNav />
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Donor List</h2>
          <div className="flex items-center">
            <select
              className="border px-2 py-1 mr-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              value={filterDistrict}
              onChange={handleDistrictFilterChange}
            >
              <option value="">All Districts</option>
              {/* Add options dynamically based on available districts (replace with your logic) */}
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
              {/* ... */}
            </select>
            <select
              className="border px-2 py-1 mr-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              value={filterBloodGroup}
              onChange={handleBloodGroupFilterChange}
            >
              <option value="">All Blood Groups</option>
              {/* Add options for all blood groups */}
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              {/* ... */}
            </select>
          </div>
        </div>
        {donors.length > 0 ? (
          donors.map((donor) => (
            <div key={donor.id} className="mb-4">
              <DonorCard donor={donor} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No donors found.</p>
        )}
      </div>
    </div>
  );
}
