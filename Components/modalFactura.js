import {useState} from 'react'
import {firebaseG} from '../firebase.BD/firebase.conf'
const db =  firebaseG.firestore();
 
                                                                                                                                                                                                                                                    
export default function ModalFactura(props){
    const [datos, setDatos] = useState([])
    if (datos.length === 0 )
    {
    firebaseG.auth().onAuthStateChanged(async user=>{
    if (user != null){
      await  db.collection(user.email).doc('Factura').collection('Factura').doc(props.idFacturas).get().then((doc)=>{
            
                setDatos(doc.data())
                console.log(datos.nombreClienteFactura)
           
                
           
        })
    }
    
    })
}
    
    return(
       <div>
       <h1>hola </h1>
       </div>
    );
} 