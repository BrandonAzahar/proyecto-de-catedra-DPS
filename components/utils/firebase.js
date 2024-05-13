// Import the functions you need from the SDKs you need
import  firebase  from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCUhFZxplJSXzmGQbtKE2QG3qeMB6Is5uA",
  authDomain: "asilo-de-ancianos-69a7e.firebaseapp.com",
  databaseURL: "https://asilo-de-ancianos-69a7e-default-rtdb.firebaseio.com",
  projectId: "asilo-de-ancianos-69a7e",
  storageBucket: "asilo-de-ancianos-69a7e.appspot.com",
  messagingSenderId: "927733871715",
  appId: "1:927733871715:web:e8a09fc08720e440d53456",
  measurementId: "G-WGPNGP40ND"

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


// Initialize Firebase
export default firebase;