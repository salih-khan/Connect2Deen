import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMKFydx1P36nT2bk41PORZDdg8VupxLVk",
  authDomain: "bayaan-project.firebaseapp.com",
  projectId: "bayaan-project",
  storageBucket: "bayaan-project.appspot.com",
  messagingSenderId: "46801905441",
  appId: "1:46801905441:web:49ec1d6e832cd4fbc4c060",
  measurementId: "G-47YWE1BD3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const storage = getStorage(app);

const db = getFirestore()
if (app) {
    console.log('Firebase is connected.');
  } else {
    console.error('Firebase connection failed.');
  }
export {
  db,
  app,
  auth,
  storage
}