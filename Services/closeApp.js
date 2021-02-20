import {firebaseG} from '../firebase.BD/firebase.conf'
export const closeApp = () => {
    firebaseG.auth().signOut().then(console.log(""));
  };