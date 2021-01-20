import { firebaseG, userInfo} from "./firebase.conf";

const db = firebaseG.firestore();
var  userEmail="orlin@gmail.com"




//Enviando datos a firebase
const collectionDB = db.collection( userInfo() || userEmail ).doc("Proveedor"); 
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
  var uId =  (nombreProveedor + f)
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
      uId
    })
    .then(function () {
      console.log("Se ha registrado");
    })
    .catch(function () {
      console.log("Erro!");
    });
};


//Recibiendo datos de firebase y enviando al cliente

export const getProveedor = () => collectionDB.collection("Proveedor").get()
.then(({ docs })=>{
  return docs.map( (doc)=>{
    const  data= doc.data()
    const { uId,nombreProveedor, dirrecion,cargoRepresentante, telefono, emailProveedor, terminosPago, notaProveedor } = data;
    return{
    
          nombreProveedor, 
          dirrecion,
          cargoRepresentante, 
          telefono, 
          emailProveedor, 
          terminosPago,
           notaProveedor, 
           uId
    }
  })
})

// const comprobarDatos =  () =>{
//   if(userEmail === "null"){
//     console.log('hola')
//     userEmail =  userInfo()
//     console.log(userEmail)
//     return comprobarDatos() 
//   }
// else if (userEmail != "null"){
//     return userEmail =  userInfo()
//   }

// }
// userEmail = comprobarDatos();
