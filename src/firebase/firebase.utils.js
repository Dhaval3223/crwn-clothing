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

export const addCollectonAndDocuments = async (collectionKey, objecctsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objecctsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj)
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


