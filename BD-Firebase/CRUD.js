import {firebaseG} from './firebase.conf'
import {alertaError, alertaSactifactoria} from '../Components/Alertas'
import swal from 'sweetalert';


const auth = firebaseG.auth();
const db = firebaseG.firestore();


//Añadir y actualizar base de datos
export const addBD = (nombreBD, currentId,objeto, mensajeAdd, mensajeActualizar, mensajeError) => {
    auth.onAuthStateChanged(async user =>{
        if(user != null){
          try{
            if(currentId === ""){
                await db.collection(user.email).doc(nombreBD).collection(nombreBD).doc().set(objeto)
                alertaSactifactoria(mensajeAdd)
            }
            else{
                await db.collection(user.email).doc(nombreBD).collection(nombreBD).doc(currentId).update(objeto)
                alertaSactifactoria(mensajeActualizar)
            }
          }
          catch (error){  alertaError(mensajeError)}
        }
    })
  };


  //Eliminar datos base de Datos
  export const borrarBD = (nombreBD,id, objetoEliminar, mensaje) => {
    swal({
      title: "¿Seguro que quiere eliminar?",
      text: "¡Este elemento se borrara permanentemente!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((resp) => {
      if (resp) {
        auth.onAuthStateChanged(async user =>{
          if(user != null){
            await db.collection(user.email).doc(`${nombreBD}-Inactivo`).collection(`${nombreBD}-Inactivo`).doc(id).set(objetoEliminar)
            await db.collection(user.email).doc(nombreBD).collection(nombreBD).doc(id).delete();
            alertaError(mensaje)
          }
        })
      } 
    });
  };
  
