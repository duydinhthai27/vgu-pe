// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7Opqr5hrW_jWuB7HCRj9FO7E9gUVM_zI",
  authDomain: "chat-library-f1aa1.firebaseapp.com",
  projectId: "chat-library-f1aa1",
  storageBucket: "chat-library-f1aa1.appspot.com",
  messagingSenderId: "111225498935",
  appId: "1:111225498935:web:165e3b94fc5106d02bbeb2",
  measurementId: "G-HNQ0R8M850"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services for use in other parts of your app
export { db, auth };
export default app;