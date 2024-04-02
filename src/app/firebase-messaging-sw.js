// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDLYLj-PCBtHVjbjbboUwp6FaVdCN_-jIw",
  authDomain: "t21-solution.firebaseapp.com",
  projectId: "t21-solution",
  storageBucket: "t21-solution.appspot.com",
  messagingSenderId: "684233082724",
  appId: "1:684233082724:web:1fabb0af151b1d7dd51c71",
  measurementId: "G-YEKVG62JMZ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();