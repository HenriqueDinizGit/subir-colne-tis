// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Adicionando importação do Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-1KyEdQQzYGKzCRD4PX5cb_i5d3UI16M",
  authDomain: "muscleuuup-3381c.firebaseapp.com",
  projectId: "muscleuuup-3381c",
  storageBucket: "muscleuuup-3381c.appspot.com",
  messagingSenderId: "596162597541",
  appId: "1:596162597541:web:ea392775fd5acbcd76b34c",
  measurementId: "G-XNQDVSBGFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Inicializando o Firebase Storage

export { app, storage };
