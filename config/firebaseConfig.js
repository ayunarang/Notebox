import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "notebox-4331f.firebaseapp.com",
  projectId: "notebox-4331f",
  storageBucket: "notebox-4331f.appspot.com",
  messagingSenderId: "643791293098",
  appId: "1:643791293098:web:fa64efb24b48e12c5fded3",
  measurementId: "G-C93D5VHL9M"
};

export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
