// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection } from '@firebase/firestore';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { addUser, getUserByUID } from './Database';
import GetCurrentLocation from './Utils/GetCurrentPosition';
import { User } from './Model/User';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESAUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      sessionStorage.setItem('uid', result.user.uid);
      getUserByUID(result.user.uid).then((userById) => {
        if (userById === null || userById === {})
          addUser(result.user, sessionStorage.getItem('token'));
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const db = getFirestore(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const fetchToken = () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_KEY_PAIR,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        sessionStorage.setItem('token', currentToken);
        console.log('session token ' + sessionStorage.getItem('token'));
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const usersRef = collection(db, 'users');
export const eventRef = collection(db, 'events');
