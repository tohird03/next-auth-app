import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_BASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_BASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_BASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_BASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_BASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_BASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
