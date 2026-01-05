// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpcmOEvpRwHxR-JbN2Hd-OK_ecdSUS0rU",
  authDomain: "community-food-sharing-48a67.firebaseapp.com",
  projectId: "community-food-sharing-48a67",
  storageBucket: "community-food-sharing-48a67.firebasestorage.app",
  messagingSenderId: "420742478373",
  appId: "1:420742478373:web:597568dc8b13ec61ed1dcc",
  measurementId: "G-HZXB4XGNW6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAnalytics(app);

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);




