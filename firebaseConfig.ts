// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDpIYBqwdIpFK-_kYDcWly_NbvQ72KECmY",
    authDomain: "hexa-9ba3e.firebaseapp.com",
    projectId: "hexa-9ba3e",
    storageBucket: "hexa-9ba3e.firebasestorage.app",
    messagingSenderId: "897602102964",
    appId: "1:897602102964:web:134fe580dfdf1c3871d9e1",
    measurementId: "G-NLSEHZ98PP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
