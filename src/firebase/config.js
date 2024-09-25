import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABA6dJ0neHOiq6ktVi2xSYdgpmByEpBVM",
    authDomain: "olx-clone-655f5.firebaseapp.com",
    projectId: "olx-clone-655f5",
    storageBucket: "olx-clone-655f5.appspot.com",
    messagingSenderId: "521865148885",
    appId: "1:521865148885:web:e01138f06b0e3a6041655c",
    measurementId: "G-HJ5JSW4JXG"
  };
export default firebase.initializeApp(firebaseConfig)