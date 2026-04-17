import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC70nx-wMwqKf-XqiB86yj7N4je385WqmA",
  authDomain: "advanced-react-ecommerce-78e9d.firebaseapp.com",
  projectId: "advanced-react-ecommerce-78e9d",
  storageBucket: "advanced-react-ecommerce-78e9d.firebasestorage.app",
  messagingSenderId: "740895981923",
  appId: "1:740895981923:web:650ad274400bcd20d99356",
  measurementId: "G-ZZC1W5DJ27",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
