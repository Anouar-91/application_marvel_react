import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import 'firebase/firestore'
import { getFirestore, doc, setDoc } from 'firebase/firestore';
const config = {
  apiKey: "AIzaSyDFnLmnNQnvrMI2qVoh23WsYH980ExkdVY",
  authDomain: "marvel-quiz-a471c.firebaseapp.com",
  projectId: "marvel-quiz-a471c",
  storageBucket: "marvel-quiz-a471c.appspot.com",
  messagingSenderId: "864827429717",
  appId: "1:864827429717:web:9a9c6ec30f52a8cbcd95dc"
};

const app = initializeApp(config)
export const auth = getAuth(app)

export const firestore = getFirestore();

export const user = uid => doc(firestore,`users/${uid}`);
