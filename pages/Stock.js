import {useState} from 'react'
import {firebaseG} from '../firebase.BD/firebase.conf'
const db = firebaseG.firestore()
const auth = firebaseG.auth()
export default function Stock(){
const [entrada, setEntrada] =  useState([])
const [factura, setFactura] = useState([])
const [datosStock, setDatosStock] = useState([])
 auth.onAuthStateChanged(user =>{
     if(user != null){
         db.collection(user.email).doc('Producto').collection('Producto').orderBy('nombreProducto', 'asc').onSnapshot(docus =>{
             const docs = []
             docus.forEach(doc =>{
                 docs.push({...doc.data(),id:doc.id})
             })
             setEntrada(docs)

         })

         db.collection(user.email).doc('Factura').collection('Factura').onSnapshot(docus =>{
             const docsFactura = []
             docus.forEach(doc =>{
                docsFactura.push({...doc.data(),id:doc.id})
             })
             setFactura(docsFactura)
         })
     }
 })

//     const filtro = ()=>{
//         const result = entrada.filter(word=>
//             factura.map(docFactura =>{
//                 const docume = []
//                 docFactura.productoFactura.map(Producto=>{
//                     if(Producto.producto === word.nombreProducto){
//                         docume.push({...word})
//                     }
//                     else{
//                        // console.log(word)
//                     }
//                 })
//                 return docume
//             })    
//         )
//         console.log(result)
//     }
// filtro()
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
                    entrada.length === 0? 
                    <td> </td>
                    :entrada.map(row=>
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.nombreProducto}</td>
                        <td>0</td>
                        <td>{row.cantidadProducto}</td>
                        <td>Salida</td>
                        <td>Stock</td>
                    </tr>
                    )

                                     
                }
            </tbody>
        </table>

        </>

  
    )
}