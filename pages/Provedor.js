import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormsProveedor from '../Components/Forms/FormsProveedor'
import {firebaseG} from '../firebase.BD/firebase.conf'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const db =  firebaseG.firestore();
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")


  const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    db.collection(user.email).doc('Proveedor').collection('Proveedor').orderBy("nombreProveedor", "desc").onSnapshot((querySnapshot)=>{
      const docs = [];
      querySnapshot.forEach(doc =>{
        docs.push({...doc.data(),id:doc.id})
        
      })
      setData(docs);
    });
    })
  }
  useEffect(()=>{
    getData()
  },[])
  const addProveedor =  (objectProveedor)=>{
    firebaseG.auth().onAuthStateChanged(async (user) => {
      try{
        if(currentId === ""){
          await db.collection(user.email).doc('Proveedor').collection('Proveedor').doc().set(objectProveedor)
         }
         else{ 
           await db.collection(user.email).doc('Proveedor').collection('Proveedor').doc(currentId).update(objectProveedor)
           setCurrenId("");
   
          }
          }catch(error){
            console.error(error);
         }
      
    })
  }
  const onDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar?")) {

      firebaseG.auth().onAuthStateChanged(async (user) => {
        await db.collection(user.email).doc('Proveedor').collection('Proveedor').doc(id).delete();
    })
    }
}

 
  return (
    <>
    <div className="table">
      <h1>Proveedor</h1>
      <div className="center-table">
        <Button variant="contained" color="secondary">
          Descargar tabla
          <GetAppIcon />
        </Button>
        <input id="search"   placeholder="Buscar en tabla"/>
        <Button variant="text" color="default">
          
        </Button>
      </div>
      <FormsProveedor {...{addProveedor, currentId,data}}/>
      <div>
        <table>
          <tr>
            <td>Proveedor</td>
            <td>Direccion</td>
            <td>Correo</td>
            <td>Telefono</td>
            <td>Pago</td>
            <td>Cargo</td>
          </tr>
          {data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.nombreProveedor}</td>
              <td>{datos.direccionProveedor}</td>
              <td>{datos.correoProveedor}</td>
              <td>{datos.telefonoProveedor}</td>
              <td>{datos.pagoProveedor}</td>
              <td>{datos.cargoProveedor}</td>
              <td>
                <li>
                  <Button onClick={() => onDelete(datos.id)} variant="text" color="secondary">
                    <DeleteIcon />
                  </Button>
                </li>
                <li>
                  <Button variant="text" onClick={() => setCurrenId(datos.id)} color="primary">
                    <EditIcon />
                  </Button>
                </li>
              </td>
            </tr>)
          )} 
        </table>
      </div>
    </div>

    </>
  );
}

