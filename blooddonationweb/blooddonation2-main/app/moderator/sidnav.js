import React from "react";
import Link from "next/link";

export default function SidNav() {
  return (
    <div>
      <div className="w-64 bg-gray-100 p-4">
        <h1 className="text-xl font-bold mb-4">Moderator</h1>
        <ul className="space-y-2">
          <li className="hover:bg-gray-200 p-2 rounded-md">
            <Link href="/moderator/profile" className="text-gray-600">
              Profile
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-md">
            <Link href="/moderator/request" className="text-gray-600">
              Post Request
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-md">
            <Link href="/moderator/request-list" className="text-gray-600">
              All Requests
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-md">
            <Link href="/moderator/donor-list" className="text-gray-600">
              Donor List
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
