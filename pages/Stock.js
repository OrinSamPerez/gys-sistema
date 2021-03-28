import React,{useState} from 'react'
import {firebaseG} from '../BD-Firebase/firebase.conf'
import {busquedaId, busquedaDescripcion} from '../Services/busqueda'
import BotonReporte from '../Components/BotonReporte'
const db = firebaseG.firestore()
const auth = firebaseG.auth()
export default function Stock(){
    const [datosStock, setDatosStock] = useState([])
const [datosBuscar, setDatosBuscar] = useState([])
  auth.onAuthStateChanged(user =>{
    if(user != null){
        db.collection(user.email).doc('Stock').collection('Stock').onSnapshot(docus =>{
            const docs = []
            docus.forEach(doc =>{
                docs.push({...doc.data(),id:doc.id})
            })
            setDatosStock(docs)

        })
    }
})
  const buscar = (e)=>{
    const resultadoBusquedaId = busquedaId(datosStock, e.target.value)
    const resultadoDescripcion = busquedaDescripcion(datosStock, e.target.value)
    if(resultadoBusquedaId.length === 5 && resultadoDescripcion === 5){
      setDatosBuscar(resultadoBusquedaId)

    }
    if(resultadoBusquedaId.length != 0){
      setDatosBuscar(resultadoBusquedaId)
    }
    if(resultadoDescripcion.length != 0){
      setDatosBuscar(resultadoDescripcion)
    }
  }
  // console.log(datosBuscar)
    return(
        <>
    <BotonReporte title="Stock" buscar={buscar} idTable={'#tStock'} />
        <table id="tStock">
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
                {datosBuscar.length === 0?
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
                    :datosBuscar.map(row=>
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