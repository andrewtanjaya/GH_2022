// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD84Kxx4bzBBr8sVCgCRhd7dhq8ap_9Pkw',
	authDomain: 'gh-2022.firebaseapp.com',
	projectId: 'gh-2022',
	storageBucket: 'gh-2022.appspot.com',
	messagingSenderId: '341830089527',
	appId: '1:341830089527:web:2664d4aadcbf2fe86178b2',
	measurementId: 'G-SX8CV9GVGE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
