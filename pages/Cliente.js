import {firebaseG} from '../BD-Firebase/firebase.conf'
import FormsClientes from '../Components/Forms/FormsCliente';
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import BotonReporte from '../Components/BotonReporte'
import {addBD, borrarBD} from '../BD-Firebase/CRUD'
import {busquedaCliente,busquedaId} from '../Services/busqueda'
const db = firebaseG.firestore();

export default function  Cliente() {
  const [data, setData] = useState([]);
  const [ currentId, setCurrenId] = useState("")
  const [datosBuscar, setDatosBuscar]=useState([])

 const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    if(user != null){
      db.collection(user.email).doc('Clientes').collection('Clientes').orderBy("nombreCliente", "desc").onSnapshot((querySnapshot)=>{
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

  const cantidadClientes= data.length;
  
  const addClientes=async (objectClientes)=>{
    await addBD('Clientes', currentId,objectClientes, "🙂 Cliente Agregado Sastifactoriamente!",'🙂 Cliente Actualizado Sastifactoriamente!', ' Error al Agregar o Actualizar un Cliente')
    setCurrenId("")
    
  }

  const onDelete = (id, nombreCliente, correoCliente, direccionCliente, telefonoCliente) => {
    const objetoEliminar ={id, nombreCliente, correoCliente, direccionCliente, telefonoCliente}
    borrarBD('Clientes',id, objetoEliminar, '🙂 Cliente Eliminado Sastifactoriamente!')
}
const buscar = (e)=>{
  const resultadoBusquedaId = busquedaId(data, e.target.value)
  const resultadoDescripcion = busquedaCliente(data, e.target.value)
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

  
  return (
    <>       
      
      <BotonReporte title="Clientes" buscar={buscar} idTable={'#tCliente'} idTableExcel={'tCliente'} form={<FormsClientes {...{addClientes, currentId}}/>}/>
    
      <div className="scroll">
        <table id="tCliente">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Direccion</td>
            <td>Telefono</td>
            <td></td>
            
          </tr>
          
          </thead>       
          
          {datosBuscar.length === 0?
            data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.id}</td>
              <td >{datos.nombreCliente}</td>
              <td>{datos.correoCliente}</td>
              <td>{datos.direccionCliente}</td>
              <td>{datos.telefonoCliente}</td>
              
              <td>
               <td> <li>
                  <Button onClick={() => onDelete(datos.id,datos.nombreCliente,  datos.correoCliente,datos.direccionCliente,datos.telefonoCliente )} variant="text" color="ff0000">
                  <DeleteIcon style={{color:'ff0000', backGround:'ff0000'}} />
                  </Button>
                </li></td>
               <td> <li>
                  <Button variant="text" onClick={() => setCurrenId(datos.id)} color="primary">
                    <EditIcon />
                  </Button>
                </li></td>
               
              </td>
              
            </tr>)
          ):
          datosBuscar.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.id}</td>
              <td >{datos.nombreCliente}</td>
              <td>{datos.correoCliente}</td>
              <td>{datos.direccionCliente}</td>
              <td>{datos.telefonoCliente}</td>
              
              <td>
               <td> <li>
                  <Button onClick={() => onDelete(datos.id,datos.nombreCliente,  datos.correoCliente,datos.direccionCliente,datos.telefonoCliente )} variant="text" color="secondary">
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
