import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCXgT4u0o758lMqK7ZljKZv6_dgqUHbIbE",
    authDomain: "discord-send.firebaseapp.com",
    projectId: "discord-send",
    storageBucket: "discord-send.appspot.com",
    messagingSenderId: "363911715320",
    appId: "1:363911715320:web:6ae5dd6ed1735e9b92de0d",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const storage = firebase.storage();
