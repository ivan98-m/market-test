import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyAkhm9nBWmI4epTMDXRnTGRQ2MuROto_IU",
//     authDomain: "novoos-market-d9508.firebaseapp.com",
//     projectId: "novoos-market-d9508",
//     storageBucket: "novoos-market-d9508.appspot.com",
//     messagingSenderId: "829206079397",
//     appId: "1:829206079397:web:f450068fad2a4bd135aa4c"
// };

const FIREBASE = process.env.REACT_APP_FIREBASE
const firebaseConfig = {
    apiKey:  process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId:  process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId:  process.env.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//db
export const db =  getFirestore(app);

