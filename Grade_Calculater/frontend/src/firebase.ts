import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe9Idb_PbdjA3nTxdp2RfnB1NfTujs0dc",
  authDomain: "iosh-bdd73.firebaseapp.com",
  projectId: "iosh-bdd73",
  storageBucket: "iosh-bdd73.firebasestorage.app",
  messagingSenderId: "443391054371",
  appId: "1:443391054371:web:cddb0eeb87625625099796",
  measurementId: "G-RPCN3ZTF8T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
