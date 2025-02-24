import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBTY0FKs4vzp_mBVVGFhjA0ZbtMgGNLKjs",
    authDomain: "vuexpassword.firebaseapp.com",
    projectId: "vuexpassword",
    storageBucket: "vuexpassword.firebasestorage.app",
    messagingSenderId: "997765905547",
    appId: "1:997765905547:web:e7ccb528adebfc65dc288e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {db,auth}