import React from "react";

export default function DonorCard({ donor }) {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">{donor.name}</h3>
      <p className="text-gray-600">
        <span className="font-bold">Blood Group:</span> {donor.bloodGroup}
      </p>
      <p className="text-gray-600">
        <span className="font-bold">District:</span> {donor.district}
      </p>
      <p className="text-gray-600">
        <span className="font-bold">Phone:</span> {donor.phone || "Not provided"}
      </p>
      {/* Add more fields as needed based on your donor data structure */}
    </div>
  );
}
