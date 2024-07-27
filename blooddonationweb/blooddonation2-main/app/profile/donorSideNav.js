import Link from "next/link";

import React from "react";
import '../styles/navbar.css';

export default function DonorSideNav() {
  return (
    <div>
      <div className="w-64 bg-gray-100 p-4 sideNav">
        <h1 className="text-xl font-bold mb-4">Board</h1>
        <ul className="space-y-2">
          <li className="hover:bg-gray-200 p-2 rounded-md">
            <Link href="/profile">
              <p className="text-gray-600">Profile</p>
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-md">
            <Link href="/profile/requests">
              <p className="text-gray-600">Donation Request</p>
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-md">
            <Link href="/profile/stats">
              <p className="text-gray-600">Donation Stats</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
