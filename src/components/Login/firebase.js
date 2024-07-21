// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAEj5C6dDReXOg5MSkGXsNyQ2xMvBVAg4",
    authDomain: "peoplemuseum-1.firebaseapp.com",
    projectId: "peoplemuseum-1",
    storageBucket: "peoplemuseum-1.appspot.com",
    messagingSenderId: "1060551584061",
    appId: "1:1060551584061:web:a76dda9ab066b5d4d2bd54",
    measurementId: "G-CPQXW2LWY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
