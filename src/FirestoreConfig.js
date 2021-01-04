import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'

const app =firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

// para autenticar con google provider
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// auth con facebook
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// autenticacion
const Autentication = app.auth();
// conexion a base de datos
const db = firebase.firestore();
// conexion al almacenamiento de imagenes
const storageFirebase = firebase.storage();
export {
    Autentication,
    googleAuthProvider,
    facebookAuthProvider,
     db,
     storageFirebase
}