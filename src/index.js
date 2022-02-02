import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { store } from './redux/store'
import { Provider } from 'react-redux'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSYKB_RZU4XMJSLCB10wIw568Fn92k1gQ",
    authDomain: "converter-js.firebaseapp.com",
    projectId: "converter-js",
    storageBucket: "converter-js.appspot.com",
    messagingSenderId: "451489469830",
    appId: "1:451489469830:web:7510e18cb18adfd84f8807",
    measurementId: "G-XQXZV5RFT4"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

