// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWkpE_a23uIgAxOlUyYMCtUQC8EmaU_k4",
  authDomain: "pfd-database-3aaae.firebaseapp.com",
  projectId: "pfd-database-3aaae",
  storageBucket: "pfd-database-3aaae.appspot.com",
  messagingSenderId: "42464685259",
  appId: "1:42464685259:web:c8a1d9c599cd18d1ceff4e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);