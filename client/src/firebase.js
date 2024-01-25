// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "master---blog.firebaseapp.com",
  projectId: "master---blog",
  storageBucket: "master---blog.appspot.com",
  messagingSenderId: "811028573487",
  appId: "1:811028573487:web:fe1f3dfc0f211e142505da"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);