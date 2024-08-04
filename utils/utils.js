import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_aBLh6Era7JFOndvvxSlZedyTepv1O-c",
    authDomain: "event-planner-22d6b.firebaseapp.com",
    projectId: "event-planner-22d6b",
    storageBucket: "event-planner-22d6b.appspot.com",
    messagingSenderId: "29956254587",
    appId: "1:29956254587:web:dc344651ec47298a112bde",
    measurementId: "G-ZHWMS681JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log("App =>", app);

const auth = getAuth(app);
// console.log("Auth =>", auth);

const db = getFirestore(app);
// console.log("Database =>", db);


const storage = getStorage(app);
// console.log("Storage =>", storage);

export {
    auth,
    db,
    storage,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    createUserWithEmailAndPassword,
    ref,
    uploadBytes,
    signOut,
    getDownloadURL,
    signInWithEmailAndPassword
}
