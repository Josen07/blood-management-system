"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import DonorRequestCard from "./donor-request-card";
import app, { db } from "../../firebase";
import DonorSideNav from "../donorSideNav";
import withAuthRender from "@/app/context/withAuth";

const RequestLists = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    //const db = getFirestore(app); // Get Firestore instance
    const requestsCollection = collection(db, "requests-list");

    const fetchData = async () => {
      try {
        const q = query(requestsCollection); // Create an unfiltered query
        const querySnapshot = await getDocs(q);
        console.log("try block");
        const requestData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread document data
        }));
        setRequests(requestData);
        console.log(requestData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  return (
    <div className="flex w-full h-screen">
      <DonorSideNav />
      <div className="flex-1 p-4">
        <RequestListsU />
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Request List</h2>
        </div>
        {requests.length > 0 ? (
          requests.map(
            (request) => (
              console.log(requests.length),
              (
                <div key={request.id} className="mb-4">
                  <DonorRequestCard request={request} />
                </div>
              )
            )
          )
        ) : (
          <p className="text-gray-600">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default withAuthRender(RequestLists);

export function RequestListsU() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const requestsCollection = collection(db, "requests-list");

    const fetchData = async () => {
      try {
        const q = query(requestsCollection, where("urgency", "==", "urgent")); // Filter by urgency
        const querySnapshot = await getDocs(q);
        const requestData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread document data
        }));
        setRequests(requestData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Urgent Requests</h2>
      </div>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request.id} className="mb-4">
            <DonorRequestCard request={request} />
          </div>
        ))
      ) : (
        <p className="text-gray-600">No urgent requests found.</p>
      )}
    </>
  );
}
