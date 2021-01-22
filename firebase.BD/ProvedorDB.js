import { firebaseG } from "./firebase.conf";
const db = firebaseG.firestore();
var userEmail = "orlin@gmail.com";
var collectionDB;


//Comprobando datos
firebaseG.auth().onAuthStateChanged((user) => {
  if (user) {
    userEmail = user.email;
    collectionDB = db.collection(userEmail).doc("Proveedor");
  } else {
    console.log("Espera");
  }
});

export const enviarDatoProveedor = (
  emailProveedor,
  terminosPago,
  notaProveedor,
  telefono,
  dirrecion,
  cargoRepresentante,
  nombreProveedor
) => {
  var f = new Date();
  var uId = nombreProveedor + f;
  collectionDB
    .collection("Proveedor")
    .doc(uId)
    .set({
      nombreProveedor,
      dirrecion,
      cargoRepresentante,
      telefono,
      emailProveedor,
      terminosPago,
      notaProveedor,
      uId,
    })
    .then(function () {
      console.log("Se ha registrado");
    })
    .catch(function () {
      console.log("Erro!");
    });
};

//Recibiendo datos de firebase
const getDataFirebase = (doc) => {
  const data = doc.data();
  const {
    uId,
    nombreProveedor,
    dirrecion,
    cargoRepresentante,
    telefono,
    emailProveedor,
    terminosPago,
    notaProveedor,
  } = data;
  return {
    nombreProveedor,
    dirrecion,
    cargoRepresentante,
    telefono,
    emailProveedor,
    terminosPago,
    notaProveedor,
    uId,
  };
};

//Enviando datos al proveedor
export const listenData = (callback) => {
  return collectionDB
    .collection("Proveedor")
    .orderBy("nombreProveedor", "desc")
    .onSnapshot(({ docs }) => {
      const newData = docs.map(getDataFirebase);
      callback(newData);
    });
};
