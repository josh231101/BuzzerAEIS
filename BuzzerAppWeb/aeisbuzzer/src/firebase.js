import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAChcsaxJINMBiurrLF9tYDyoN80oL8tmM",
    authDomain: "buzzer-d9d75.firebaseapp.com",
    databaseURL: "https://buzzer-d9d75.firebaseio.com",
    projectId: "buzzer-d9d75",
    storageBucket: "buzzer-d9d75.appspot.com",
    messagingSenderId: "468918211977",
    appId: "1:468918211977:web:1ca38307d9ccd85869fd58",
    measurementId: "G-6K4KWK0DCM"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};