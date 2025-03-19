

// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import
import { getStorage } from "firebase/storage"; // If using storage

const firebaseConfig = {
  apiKey: "AIzaSyCGbQdid8-EQ1iUn_VL7ONUYsBBBM_YZms",
  authDomain: "hiresense-8b696.firebaseapp.com",
  projectId: "hiresense-8b696",
  storageBucket: "hiresense-8b696.firebasestorage.app",
  messagingSenderId: "531682623738",
  appId: "1:531682623738:web:dd438c5764e9bc41f98943",
  measurementId: "G-9R4HQE0DEW"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };

