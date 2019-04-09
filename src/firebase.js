import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyBRmSWViUXsqz3PvUV9ZCJBwXeafkwNEFI",
  authDomain: "chat-app-1a51a.firebaseapp.com",
  databaseURL: "https://chat-app-1a51a.firebaseio.com",
  projectId: "chat-app-1a51a",
  storageBucket: "chat-app-1a51a.appspot.com",
  messagingSenderId: "234335118158"
};

firebase.initializeApp(config)

const db = firebase.firestore()
const rtdb = firebase.database()

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  }

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  }

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  }

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  }

  const rtdbRef = rtdb.ref(`status/${user.uid}`)
  const userDoc = db.doc(`/users/${user.uid}`)

  rtdb.ref(".info/connected").on("value", async snapshot => {
    if(snapshot.val() === false){
      userDoc.update({
        status: isOfflineForFirestore
      })
      return
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB)
    rtdbRef.set(isOnlineForRTDB)
    userDoc.update({
      status: isOnlineForFirestore
    })
  })
}

export { db, firebase }
