import { useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormsProducto from '../Components/Forms/FormsProducto'
import {firebaseG} from '../firebase.BD/firebase.conf';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const db =  firebaseG.firestore();
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")

  const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    db.collection(user.email).doc('Producto').collection('Producto').orderBy("fechaProducto", "desc").onSnapshot((querySnapshot)=>{
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
  const addProducto =  (objectProducto)=>{
    firebaseG.auth().onAuthStateChanged(async (user) => {
      try{
        if(currentId === ""){
          await db.collection(user.email).doc('Producto').collection('Producto').doc().set(objectProducto)
           
         }
         else{ 
           await db.collection(user.email).doc('Producto').collection('Producto').doc(currentId).update(objectProducto)
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
        await db.collection(user.email).doc('Producto').collection('Producto').doc(id).delete();
    })
    }
}

 
  return (
    <>
    <div className="table">
      <h1>Inventario Producto</h1>
      <div className="center-table">
        <Button variant="contained" color="secondary">
          Descargar tabla
          <GetAppIcon />
        </Button>
        <input id="search"   placeholder="Buscar en tabla"/>
        <Button variant="text" color="default">
          
        </Button>
      </div>
      <FormsProducto {...{addProducto, currentId,data}}/>
      <div>
        <table>
          <tr>
            <td>Producto</td>
            <td>Cantidad</td>
            <td>Proveedor</td>
            <td>Categoria</td>
            <td>Fecha</td>
          </tr>
           {data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.nombreProducto}</td>
              <td>{datos.cantidadProducto}</td>
              <td>{datos.proveedorProducto}</td>
              <td>{datos.categoriaProducto}</td>
              <td>{datos.fechaProducto}</td>
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

