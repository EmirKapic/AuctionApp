import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "auctionapp-6f67d.firebaseapp.com",
  projectId: "auctionapp-6f67d",
  storageBucket: "auctionapp-6f67d.appspot.com",
  messagingSenderId: "496178631230",
  appId: "1:496178631230:web:8927cec2140da2da32b76f",
  measurementId: "G-99444BBS34",
};
const app = initializeApp(firebaseConfig);

export default app;
