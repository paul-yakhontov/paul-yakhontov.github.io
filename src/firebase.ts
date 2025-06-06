// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL!,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
};

export const firebaseInstanse = initializeApp(firebaseConfig);