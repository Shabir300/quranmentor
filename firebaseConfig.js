// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALS2HZ7_rN4aPxxwAAI_qcI9DGWlB_XnI",
  authDomain: "quran-mentor-36a5d.firebaseapp.com",
  databaseURL: "https://quran-mentor-36a5d-default-rtdb.firebaseio.com",
  projectId: "quran-mentor-36a5d",
  storageBucket: "quran-mentor-36a5d.appspot.com",
  messagingSenderId: "393971943258",
  appId: "1:393971943258:web:668ba57fe53d568d961563",
  measurementId: "G-WCF1EDE11X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);