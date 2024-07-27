"use client";
import React, { useState } from "react";
import app, { db } from "../../firebase";
import withAuthRender from "@/app/context/withAuth";
import { useRouter } from "next/navigation";
import { getDoc, updateDoc, doc, FieldValue } from "firebase/firestore";

const Questionnaire = () => {
  const router = useRouter();
  const [previouslyDonated, setPreviouslyDonated] = useState(false);
  const [healthy, sethealthy] = useState(false);
  const [Lastdonation, setLastdonation] = useState(false);
  const [Last7days, setLast7days] = useState(false);
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [medications, setMedications] = useState([]);
  const [surgeryHistory, setSurgeryHistory] = useState("");

  //eligibleCondition
  function isEligibleToDonate(formData) {
    const {
      previouslyDonated,
      healthy,
      Lastdonation,
      Last7days,
      medicalConditions,
    } = formData;

    if (!healthy) {
      console.log(healthy);
      return false;
    }

    if (Lastdonation) {
      return false;
    }

    if (Last7days) {
      return false;
    }
    // const ineligibleConditions = ["hiv", "hepatitis"];
    // const hasIneligibleCondition = medicalConditions.some((condition) =>
    //   ineligibleConditions.includes(condition)
    // );

    // if (hasIneligibleCondition) {
    //   return false; // Has an ineligible medical condition, not eligible.
    // }

    // if (previouslyDonated) {
    //   console.warn("Previously donated eligibility needs implementation.");
    // }

    return true;
  }

  //END

  //Update the Request doc
  const updateRequestDoc = async (requestId, donorId) => {
    const requestRef = doc(db, "requests-list", requestId);

    try {
      // Check if the donor-list field exists
      const requestDoc = await getDoc(requestRef);
      const existingDonorList = requestDoc.data().donorlist || [];
      existingDonorList.push(donorId);
      const currentUnit = parseInt(requestDoc.data().unite, 10) || 0;
      const updatedUnit = Math.max(0, currentUnit - 1).toString();

      await updateDoc(requestRef, {
        // donorlist: FieldValue.arrayUnion(...updatedDonorList),
        donorlist: existingDonorList,
        unite: updatedUnit,
      });

      console.log("Donor ID added to the list successfully and unit updated.");
    } catch (error) {
      console.log("Error adding donor ID:", error);
      alert("An error occurred while adding the donor ID. Please try again.");
    }
  };

  //User Data
  const updateDonorReqId = async () => {
    // requestId
    const reqIDlocal = localStorage.getItem("userSelectedRequest");
    const requestLocal = JSON.parse(reqIDlocal);
    const requestUid = requestLocal.requestId;
    //User
    const persistedUserData = localStorage.getItem("userData");
    const userDataLocal = JSON.parse(persistedUserData);

    // console.log("uid in updating reqid " + userDataLocal.donorId);
    try {
      const uid = userDataLocal.donorId;
      const donorRef = doc(db, "donors", uid);
      // console.log("uid in updating reqid " + uid);
      // console.log(donorRef);
      const donorDoc = await getDoc(donorRef);

      if (donorDoc.exists) {
        const donorData = donorDoc.data();
        // console.log(donorData);
        await updateDoc(donorRef, {
          reqId: requestUid,
        });
        //lastDonationDate: todaysDate,
        await updateDoc(donorRef, {
          lastDonationDate: getTodayDate(),
        });
        //Update requent with array and unit

        console.log("Donor reqId updated successfully!");
      } else {
        console.warn("Donor document not found in Firestore.");
      }
    } catch (error) {
      console.error("Error updating donor reqId:", error);
    }
    console.log("Updating ReqDoc");
    updateRequestDoc(requestUid, userDataLocal.donorId);
  };
  // Date update

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handlePreviouslyDonated = (event) => {
    setPreviouslyDonated(event.target.value === "Yes");
  };
  const handlehealthy = (event) => {
    sethealthy(event.target.value === "Yes");
  };
  const handleLastdonation = (event) => {
    setLastdonation(event.target.value === "Yes");
  };
  const handleLast7days = (event) => {
    setLast7days(event.target.value === "Yes");
  };

  const handleMedicalConditionChange = (event) => {
    const isChecked = event.target.checked;
    const condition = event.target.value;

    if (isChecked) {
      setMedicalConditions([...medicalConditions, condition]);
    } else {
      setMedicalConditions(medicalConditions.filter((c) => c !== condition));
    }
  };

  const handleMedicationChange = (event) => {
    const isChecked = event.target.checked;
    const medication = event.target.value;

    if (isChecked) {
      setMedications([...medications, medication]);
    } else {
      setMedications(medications.filter((m) => m !== medication));
    }
  };

  const handleSurgeryChange = (event) => {
    setSurgeryHistory(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (isEligibleToDonate(formData)) {
      console.log("Can donate");
    } else {
      alert("You are not eligible to");
    }
    // if (isEligibleToDonate(formData)) {
    //   console.log("Can donate");
    //   event.preventDefault();
    //   updateDonorReqId();
    //   alert("Request Accepted");
    //   router.push("stats");
    // } else {
    //   alert("Not Eligible ");
    //   console.log("Not Eligible ");
    //   router.push("/requests");
    // }

    event.preventDefault();
    updateDonorReqId();
    alert("Request Accepted");

    router.push("stats");
    //localStorage.removeItem("userData");
  };

  return (
    <div className="container m-auto bg-red-500 text-white p-4">
      <h1 className="text-center text-3xl">Blood Donation Questionnaire</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Previously Donated */}
        <label className="block">
          Have you donated previously?
          <br />
          <input
            type="radio"
            name="previouslyDonated"
            value="Yes"
            checked={previouslyDonated}
            onChange={handlePreviouslyDonated}
            className="mr-2"
          />
          Yes
          <input
            type="radio"
            name="previouslyDonated"
            value="No"
            checked={!previouslyDonated}
            onChange={handlePreviouslyDonated}
            className="ml-4 mr-2"
          />
          No
        </label>

        {/* HEALTHY*/}
        <label className="block">
          <br />
          Are you feeling well and in good health today?
          <br />
          <input
            type="radio"
            name="healthy"
            value="Yes"
            checked={healthy}
            onChange={handlehealthy}
            className="mr-2"
          />
          Yes
          <input
            type="radio"
            name="healthy"
            value="No"
            checked={!healthy}
            onChange={handlehealthy}
            className="ml-4 mr-2"
          />
          No
        </label>

        {/* Lastdonation*/}
        <label className="block">
          <br />
          Have you already given blood in the last 3 months?
          <br />
          <input
            type="radio"
            name="Lastdonation"
            value="Yes"
            checked={Lastdonation}
            onChange={handleLastdonation}
            className="mr-2"
          />
          Yes
          <input
            type="radio"
            name="Lastdonation"
            value="No"
            checked={!Lastdonation}
            onChange={handleLastdonation}
            className="ml-4 mr-2"
          />
          No
        </label>

        {/* Last7days*/}
        <label className="block">
          <br />
          In the last 7 days, have you seen a doctor, dentist or any other
          healthcare professional or are you waiting to see one (except for
          routine screening appointments)?
          <br />
          <input
            type="radio"
            name="Last7days"
            value="Yes"
            checked={Last7days}
            onChange={handleLast7days}
            className="mr-2"
          />
          Yes
          <input
            type="radio"
            name="Last7days"
            value="No"
            checked={!Last7days}
            onChange={handleLast7days}
            className="ml-4 mr-2"
          />
          No
        </label>

        <div className="mt-4">
          <h3>In the last six months have you had any of the following?</h3>
          <div className="flex flex-wrap -mx-2">
            <label className="w-full md:w-1/3 px-2">
              <input
                type="checkbox"
                value="Tattooing"
                onChange={handleMedicalConditionChange}
              />
              Tattooing
              <br />
              <input
                type="checkbox"
                value="refused"
                onChange={handleMedicalConditionChange}
              />
              Have you ever been refused as a blood donor, or told not to donate
              blood?
              <br />
              <input
                type="checkbox"
                value="hiv"
                onChange={handleMedicalConditionChange}
              />
              Have you ever been tested for HIV?
              <br />
              <input
                type="checkbox"
                value="hepatitis"
                onChange={handleMedicalConditionChange}
              />
              Have you ever been tested for Hepatitis?
              <br />
            </label>

            {/* Add similar labels for other medical conditions */}
          </div>
        </div>
        {/* Submit Button */}
        <button
          className="btn bg-white text-red-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded mt-4"
          type="submit"
          name="action"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default withAuthRender(Questionnaire);
