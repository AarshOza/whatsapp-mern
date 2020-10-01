import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2Y18J_0FacEiLzQaFmtAqvPaaCXkGDyQ",
  authDomain: "whatsapp-mern-clone-e61b4.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-clone-e61b4.firebaseio.com",
  projectId: "whatsapp-mern-clone-e61b4",
  storageBucket: "whatsapp-mern-clone-e61b4.appspot.com",
  messagingSenderId: "208397649335",
  appId: "1:208397649335:web:1c386794d50c4938039432",
  measurementId: "G-KWKETDPKH9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};