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

export const createUserProfileDocuments = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef =firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if(!snapshot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      userRef.set({
        displayName,
        email, 
        createdAt,
        ...additionalData
      })
    }catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


