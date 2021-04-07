import {firebaseG} from '../BD-Firebase/firebase.conf';
const f = new Date;
const auth = firebaseG.auth();
const db = firebaseG.firestore();
const mora = 5000;
const tiempo = 5;
export const  correo = () =>{
    auth.onAuthStateChanged(async user=>{
        if(user != null){
            db.collection(user.email).doc('Factura').collection('Factura').orderBy('fechaActual', 'desc').onSnapshot(documents =>{
                const docs = []
                documents.forEach(doc =>{
                if( doc.data().estadoPago == 'A plazo')
                {
                     docs.push({...doc.data(),id:doc.id})
                }
                docs.forEach(doc =>{
                    const vencimiento  = doc.vencimientoFactura.substring(0, 2) 
                    const fecha =parseInt(doc.fechaActual.substring(0, 2) ) + tiempo
                    if(vencimiento == fecha )
                    {
                         console.log('Aumentando y enviado email')
                    }
         
                })

            })
              })
        }
    })
}
