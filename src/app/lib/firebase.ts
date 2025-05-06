/* eslint-disable @typescript-eslint/no-unused-vars */
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyAGwWegNev51usJ8ollM1ZZP4mh6uKLKx0",
//     authDomain: "dtpvedioapp.firebaseapp.com",
//     projectId: "dtpvedioapp",
//     storageBucket: "dtpvedioapp.appspot.com",
//     messagingSenderId: "252841374943",
//     appId: "1:252841374943:web:6942dc0713a8dc65d1656a"
//   };
  
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-_ZIDQe8m0mVg_FbVSx6nph5wpZU7vNI",
  authDomain: "frontdesk-3bddb.firebaseapp.com",
  projectId: "frontdesk-3bddb",
  storageBucket: "frontdesk-3bddb.firebasestorage.app",
  messagingSenderId: "784858339570",
  appId: "1:784858339570:web:aaf07671b650d2f699186b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);