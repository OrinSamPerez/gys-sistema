import {useState} from 'react'
import {firebaseG} from '../firebase.BD/firebase.conf'
const db = firebaseG.firestore()
const auth = firebaseG.auth()
export default function Stock(){
const [datosStock, setDatosStock] = useState([])
 auth.onAuthStateChanged(user =>{
     if(user != null){
         db.collection(user.email).doc('Stock').collection('Stock').orderBy('id', 'asc').onSnapshot(docus =>{
             const docs = []
             docus.forEach(doc =>{
                 docs.push({...doc.data(),id:doc.id})
             })
             setDatosStock(docs)

         })
     }
 })
 
    return(
        <>
        <table>
            <thead>
                <tr>
                    <td>Codigo de Producto</td>
                    <td>Descripcion</td>
                    <td>Existencia Iniciales</td>
                    <td>Entrada</td>
                    <td>Salida</td>
                    <td>Stock</td>
                </tr>
            </thead>
            <tbody>
                {
                    datosStock.length === 0? 
                    <td> </td>
                    :datosStock.map(row=>
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.Descripcion}</td>
                        <td>{row.ExistenciaInciales}</td>
                        <td>{row.Entrada}</td>
                        <td> {row.Salida_Inicial}</td>
                        <td>{row.Stock}</td>
                    </tr>
                    )

                                     
                }
            </tbody>
        </table>

        </>

  
    )
}