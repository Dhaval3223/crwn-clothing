import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAJXAHrdQ6FFaNPLgFi3QO6RrtDthhLRAE",
    authDomain: "crwn-db-585e7.firebaseapp.com",
    projectId: "crwn-db-585e7",
    storageBucket: "crwn-db-585e7.appspot.com",
    messagingSenderId: "714210021064",
    appId: "1:714210021064:web:42c3d2a98a42b4697d5ffd",
    measurementId: "G-DGTSSSQEGR"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


