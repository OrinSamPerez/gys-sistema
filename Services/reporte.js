import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { firebaseG } from "../BD-Firebase/firebase.conf";

export const reporte= (idTable, nameTable)=>{
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre")
    firebaseG.auth().onAuthStateChanged(async (user)=>{
      if(user != null){
        firebaseG.firestore().collection(user.email).doc('datosUsuario').get().then((doc)=>{
          if(doc.exists){
            
            console.log(doc.data())
            
            var fechaA = new Date();
            var logo= new Image();
            logo.src='logo.png';
            const docu = new jsPDF()
            docu.addImage(logo, 'JPEG',30,5,15,15);
            docu.text(10,25,`${doc.data().nombreEmpresa}`)
            
            docu.text(150,25,`${fechaA.getDate()}/${meses[fechaA.getMonth()]}/${fechaA.getUTCFullYear()}` )
            docu.text(75,35, `Reporte de ${nameTable}`)
            
          
            docu.autoTable({
              startY:45,
              html: idTable ,
              
            })
             
            docu.save(`${nameTable}.pdf`)
          }
        })
      }
    })
    
  }
  