// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "expense-7bf6b.firebaseapp.com",
  databaseURL: "https://expense-7bf6b-default-rtdb.firebaseio.com",
  projectId: "expense-7bf6b",
  storageBucket: "expense-7bf6b.appspot.com",
  messagingSenderId: "1090810973003",
  appId: "1:1090810973003:web:42b38ce358e6e7ba45f6ce",
  measurementId: "G-7XHYYWXF74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
