import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCabOYuQdAF-tSlyB5XqnRnzYguV6CkBbI",
    authDomain: "parabolic-wall-281501.firebaseapp.com",
    databaseURL: "https://parabolic-wall-281501.firebaseio.com",
    projectId: "parabolic-wall-281501",
    storageBucket: "parabolic-wall-281501.appspot.com",
    messagingSenderId: "883593136913",
    appId: "1:883593136913:web:d4508f59da5615569a5ab0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };