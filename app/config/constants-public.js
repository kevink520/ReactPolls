import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyB-P2uGdC7ZZz-gz4MkwMb8AI5XdAjDV0w",
  authDomain: "reactpolls-3796f.firebaseapp.com",
  databaseURL: "https://reactpolls-3796f.firebaseio.com",
  projectId: "reactpolls-3796f",
  storageBucket: "reactpolls-3796f.appspot.com",
  messagingSenderId: "18082957260",
});

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export {
  ref,
  firebaseAuth,
  facebookProvider,
}
