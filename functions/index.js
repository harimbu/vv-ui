const functions = require('firebase-functions')

var admin = require('firebase-admin')
var serviceAccount = require('./key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url // 'https://vfb-site-default-rtdb.firebaseio.com'
})

const db = admin.database()
const fdb = admin.firestore()

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user
  const u = {
    email,
    displayName,
    photoURL,
    createdAt: new Date().getMilliseconds(),
    level: email === functions.config().admin.email ? 0 : 5
  }
  db.ref('users').child(uid).set(u)
})

exports.removeUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user
  db.ref('users').child(uid).remove()
})

exports.incrementBoardCount = functions.firestore.document('board2/{bid}').onCreate(async (snap, context) => {
  try {
    await fdb.collection('meta').doc('board2').update('count', admin.firestore.FieldValue.increment(1))
  } catch (e) {
    await fdb.collection('meta').doc('board2').set({ count: 1 })
  }
})

exports.decrementBoardCount = functions.firestore.document('board2/{bid}').onDelete(async (snap, context) => {
  await fdb.collection('meta').doc('board2').update('count', admin.firestore.FieldValue.increment(-1))
})
