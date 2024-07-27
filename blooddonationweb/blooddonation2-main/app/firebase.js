// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkv1ul4jqTLmeN_tkGaDkAd4oTQL_DQOo",
  authDomain: "slingshot-dc5b6.firebaseapp.com",
  projectId: "slingshot-dc5b6",
  storageBucket: "slingshot-dc5b6.appspot.com",
  messagingSenderId: "369134386994",
  appId: "1:369134386994:web:242bc35a2e84a93bae212b",
  measurementId: "G-VDR04RL3X2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;
export const db = getFirestore(app);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);
