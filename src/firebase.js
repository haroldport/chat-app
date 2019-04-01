import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBRmSWViUXsqz3PvUV9ZCJBwXeafkwNEFI",
    authDomain: "chat-app-1a51a.firebaseapp.com",
    databaseURL: "https://chat-app-1a51a.firebaseio.com",
    projectId: "chat-app-1a51a",
    storageBucket: "chat-app-1a51a.appspot.com",
    messagingSenderId: "234335118158"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase };
