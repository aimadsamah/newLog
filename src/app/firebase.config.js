// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1wDSaMYdoSwuRJePNaD0ER-eUEL8Ctd4",
  authDomain: "authotp-b045b.firebaseapp.com",
  projectId: "authotp-b045b",
  storageBucket: "authotp-b045b.appspot.com",
  messagingSenderId: "468386461413",
  appId: "1:468386461413:web:cff4bc1409f99096fa860c",
  measurementId: "G-P9Y0FHF9PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);