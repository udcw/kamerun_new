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
//   databaseURL: "https://kamerun-96927-default-rtdb.firebaseio.com",
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
   apiKey: "AIzaSyA4W2Pw9YI14XuFRtjiwZjO-8L8xFxJ6Og",
  authDomain: "kameroun-438de.firebaseapp.com",
  projectId: "kameroun-438de",
  storageBucket: "kameroun-438de.firebasestorage.app",
  messagingSenderId: "674467457235",
  appId: "1:674467457235:web:2ca5c815644a00b336cc26",
  measurementId: "G-9T8XZL6V23"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDEWav0oEUm7J7K2KZWPyMk8eeIUoIZMko",
//   authDomain: "frontend-dba9c.firebaseapp.com",
//   databaseURL: "https://frontend-dba9c-default-rtdb.firebaseio.com",
//   projectId: "frontend-dba9c",
//   storageBucket: "frontend-dba9c.appspot.com",
//   messagingSenderId: "770871910922",
//   appId: "1:770871910922:web:1186601c861a543df0b5f3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

