import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Your_Firebase_key",
  authDomain: "yourAuthDomain",
  projectId: "YourProjectId",
  storageBucket: "iosh-bdd73.firebasestorage.app",
  messagingSenderId: "your_sender_id",
  appId: "1:Your_apl_id",
  measurementId: "your_measurementId"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
