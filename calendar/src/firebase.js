import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2VOHJ6JTtuwDD1UYVELb7N6ack5d8i8Y",
  authDomain: "react-b11e9.firebaseapp.com",
  projectId: "react-b11e9",
  storageBucket: "react-b11e9.appspot.com",
  messagingSenderId: "117150766121",
  appId: "1:117150766121:web:05e4a60198e82cc5fa7838",
  measurementId: "G-3NX0ETLXQP"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const analytics = getAnalytics(app);

export { db };
