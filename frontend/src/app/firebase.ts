

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // ✅ Import getAuth
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXTIFvmkHmf0ndMgY2i4SV-C8ylvFtpXQ",
  authDomain: "hiresense-6b0db.firebaseapp.com",
  projectId: "hiresense-6b0db",
  storageBucket: "hiresense-6b0db.firebasestorage.app",
  messagingSenderId: "780619496459",
  appId: "1:780619496459:web:c5d80cb7a20012690cdb0e",
  measurementId: "G-71G6FYELGF"
};
// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app); // ✅ Ensure auth is initialized properly
const storage = getStorage(app);
const firestore = getFirestore(app)

export { db, storage,firestore };
