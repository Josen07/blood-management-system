import React, { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase"; // Assuming your Firebase config is in this file
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";

function DonorUpload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  //Data map doc:
  async function storeCompletedRequest(fileId) {
    //ReqID
    const reqIDlocal = localStorage.getItem("userSelectedRequest");
    const requestLocal = JSON.parse(reqIDlocal);
    const requestId = requestLocal.requestId;
    //DonorID
    const persistedUserData = localStorage.getItem("userData");
    const userDataLocal = JSON.parse(persistedUserData);
    const donorId = userDataLocal.donorId;
    try {
      const docRef = collection(db, "completedRequest");
      await addDoc(docRef, {
        donorId,
        fileId,
        requestId,
      });

      console.log(
        "Document created successfully in completedRequest collection!"
      );
    } catch (error) {
      console.error("Error creating document:", error);
      console.log(error);
      alert("An error occurred while creating the document. Please try again.");
    }
  }

  //File upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // Get a reference to the storage bucket
      const storageRef = getStorage(app);
      const imagesRef = ref(storageRef, "images");

      // Generate a unique file name with timestamp
      const fileName = `${Date.now()}-${file.name}`;
      const fileRef = ref(imagesRef, fileName);

      // Upload the file to Firebase Storage
      await uploadBytes(fileRef, file);
      storeCompletedRequest(fileName);

      console.log("File uploaded successfully!");
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file. Please try again.");
    } finally {
      setIsUploading(false);
    }
    localStorage.removeItem("userSelectedRequest");
    router.push("requests");
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isUploading} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}

export default DonorUpload;
