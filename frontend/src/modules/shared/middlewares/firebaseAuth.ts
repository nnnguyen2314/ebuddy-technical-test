import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBn5YtupyTn9YWf75-kLFdBLd7wzw7G9kY',
    authDomain: 'ebuddy-dev-test.firebaseapp.com',
    projectId: 'ebuddy-dev-test',
    storageBucket: 'ebuddy-dev-test.appspot.com',
    messagingSenderId: '117377693412',
    appId: '1:117377693412:web:83a63a97462c4ebd099ef1',
    measurementId: 'G-E2X1236XNG'
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}
// Initialize Firebase auth
export const firebaseAuth = getAuth();