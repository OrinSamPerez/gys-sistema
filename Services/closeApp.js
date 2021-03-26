import {firebaseG} from '../BD-Firebase/firebase.conf'
export const closeApp = () => {
    firebaseG.auth().signOut().then(console.log(""));
  };