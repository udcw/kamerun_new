// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration


// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyARtj_ot56RIrGgawAdQhTjWgE_7yskABM",
//   authDomain: "kamerun-96927.firebaseapp.com",
//   projectId: "kamerun-96927",
//   storageBucket: "kamerun-96927.firebasestorage.app",
//   messagingSenderId: "20668770627",
//   appId: "1:20668770627:web:3ad430ec3334ebe0a927f6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { initializeApp } from 'firebase/app';
// import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyARtj_ot56RIrGgawAdQhTjWgE_7yskABM",
//   authDomain: "kamerun-96927.firebaseapp.com",
//   projectId: "kamerun-96927",
//   storageBucket: "kamerun-96927.firebasestorage.app",
//   messagingSenderId: "20668770627",
//   appId: "1:20668770627:web:3ad430ec3334ebe0a927f6"
// };

// const app = initializeApp(firebaseConfig);

// // ✅ Auth avec persistance sur AsyncStorage
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
   apiKey: "AIzaSyARtj_ot56RIrGgawAdQhTjWgE_7yskABM",
   authDomain: "kamerun-96927.firebaseapp.com",
   projectId: "kamerun-96927",
   storageBucket: "kamerun-96927.firebasestorage.app",
   messagingSenderId: "20668770627",
   appId: "1:20668770627:web:3ad430ec3334ebe0a927f6"
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

