// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAVSARp95HZ-TN3Qi4sKL_IKcmvZB1LzRM",
//     authDomain: "fir-auth-94ce7.firebaseapp.com",
//     projectId: "fir-auth-94ce7",
//     storageBucket: "fir-auth-94ce7.appspot.com",
//     messagingSenderId: "246547013798",
//     appId: "1:246547013798:web:cd7bbafa9e87335b375467"
//   };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);


// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Cấu hình Firebase (thay bằng thông tin cấu hình của bạn)
// Cấu hình Firebase (thay bằng cấu hình Firebase của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyAVSARp95HZ-TN3Qi4sKL_IKcmvZB1LzRM",
  authDomain: "fir-auth-94ce7.firebaseapp.com",
  projectId: "fir-auth-94ce7",
  storageBucket: "fir-auth-94ce7.appspot.com",
  messagingSenderId: "246547013798",
  appId: "1:246547013798:web:cd7bbafa9e87335b375467"
};

// Khởi tạo Firebase nếu chưa có app nào
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;

export { auth };