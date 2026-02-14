import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9Tcye4_2vcGAvYPCbLRWV8BgesPp_x60",
    authDomain: "aangan-cafe-reviews.firebaseapp.com",
    projectId: "aangan-cafe-reviews",
    storageBucket: "aangan-cafe-reviews.firebasestorage.app",
    messagingSenderId: "758894135182",
    appId: "1:758894135182:web:58e384be6e07ef7a3646df",
    measurementId: "G-T6MLLL2NNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
