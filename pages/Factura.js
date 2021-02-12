import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormsFacturacion from '../Components/Forms/FormsFacturacion'
import {firebaseG} from '../firebase.BD/firebase.conf'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const db =  firebaseG.firestore();
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")


  const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    db.collection(user.email).doc('Factura').collection('Factura').onSnapshot((querySnapshot)=>{
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
  const addFactura =  (objectFactura)=>{
    firebaseG.auth().onAuthStateChanged(async (user) => {
      try{
        if(currentId === ""){
          await db.collection(user.email).doc('Factura').collection('Factura').doc().set(objectFactura)
         }
         else{ 
           await db.collection(user.email).doc('Factura').collection('Factura').doc(currentId).update(objectFactura)
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
        await db.collection(user.email).doc('Factura').collection('Factura').doc(id).delete();
    })
    }
}

 
  return (
    <>
    <div className="table">
      <h1>Factura</h1>
      <div className="center-table">
        <Button variant="contained" color="secondary">
          Descargar tabla
          <GetAppIcon />
        </Button>
      </div>
      <FormsFacturacion {...{addFactura, currentId,data}}/>
      <div>
        <table>
          <tr>
            <td>Factura</td>
            <td>Direccion</td>
            <td>Correo</td>
            <td>Telefono</td>
            <td>Pago</td>
            <td>Cargo</td>
          </tr>
          {/* {data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.nombreFactura}</td>
              <td>{datos.direccionFactura}</td>
              <td>{datos.correoFactura}</td>
              <td>{datos.telefonoFactura}</td>
              <td>{datos.pagoFactura}</td>
              <td>{datos.cargoFactura}</td>
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
          )}  */}
        </table>
      </div>
    </div>

    </>
  );
}

