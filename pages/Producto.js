import { useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormsProducto from '../Components/Forms/FormsProducto'
import {firebaseG} from '../firebase.BD/firebase.conf';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
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
          toast.success('🙂 Producto Agregado Sastifactoriamente!', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }); 
         }
         else{ 
           await db.collection(user.email).doc('Producto').collection('Producto').doc(currentId).update(objectProducto)
           setCurrenId("");
           toast.success('🙂 Producto Actualizado Sastifactoriamente!', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }); 
   
          }
          }catch(error){
            toast.error('🙁 Error al Agregar o Actualizar un Producto ', {
              position: "top-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
         }
      
    })
  }
  const onDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar?")) {

      firebaseG.auth().onAuthStateChanged(async (user) => {
        await db.collection(user.email).doc('Producto').collection('Producto').doc(id).delete();
        toast.success('🙂 Producto Eliminado Sastifactoriamente!', {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    })
    }
}

 
  return (
    <>
    <ToastContainer />
    <div className="table">
      <h1>Inventario Producto</h1>
     
      <FormsProducto {...{addProducto, currentId,data}}/>
      <br></br>
      <div className="grid">
      <div>
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
     
    <div >
        <table>
        <thead>
          <tr>
            <td>Producto</td>
            <td>Cantidad</td>
            <td>Precio Venta</td>
            <td>Precio Compra</td>
            <td>Descuento</td>
            <td>Proveedor</td>
            <td>Categoria</td>
            <td>Fecha</td>
            <td></td>
            <td></td>
          </tr>
          </thead>

           {data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.nombreProducto}</td>
              <td>{datos.cantidadProducto}</td>
              <td>RD${datos.precioVentaProducto}</td>
              <td>RD${datos.precioCompraProducto}</td>
              <td>%{datos.descuentoProducto}</td>
              <td>{datos.proveedorProducto}</td>
              <td>{datos.categoriaProducto}</td>
              <td>{datos.fechaProducto}</td>
              <td>
                <li>
                  <Button onClick={() => onDelete(datos.id)} variant="text" color="secondary">
                    <DeleteIcon />
                  </Button>
                </li>
                </td>
                <td>
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

