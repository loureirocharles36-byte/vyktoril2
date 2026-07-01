import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCjNcL1zhctZBGGVcUnG4Bsy2fC9n-aVnM",
  authDomain: "vyktoril.firebaseapp.com",
  projectId: "vyktoril",
  storageBucket: "vyktoril.firebasestorage.app",
  messagingSenderId: "776845685626",
  appId: "1:776845685626:web:2bcb7e8f99290e08d01cc3",
  measurementId: "G-HC8MY0C2VH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

