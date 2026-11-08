import "../config/firebase";
import { getMessaging } from "firebase-admin/messaging";

export const sendNotification = (token: string, title: string, body: string) =>
  getMessaging().send({
    token,
    notification: { title, body },
  });


  // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyApGn6Zt7Bs18hLAsdI8-VEzky-3sE2TX8",
//   authDomain: "push-notification-for-sil.firebaseapp.com",
//   projectId: "push-notification-for-sil",
//   storageBucket: "push-notification-for-sil.firebasestorage.app",
//   messagingSenderId: "958431901727",
//   appId: "1:958431901727:web:3e5da0563f4c3053b37d2a",
//   measurementId: "G-9M61LTKNWC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);