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
export const  loginWithEmail = async (email, password, values) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  values.contraseñaEmpresa = 'vufyutvibugithdx7r76r7' 
  values.confContraseña ='igu ytextsjtnybjvthcrscvdbfn'
  if(values.imagenLogo != null){
    if(values.imagenEmpresa != null){
      const ref =  firebase.storage().ref(`/ImagesLogos/${values.imagenLogo.name}`);
      ref.put(values.imagenLogo).then(data=>{
        data.ref.getDownloadURL().then(async (imgUrl)=>{
          values.imagenLogo = imgUrl;
          const refEmpresa =firebase.storage().ref(`/ImagesEmpresa/${values.imagenEmpresa.name}`)
          refEmpresa.put(values.imagenEmpresa).then(async dataEmpresa =>{
            dataEmpresa.ref.getDownloadURL().then(async (urlEmpresa)=>{
              values.imagenEmpresa = urlEmpresa
              await  db.collection(email).doc("datosUsuario").set(values);
              const max = (values.numeroEmpresa.length - 4)
              const number = values.numeroEmpresa.substr(max, values.numeroEmpresa.length)
              const empresaLink = values.nombreEmpresa.replace(/\s+/g, '');
              const direccion = values.direccionEmpresa.replace(/\s+/g, '');
              await db.collection('Empresas').doc(`${empresaLink}-${direccion}-${number}`).set(values.correoEmpresa)
            })
          })
      
        })
      })
    }
    else{
      const ref =  firebase.storage().ref(`/ImagesLogos/${values.imagenLogo.name}`);
      ref.put(values.imagenLogo).then(data=>{
        data.ref.getDownloadURL().then(async (imgUrl)=>{
          values.imagenLogo = imgUrl;
          await db.collection(email).doc("datosUsuario").set(values);
          const max = (values.numeroEmpresa.length - 4)
          const number = values.numeroEmpresa.substr(max, values.numeroEmpresa.length)
          const empresaLink = values.nombreEmpresa.replace(/\s+/g, '');
          const direccion = values.direccionEmpresa.replace(/\s+/g, '');
          await db.collection('Empresas').doc(`${empresaLink}-${direccion}-${number}`).set(values.correoEmpresa)


      
        })
      })
    }
  }
  else if(values.imagenEmpresa != null){
    const refEmpresa =firebase.storage().ref(`/ImagesEmpresa/${values.imagenEmpresa.name}`)
          refEmpresa.put(values.imagenEmpresa).then(async dataEmpresa =>{
            dataEmpresa.ref.getDownloadURL().then(async (urlEmpresa)=>{
              values.imagenEmpresa = urlEmpresa
              await db.collection(email).doc("datosUsuario").set(values);
              const max = (values.numeroEmpresa.length - 4)
              const number = values.numeroEmpresa.substr(max, values.numeroEmpresa.length)
              const empresaLink = values.nombreEmpresa.replace(/\s+/g, '');
              const direccion = values.direccionEmpresa.replace(/\s+/g, '');
              await db.collection('Empresas').doc(`${empresaLink}-${direccion}-${number}`).set(values.correoEmpresa)

            })
          })
  }
  
  else{
    db.collection(email).doc("datosUsuario").set(values);
    const max = (values.numeroEmpresa.length - 4)
    const number = values.numeroEmpresa.substr(max, values.numeroEmpresa.length)
    const empresaLink = values.nombreEmpresa.replace(/\s+/g, '');
    const direccion = values.direccionEmpresa.replace(/\s+/g, '');
    db.collection('Empresas').doc(`${empresaLink}-${direccion}-${number}`).set(values.correoEmpresa)

  }

  
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
  
export const loginCollection = async (email,values) => {
  return await db.collection(email).doc("datosUsuario").set(values);
};

export const loginSingIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const firebaseG = firebase;
