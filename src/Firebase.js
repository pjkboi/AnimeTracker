import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var config = {
    apiKey: "AIzaSyDSrgPupcKnymjFTReyb9RVbz-gGHogXaI",
    authDomain: "anime-tracker-13e72.firebaseapp.com",
    databaseURL: "https://anime-tracker-13e72.firebaseio.com",
    projectId: "anime-tracker-13e72",
    storageBucket: "anime-tracker-13e72.appspot.com",
    messagingSenderId: "161479969000",
    appId: "1:161479969000:web:7e1153f78c46415263e15d",
    measurementId: "G-LL0D8P9K6H"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;
