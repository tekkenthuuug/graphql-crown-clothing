import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA6hDEx39INqBxbw2jlEFpu11gjdKVwFEU',
  authDomain: 'crown-db-14801.firebaseapp.com',
  databaseURL: 'https://crown-db-14801.firebaseio.com',
  projectId: 'crown-db-14801',
  storageBucket: 'crown-db-14801.appspot.com',
  messagingSenderId: '1054663133275',
  appId: '1:1054663133275:web:d84824f47716295938577e',
  measurementId: 'G-M35LY670Q8',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
