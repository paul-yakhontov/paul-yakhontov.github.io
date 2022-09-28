// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDEn4lp4MwtKqEULXobozjhWF_xpQ-FlMo",
    authDomain: "paul-yakhontov.firebaseapp.com",
    databaseURL: "https://paul-yakhontov-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "paul-yakhontov",
    storageBucket: "paul-yakhontov.appspot.com",
    messagingSenderId: "834941096578",
};

export const firebaseInstanse = initializeApp(firebaseConfig);