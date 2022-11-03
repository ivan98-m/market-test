import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAkhm9nBWmI4epTMDXRnTGRQ2MuROto_IU",
    authDomain: "novoos-market-d9508.firebaseapp.com",
    projectId: "novoos-market-d9508",
    storageBucket: "novoos-market-d9508.appspot.com",
    messagingSenderId: "829206079397",
    appId: "1:829206079397:web:f450068fad2a4bd135aa4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//db
export const db =  getFirestore(app);

