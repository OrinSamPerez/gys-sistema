import {useState} from 'react'
import {firebaseG} from '../firebase.BD/firebase.conf'
const db =  firebaseG.firestore();
const auth =  firebaseG.auth();                                                                                                                                                                                                                                                         
export default function ModalFactura(props){
    const [datos, setDatos] = useState([])
    if(datos.length === 0){
        auth.onAuthStateChanged(user =>{
            if(user != null){
               db.collection(user.email).doc('Factura').collection('Factura').doc(props.idFacturas).get().then(doc =>{
                    setDatos(doc.data())
                })
            }
        })
    }
    return(
       <div>
       {
           datos.length === 0? <h1>Espere los datos</h1>
           :<h1>{datos.Total}</h1>
       }
       </div>
    )
}