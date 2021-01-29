import Vue from 'vue'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from '../../firebaseConfig'

import store from '../store/'

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged(user => {
  store.commit('setFireuser', user)
})
