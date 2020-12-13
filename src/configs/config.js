import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAiq9ediPjG99Hroeua8_uSfNruq8tHWNI",
    authDomain: "waldo-a53af.firebaseapp.com",
    projectId: "waldo-a53af",
    storageBucket: "waldo-a53af.appspot.com",
    messagingSenderId: "401698318052",
    appId: "1:401698318052:web:b355f311228fcd6e816ef1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };