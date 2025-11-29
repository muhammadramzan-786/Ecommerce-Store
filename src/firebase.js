import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBOcVp6fRmlLsRH-YXgDwWjCMZHT6cZUWs",
  authDomain: "ecommerce-store-c033c.firebaseapp.com",
  projectId: "ecommerce-store-c033c",
  storageBucket: "ecommerce-store-c033c.firebasestorage.app",
  messagingSenderId: "624864592017",
  appId: "1:624864592017:web:bb077f616d8f1c2c14ff30",
  measurementId: "G-JCGT5BKDR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();
// Force popup every time
googleProvider.setCustomParameters({
  prompt: "select_account"
});