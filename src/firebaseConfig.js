import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCfOxXb3gxS-cZu7SoToEfLtsD51SMpB7w",
  authDomain: "careerplanner-64cbd.firebaseapp.com",
  projectId: "careerplanner-64cbd",
  databaseURL: "https://careerplanner-64cbd-default-rtdb.firebaseio.com",
  storageBucket: "careerplanner-64cbd.firebasestorage.app",
  messagingSenderId: "543873353389",
  appId: "1:543873353389:web:9f591fd301fef97e9f2824"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
