import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Replace with your Firebase project config
// Get this from Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyDQWxDsW3DfsT5qX2dQ1k2L6mN7oPq8R9s",
  authDomain: "career-explorer-12345.firebaseapp.com",
  projectId: "career-explorer-12345",
  databaseURL: "https://career-explorer-12345.firebaseio.com",
  storageBucket: "career-explorer-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
