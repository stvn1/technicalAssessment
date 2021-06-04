import firebase from "firebase/app";




// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "./keys";
const app = firebase.initializeApp(firebaseConfig);

// const databaseRef = firebase.database().ref();
// export const todosRef = databaseRef.child("todos");

export const db = app.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp()


export const auth = app.auth();
