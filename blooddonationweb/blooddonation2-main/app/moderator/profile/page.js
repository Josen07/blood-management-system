import Link from "next/link";
import React from "react";
import DonorRequestCard from "../../ui/donor-request-card";
import SidNav from "../sidnav";

export default function Profile() {
  const profileData = {
    name: "Christy C",
    email: "christy72@gmail.com",
    phone: "1234567890",
    DOB: "2003-11-01",
    bloodGroup: "A+",
    lastDonationDate: "2022-12-31",
    addr1: "Chegannur , Alppuzha",
    secAddr: "Kochi",
    city: "cityName",
    district: "alppuzha",
    pincode: "111111",
  };

  return (
    <div className="flex w-full h-screen">
      {/* This is the sidebar section */}
      <SidNav />
      {/* This is the main content section */}
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Request List</h2>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold">Moderator Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-bold">{profileData.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-bold">{profileData.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone:</p>
              <p className="font-bold">{profileData.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-600">Date of Birth:</p>
              <p className="font-bold">{profileData.DOB}</p>
            </div>
            <div>
              <p className="text-gray-600">Blood Group:</p>
              <p className="font-bold">{profileData.bloodGroup}</p>
            </div>
            <div>
              <p className="text-gray-600">Last Donation Date:</p>
              <p className="font-bold">{profileData.lastDonationDate}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">Address:</p>
              <p className="font-bold">
                {profileData.addr1}{" "}
                {profileData.secAddr && `, ${profileData.secAddr}`}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">City & District:</p>
              <p className="font-bold">
                {profileData.city}, {profileData.district}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">Pincode:</p>
              <p className="font-bold">
                {profileData.pincode || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Completed req */}
        {/* <div className="mt-4">
          <h3 className="font-bold mb-2">Completed Requests</h3>
          <a href="#" className="text-blue-500 hover"></a>
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold">John Doe</h4>
              <span className="text-sm text-gray-500">Yesterday</span>
            </div>
            <p className="text-gray-600">Donated [22/01/24] to this request.</p>
            <div className="flex justify-end mt-2">
              <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md">
                Verify!
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
