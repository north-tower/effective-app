// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw-f1qIf4zJA93NF0M9S7SbMODPMte5hk",
  authDomain: "curly-couscous-3ebee.firebaseapp.com",
  projectId: "curly-couscous-3ebee",
  storageBucket: "curly-couscous-3ebee.appspot.com",
  messagingSenderId: "807691893449",
  appId: "1:807691893449:web:c0c830e5ad7d7dc44eab18"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)