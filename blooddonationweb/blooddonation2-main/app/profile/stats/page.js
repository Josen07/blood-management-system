"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import DonorUpload from "./fileUpload";
// import { RequestIdContext } from "../../context/RequestContext";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import DonorRequestCard from "../requests/donor-request-card";
import app, { db } from "../../firebase";
import DonorSideNav from "../donorSideNav";
import withAuthRender from "@/app/context/withAuth";

const RequestLists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const parsedData = localStorage.getItem("userSelectedRequest");
  const data = JSON.parse(parsedData);

  // Extract the requestId
  const requestId = data?.requestId;

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    console.log("req Data from ID " + requestId);

    const fetchData = async () => {
      if (requestId) {
        try {
          const requestRef = doc(db, "requests-list", requestId);
          const requestSnap = await getDoc(requestRef);

          if (requestSnap.empty) {
            console.warn("No donor document found for user:", requestId);
          } else {
            const requestData2 = requestSnap.data();
            console.log("req Data" + requestData2);
            console.log("req Data .name" + requestData2.bloodgroup);
            console.log("req Data .name" + requestData2.date);
            setRequestData(requestData2);
          }
        } catch (err) {
          setError(err.message || "An error occurred while fetching data.");
        } finally {
          setIsLoading(false);
        }
      } else {
        // Handle the case where there's no requestId
        return <div>No Request selected.</div>;
      }
    };

    fetchData();
  }, [requestId]);

  if (isLoading) {
    return <div>No Request selected Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!requestData) {
    return <div>No donor data found for this user.</div>;
  }

  if (!requestId) {
    return <div>No Request selected.</div>;
  }

  return (
    <div className="flex w-full h-screen statbox">
      <div className="grid sm:grid-cols-2 bg-red-50 gap-4  ">
        <DonorSideNav />
        {/* <h1>{requestData.bloodgroup}</h1> */}
       <div className="main-stat">
       <div className="bg-white shadow overflow-hidden rounded-lg  mb-4 p-4  donate-details__box">
          <div className="px-4 py-5 sm:p-6 ">
            <h5 className="text-xl font-bold leading-tight text-gray-900">
            {/* flex-1 rounded-lg p-4 mt-16 */}
              Blood Donation Request Details
            </h5>
            <ul className="mt-6 list-disc list-inside space-y-2">
              <li className="text-gray-700">
                <b>Blood Group:</b> {requestData.bloodgroup}
              </li>
              <li className="text-gray-700">
                <b>Units Needed:</b> {requestData.unite}
              </li>
              <li className="text-gray-700">
                <b>Date:</b> {requestData.date}
              </li>
              <li className="text-gray-700">
                <b>Time:</b> {requestData.time}
              </li>
              <li className="text-gray-700">
                <b>District:</b> {requestData.district}
              </li>
              <li className="text-gray-700">
                <b>Hospital Address:</b> {requestData.hospitaladdr}
              </li>
              <li className="text-gray-700">
                <b>Hospital Name:</b> {requestData.hospitalname}
              </li>
              <li className="text-gray-700">
                <b>Recipient Address:</b> {requestData.raddr}
              </li>
              <li className="text-gray-700">
                <b>Recipient Name:</b> {requestData.rname}
              </li>
              <li className="text-gray-700">
                <b>Recipient Contact Number:</b> {requestData.rnumber}
              </li>

              <li className="text-gray-700">
                <b>Urgency:</b> {requestData.urgency}
              </li>
              <button>
                <div className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
                  Done
                </div>
              </button>
              <div>
                <DonorUpload />
              </div>
            </ul>
          </div>
        </div>
       </div>
       
      </div>
      <div className="calender-box bg-red-50"></div>
    </div>
  );
};

export default withAuthRender(RequestLists);
