import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4cRrnvmXRW4O5HZbXchKeW0syZBK-pnY",
    authDomain: "frontdesk-hitl.firebaseapp.com",
    projectId: "frontdesk-hitl",
    storageBucket: "frontdesk-hitl.firebasestorage.app",
    messagingSenderId: "84917805918",
    appId: "1:84917805918:web:6f93412006923af81fa5cf",
    measurementId: "G-PMN4K7ZMR7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
