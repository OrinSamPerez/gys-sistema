import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormsProveedor from '../Components/Forms/FormsProveedor'
import {firebaseG} from '../firebase.BD/firebase.conf'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui//core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from "@material-ui/core/Drawer";
const useStyles=makeStyles((theme)=>({
  ubicar:{textAlign:'center',
justifyAlign:'center',
alignItems:'center',
paddingLeft:'40%'

}
}))

const db =  firebaseG.firestore();
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")
const estilo = useStyles()
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
      <FormsProveedor {...{addProveedor, currentId,data}}/>
      <br></br>
      <div className="grid">
      
      <div >
      <label className="buscar">
      <input id="search" type="text"  placeholder="Buscar" />
     <button className="button"> <i className="icon">  <SearchIcon /></i></button>
      </label>
      </div>
      
      <div className="center-table">
        <Button variant="contained" color="secondary">
          Descargar tabla
          <GetAppIcon />
        </Button>
      </div>
    </div>
     
        
       
      
      
      <div className="scroll">
        <table >
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
         
         
          
          {data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.nombreProveedor}</td>
              <td>{datos.direccionProveedor}</td>
              <td>{datos.correoProveedor}</td>
              <td>{datos.telefonoProveedor}</td>
              <td>{datos.pagoProveedor}</td>
              <td>{datos.cargoProveedor}</td>
              <td>
               <td> <li>
                  <Button onClick={() => onDelete(datos.id)} variant="text" color="secondary">
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
          )} 
          
      
        </table>
      
    </div>
    </div>
    </>
  );
}

