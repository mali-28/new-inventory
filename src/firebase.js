// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMYp9AMZOH-Gf2iMENW4XCFRb49RdcScc",
  authDomain: "inventory-management-47056.firebaseapp.com",
  projectId: "inventory-management-47056",
  storageBucket: "inventory-management-47056.appspot.com",
  messagingSenderId: "841064545186",
  appId: "1:841064545186:web:e25f3ad1055c8ddb0d10fb",
  measurementId: "G-CZJTH4782M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);