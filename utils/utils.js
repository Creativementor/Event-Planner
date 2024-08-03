import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
console.log("App =>", app);
