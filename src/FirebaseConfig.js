// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAO4DFZb5CIgpHWQ1JHKbmTgZWwpk5dmc",
  authDomain: "chatting-app-3bfeb.firebaseapp.com",
  projectId: "chatting-app-3bfeb",
  storageBucket: "chatting-app-3bfeb.appspot.com",
  messagingSenderId: "371846717272",
  appId: "1:371846717272:web:951384a40834b3ed148f2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;