import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAP97BvgXBtb3JdaBf6Q-s2txcHiKM6Za0",
    authDomain: "uploadingfile-636e8.firebaseapp.com",
    projectId: "uploadingfile-636e8",
    storageBucket: "uploadingfile-636e8.appspot.com",
    messagingSenderId: "295332332024",
    appId: "1:295332332024:web:e7c3344da02b9cfc1f960d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);