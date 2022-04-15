import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwLxMFwLUsh78q-a8tP4cdGzAvQYtMusM",
  authDomain: "react-journal-app-c496f.firebaseapp.com",
  projectId: "react-journal-app-c496f",
  storageBucket: "react-journal-app-c496f.appspot.com",
  messagingSenderId: "84863721266",
  appId: "1:84863721266:web:eaf2c1c6dc7838aaccc12b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase,
}