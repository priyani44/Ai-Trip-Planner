// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWY7v5f51hQhir-qP-dK4IXfQsE72VzUg",
  authDomain: "ai-trip-planner-ccb87.firebaseapp.com",
  projectId: "ai-trip-planner-ccb87",
  storageBucket: "ai-trip-planner-ccb87.firebasestorage.app",
  messagingSenderId: "820721588033",
  appId: "1:820721588033:web:2cdb7a025209617345b3c0",
  measurementId: "G-GQ0PTC0DL5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);