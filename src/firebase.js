import firebase from 'firebase/compat/app'
import "firebase/compat/database"
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBDHHjCovZx6IIUFSCCbF7JHUkyTYU459Y",
    authDomain: "reactpost-9773f.firebaseapp.com",
    databaseURL: "https://reactpost-9773f-default-rtdb.firebaseio.com",
    projectId: "reactpost-9773f",
    storageBucket: "reactpost-9773f.appspot.com",
    messagingSenderId: "366476155833",
    appId: "1:366476155833:web:93e2e279fc17737fd8b468"
  };

var fireDbs = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

const fireDb = fireDbs.database().ref()

export {
    fireDb,
    storage
}

