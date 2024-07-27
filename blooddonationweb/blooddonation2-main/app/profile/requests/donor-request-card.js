import Link from "next/link";
import { useRouter } from "next/navigation";
import { RequestIdContext } from "../../context/RequestContext";
import React, { useContext, useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

///profile/questionare
export default function DonorRequestCard({ request }) {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const { 
    rname,
    bloodgroup,
    unite,
    urgency,
    date,
    time,
    hospitalname,
    district,
  } = request;

  // const updateDonorReqId = async () => {
  //   const persistedUserData = localStorage.getItem("userData");
  //   const userDataLocal = JSON.parse(persistedUserData);
  //   // setUserData(userData);
  //   console.log("uid in updating reqid " + userDataLocal.donorId);
  //   try {
  //     const uid = userDataLocal.donorId;
  //     const donorRef = doc(db, "donors", uid);
  //     console.log("uid in updating reqid " + uid);
  //     console.log(donorRef);
  //     const donorDoc = await getDoc(donorRef);

  //     if (donorDoc.exists) {
  //       const donorData = donorDoc.data();
  //       console.log(donorData);
  //       await updateDoc(donorRef, { reqId: request.id });
  //       console.log("Donor reqId updated successfully!");
  //     } else {
  //       console.warn("Donor document not found in Firestore.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating donor reqId:", error);
  //   }
  // };

  const handleSub = async () => {
    // router.push("/profile/questionare");
    console.log("Data r.id" + request.id);
    localStorage.removeItem("userSelectedRequest");
    localStorage.setItem(
      "userSelectedRequest",
      JSON.stringify({
        requestId: request.id,
      })
    );
    // Firebase req update
    // updateDonorReqId();

    //end
    router.push("/profile/questionare");
  };
  return (
    <>
      <div className="bg-gray-100 p-4 m-2 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold">{rname}</h4>
          <span className="text-sm text-gray-500">
            {`${urgency}   [${bloodgroup}]`}
          </span>
        </div>
        <p className="text-gray-600">
          {unite} units of blood needed at {hospitalname} ({district})
        </p>
        {/* Optionally display date and time if needed */}
        <p className="text-gray-600">
          Date: {date}, Time: {time}
        </p>
        <div className="flex justify-end">
          <button onClick={handleSub}>
            <div className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
              Accept
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
