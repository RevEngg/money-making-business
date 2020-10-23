import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBNzmtvm9fDhgYxAMnp6y73DBTivM07wYI",
    authDomain: "e-learning-jain.firebaseapp.com",
    databaseURL: "https://e-learning-jain.firebaseio.com",
    projectId: "e-learning-jain",
    storageBucket: "e-learning-jain.appspot.com",
    messagingSenderId: "262880979132",
    appId: "1:262880979132:web:4e6b98a19d5ed2001008b9",
    measurementId: "G-K2SSR0TK2P",
  };

const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;

