import { firebaseG } from "../firebase.BD/firebase.conf";
import {useState} from 'react'
let userData = "ola";
let userEmail = "";

var userD = "ola";
export default function getEmail() {
  const [stateUser, setStateUser]= useState('orlin')
  firebaseG.auth().onAuthStateChanged((user)=>{userD  = user})
  
  userData = firebaseG.auth().currentUser;
    if (userData != null) {
      userEmail = userData.email;
    }
    userD = stateUser
  
  return (userD)
  
}
