import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const BASE_URL = import.meta.env;



const firebaseConfig = {
  apiKey: BASE_URL.VITE_FIREBASE_API_KEY,
  authDomain: BASE_URL.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: BASE_URL.VITE_FIREBASE_PROJECT_ID,
  storageBucket: BASE_URL.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: BASE_URL.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: BASE_URL.VITE_FIREBASE_APP_ID,
  measurementId: BASE_URL.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
