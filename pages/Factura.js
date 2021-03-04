import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormsFacturacion from '../Components/Forms/FormsFacturacion'
import {firebaseG} from '../firebase.BD/firebase.conf'
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
const db =  firebaseG.firestore();
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")


  const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    db.collection(user.email).doc('Producto-Factura-Temporal').collection('Producto-Factura-Temporal').onSnapshot((querySnapshot)=>{
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
    console.log(objectFactura)

    firebaseG.auth().onAuthStateChanged(async (user) => {
      try{       
          await db.collection(user.email).doc('Factura').collection('Factura').doc().set(objectFactura)
          data.map(async dato=>{
              await db.collection(user.email).doc('Producto-Factura-Temporal').collection('Producto-Factura-Temporal').doc(dato.id).delete()
              })
       
         
          }
          catch(error){
            console.error(error);
         }
      
    })
  }
  const onDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar?")) {

      firebaseG.auth().onAuthStateChanged(async (user) => {
        await db.collection(user.email).doc('Producto-Factura-Temporal').collection('Producto-Factura-Temporal').doc(id).delete();
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

let TOTAL = 0;
let SUBTOTAL = 0;
let ITBIS = 0;
data.map(total=>{
   TOTAL +=  total.total
   SUBTOTAL +=  total.subTotal;
   ITBIS += total.itbis;

 })

  return (
    <>
    <ToastContainer />
    <div className="table">
      <h1>Factura</h1>
      
      <FormsFacturacion {...{addFactura, currentId, data,TOTAL, SUBTOTAL,ITBIS}}/>
      <div >
        <table >
        <thead>
        <tr>
          <td >Producto</td>
          <td >Cantidad</td>
          <td >Precio</td>
          <td >SubTotal</td>
          <td >ITBIS</td>
          <td >Descuento</td>
          <td >Total</td>
          <td></td>
        </tr>
        </thead>
          {data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.producto}</td>
              <td ># {datos.cantidad}</td>
              <td >RD$ {datos.precio}</td>
              <td >RD$ {datos.subTotal}</td>
              <td >RD$ {datos.itbis}</td>
              <td >% {datos.descuento}</td>
              <td >RD$ {datos.total}</td>
              <td>
                <li>
                  <Button onClick={() => onDelete(datos.id)} variant="text" color="secondary">
                    <DeleteIcon />
                  </Button>
                </li>
              </td>
            </tr>)
          )}  
          
        </table>
      </div>
      
    </div>
   
    <div >
         
            <h3 className="ldoiz">SUBTOTAL:  <small className="smalliz">RD${SUBTOTAL}</small> </h3> 
            <h3 className="ldoiz">+ ITBIS:  <small className="smalliz">RD${ITBIS}</small>  </h3>
            <h3 className="ldoiz">- DESCUENTO: <small className="smalliz"> RD$ </small></h3>
            <h3 className="ldoiz">TOTAL: <small className="smalliz"> RD${TOTAL} </small> </h3>
          </div>
      <style jsx>{`
      
      .ldoiz {
        text-align: left;
        font-size:13px;
        padding-left:75%;
      }
      .smalliz{
        font-size:12px;
      }
      
      `}</style>
    </>
  );
}

