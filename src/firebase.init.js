// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5MyzqANIAGcE95h_TfezyMAv6-4m09wI",
    authDomain: "petmart-fa687.firebaseapp.com",
    projectId: "petmart-fa687",
    storageBucket: "petmart-fa687.appspot.com",
    appId: "1:494408203115:web:bfa18b43a7bd9b20492a2e",
    messagingSenderId: "494408203115",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;