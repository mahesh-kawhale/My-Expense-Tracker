// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBppvjmz_bMB2hl8ey7HeO27YIzi9T3SSM",
  authDomain: "expense-tracker-dcea1.firebaseapp.com",
  projectId: "expense-tracker-dcea1",
  storageBucket: "expense-tracker-dcea1.appspot.com",
  messagingSenderId: "88582831847",
  appId: "1:88582831847:web:e6d05e4a5d9a1f434a2c42",
  measurementId: "G-9MSRMJ9NY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
