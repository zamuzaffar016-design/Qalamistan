// Firebase configuration

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";



const firebaseConfig = {

  apiKey: "AIzaSyCa1NUp-zaXsRePTRFIfnQWTiPOuhHqxVY",

  authDomain: "qalamistan-b6793.firebaseapp.com",

  projectId: "qalamistan-b6793",

  storageBucket: "qalamistan-b6793.firebasestorage.app",

  messagingSenderId: "405462403115",

  appId: "1:405462403115:web:5d2f817e2952be1d1e026e",

  measurementId: "G-K2K8G904R9"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);



// Firestore Database

export const db = getFirestore(app);



// Authentication

export const auth = getAuth(app);