import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCf_d7VJEVL6F0lj2qqXvkCWZajT98xYbw",
    authDomain: "hotelbooking-156ba.firebaseapp.com",
    projectId: "hotelbooking-156ba",
    storageBucket: "hotelbooking-156ba.appspot.com",
    messagingSenderId: "828537386927",
    appId: "1:828537386927:web:8a1a6cf26663b4439f615a",
    measurementId: "G-M6NN0EMSQ6"
  };

  const app = initializeApp(firebaseConfig);

  export const auth=getAuth(app)
  export default app;