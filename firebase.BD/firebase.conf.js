import firebase from "firebase/app";
import "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA_12EKG4v8eIprK54y6_OaAYKhRrYaOJw",
  authDomain: "sistema-gestion-6b6c0.firebaseapp.com",
  projectId: "sistema-gestion-6b6c0",
  storageBucket: "sistema-gestion-6b6c0.appspot.com",
  messagingSenderId: "479409184064",
  appId: "1:479409184064:web:4b99bde7dcfa38a599aea5",
  measurementId: "G-T3F5WZKT3W",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export const loginWithEmail = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
let userData = "";
let userEmail = "";
export const userInfo = () => {
  userData = firebase.auth().currentUser;
  if (userData != null) {
    userEmail = userData.email;
    return userEmail;
  }

};

export const userInfoData =  () => {
    userData = firebase.auth().currentUser;
    if (userData != null) {
      var email  = userData.providerData.email;
    }
    return  email ;

}  
  

export const loginCollection = (email, nameEmpresa, number, typeEmpresa, direccion) => {
  return db.collection(email).doc("datosUsuario").set({
    email,
    nameEmpresa,
    number,
    typeEmpresa,
    direccion
  });
};

export const loginSingIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const firebaseG = firebase;
