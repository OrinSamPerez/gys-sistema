import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormsProveedor from "../Components/Forms/FormsProveedor";
import { firebaseG } from "../BD-Firebase/firebase.conf";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import BotonReporte from '../Components/BotonReporte'
import {addBD, borrarBD} from '../BD-Firebase/CRUD'
import {busquedaStock} from '../Services/busqueda'
const db =  firebaseG.firestore();
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")
  const [dataBuscar, setDataBuscar] = useState([])
  const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    if(user != null){
      db.collection(user.email).doc('Proveedor').collection('Proveedor').orderBy("nombreProveedor", "desc").onSnapshot((querySnapshot)=>{
        const docs = [];
        querySnapshot.forEach(doc =>{
          docs.push({...doc.data(),id:doc.id})
          
        })
        setData(docs);
      });
    }
    })
  }
  useEffect(()=>{
    getData()
  },[])
  const addProveedor =  (objectoProveedor)=>{
    addBD('Proveedor', currentId,objectoProveedor, "🙂 Proveedor Agregado Sastifactoriamente!",'🙂 Proveedor Agregado Sastifactoriamente!', ' Error al Agregar o Actualizar un Proveedor')

  }
  const onDelete = (id,nombreProveedor, direccionProveedor,correoProveedor, telefonoProveedor, pagoProveedor,  cargoProveedor) => {
    const objetoEliminar ={id,nombreProveedor, direccionProveedor,correoProveedor, telefonoProveedor, pagoProveedor,  cargoProveedor}
    borrarBD('Proveedor',id, objetoEliminar, '🙂 Producto Eliminado Sastifactoriamente!')
}
const buscar = (e)=>{
  const resultadoDescripcion = busquedaStock(data, e.target.value)
  setDataBuscar(resultadoDescripcion)
}

  return (
    <>
    <BotonReporte title="Proveedor" buscar={buscar} idTable={'#tProveedor'} form={<FormsProveedor {...{addProveedor, currentId,data}}/>}/>
  
      <div className="scroll">
        <table id="tProveedor">
        <thead>
          <tr>
            <td>Proveedor</td>
            <td>Direccion</td>
            <td>Correo</td>
            <td>Telefono</td>
            <td>Pago</td>
            <td>Cargo</td>
            <td></td>
            
          </tr>
          
          </thead>
         
         
          
          {
            dataBuscar.length === 0?
                data.map(datos =>
                (<tr key={datos.id } >
                  <td >{datos.nombreProveedor}</td>
                  <td>{datos.direccionProveedor}</td>
                  <td>{datos.correoProveedor}</td>
                  <td>{datos.telefonoProveedor}</td>
                  <td>{datos.pagoProveedor}</td>
                  <td>{datos.cargoProveedor}</td>
                  <td>
                  <td> <li>
                      <Button onClick={() => onDelete(datos.id, datos.nombreProveedor, datos.direccionProveedor,datos.correoProveedor, datos.telefonoProveedor, datos.pagoProveedor,  datos.cargoProveedor )} variant="text" color="secondary">
                        <DeleteIcon />
                      </Button>
                    </li></td>
                  <td> <li>
                      <Button variant="text" onClick={() => setCurrenId(datos.id)} color="primary">
                        <EditIcon />
                      </Button>
                    </li></td>
                  </td>
                </tr>)
              )
              
            :
            dataBuscar.map(datos =>
                (<tr key={datos.id } >
                  <td >{datos.nombreProveedor}</td>
                  <td>{datos.direccionProveedor}</td>
                  <td>{datos.correoProveedor}</td>
                  <td>{datos.telefonoProveedor}</td>
                  <td>{datos.pagoProveedor}</td>
                  <td>{datos.cargoProveedor}</td>
                  <td>
                  <td> <li>
                      <Button onClick={() => onDelete(datos.id, datos.nombreProveedor, datos.direccionProveedor,datos.correoProveedor, datos.telefonoProveedor, datos.pagoProveedor,  datos.cargoProveedor)} variant="text" color="secondary">
                        <DeleteIcon />
                      </Button>
                    </li></td>
                  <td> <li>
                      <Button variant="text" onClick={() => setCurrenId(datos.id)} color="primary">
                        <EditIcon />
                      </Button>
                    </li></td>
                  </td>
                </tr>)
              )
          }
      
        </table>
      
    </div>
    </>
  );
}

