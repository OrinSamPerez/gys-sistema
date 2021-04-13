import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-toastify/dist/ReactToastify.css";
import {busquedaCategoria} from '../Services/busqueda'
import {addBD, borrarBD} from '../BD-Firebase/CRUD'
import {firebaseG} from '../BD-Firebase/firebase.conf'
import BotonReporte from '../Components/BotonReporte'
import FormsCategoria from "../Components/Forms/FormsCategoria";
const auth = firebaseG.auth();
const db = firebaseG.firestore();
export default function Provedor() {
  const [data, setData] = useState([]);
  const [dataBuscar, setDataBuscar]= useState([])
  const [currentId, setCurrenId] = useState("");
//Extraer datos
const getData =()=>{
  firebaseG.auth().onAuthStateChanged(async (user) => {
   if(user != null){
     db.collection(user.email).doc('Categoria').collection('Categoria').onSnapshot((querySnapshot)=>{
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

  const addCategoria = async (objectCategoria) => {
    await addBD('Categoria', currentId,objectCategoria, "🙂 Categoria Agregada Sastifactoriamente!",'🙂 Categoria Actualizada Sastifactoriamente!', ' Error al Agregar o Actualizar una Categoria')
  };
  const onDelete = (id,descripcionCategoria) => {
    const objetoEliminar ={id,descripcionCategoria}
    borrarBD('Categoria',id, objetoEliminar, '🙂 Categoria Eliminado Sastifactoriamente!')
}
  const buscar = (e)=>{
    const busqueda = busquedaCategoria(data, e.target.value)
    setDataBuscar(busqueda)
  }
  
  return (
    <>
      <BotonReporte title="Categoria" buscar={buscar} idTable={'#tCategoria'} idTableExcel={'tCategoria'} form={<FormsCategoria {...{ addCategoria, currentId, data }} />}/>


        <div className="scroll">
          <table id="tCategoria">
            <thead>
              <tr>
                <td>Descripcion</td>
                <td></td>
              </tr>
            </thead>
            {dataBuscar.length === 0?
              data.map((datos) => (
              <tr key={datos.id}>
                <td>{datos.descripcionCategoria}</td>
                <td>
                  <td>
                    {" "}
                    <li>
                      <Button
                        onClick={() => onDelete(datos.id,datos.descripcionCategoria)}
                        variant="text"
                        color="secondary"
                      >
                        <DeleteIcon style={{color:'ff0000', backGround:'ff0000'}} />
                      </Button>
                    </li>
                  </td>
                  <td>
                    {" "}
                    <li>
                      <Button
                        variant="text"
                        onClick={() => setCurrenId(datos.id)}
                        color="primary"
                      >
                        <EditIcon />
                      </Button>
                    </li>
                  </td>
                </td>
              </tr>
            ))
            :dataBuscar.map((datos) => (
              <tr key={datos.id}>
                <td>{datos.descripcionCategoria}</td>
                <td>
                  <td>
                    {" "}
                    <li>
                      <Button
                        onClick={() => onDelete(datos.id, datos.descripcionCategoria)}
                        variant="text"
                        color='ff0000'
                      >
                        <DeleteIcon style={{color:'ff0000', backGround:'ff0000'}} />
                      </Button>
                    </li>
                  </td>
                  <td>
                    {" "}
                    <li>
                      <Button
                        variant="text"
                        onClick={() => setCurrenId(datos.id)}
                        color="primary"
                      >
                        <EditIcon />
                      </Button>
                    </li>
                  </td>
                </td>
              </tr>
            ))}
          </table>
        </div>
    </>
  );
}
