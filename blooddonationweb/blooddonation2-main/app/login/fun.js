"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import DonorRequestCard from "../ui/donor-request-card";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

async function fetchDonorName(userId) {
  try {
    const donorRef = doc(db, "donors", userId);
    console.log(donorRef);
    const donorSnap = await getDoc(donorRef);
    console.log(donorSnap);

    if (donorSnap.exists()) {
      const donorData = donorSnap.data();
      const name = donorData.name;
      return name;
    } else {
      console.warn("No donor document found for user:", userId);
      return "";
    }
  } catch (err) {
    console.error("Error fetching donor name:", err);
    return "";
  }
}
