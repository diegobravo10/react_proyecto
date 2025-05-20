// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlgDd7n-GAgc-4qSnmyKWHeWN3XgMP1X0",
  authDomain: "reactdb-a3cbc.firebaseapp.com",
  projectId: "reactdb-a3cbc",
  storageBucket: "reactdb-a3cbc.firebasestorage.app",
  messagingSenderId: "768450756911",
  appId: "1:768450756911:web:70e65012a1705a64a121da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Exporta Firestore
const db = getFirestore(app);
export { db };
