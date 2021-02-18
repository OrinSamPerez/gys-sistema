import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormsFacturacion from '../Components/Forms/FormsFacturacion'
import {firebaseG} from '../firebase.BD/firebase.conf'
import DeleteIcon from '@material-ui/icons/Delete';
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
    <div className="table">
      <h1>Factura</h1>
      
      <FormsFacturacion {...{addFactura, currentId, data,TOTAL, SUBTOTAL,ITBIS}}/>
      <div>
        <table>
        <tr>
          <td>Cantidad</td>
          <td>Producto</td>
          <td>Precio</td>
          <td>SubTotal</td>
          <td>ITBIS</td>
          <td>Descuento</td>
          <td>Total</td>
        </tr>
          {data.map(datos =>
            (<tr key={datos.id } >
              <td># {datos.cantidad}</td>
              <td>{datos.producto}</td>
              <td>RD$ {datos.precio}</td>
              <td>RD$ {datos.subTotal}</td>
              <td>RD$ {datos.itbis}</td>
              <td>% {datos.descuento}</td>
              <td>RD$ {datos.total}</td>
              <td>
                <li>
                  <Button onClick={() => onDelete(datos.id)} variant="text" color="secondary">
                    <DeleteIcon />
                  </Button>
                </li>
              </td>
            </tr>)
          )}  
          <div className="flexionar">
            <h3>SUBTOTAL <h2> RD${SUBTOTAL} </h2> </h3>
            <h3>ITBIS <h2> RD${ITBIS} </h2> </h3>
            <h3>TOTAL <h2> RD${TOTAL} </h2> </h3>
          </div>
        </table>
      </div>
    </div>
      <style jsx>{`
      .flexionar{
        display:flex;
      }
      `}</style>
    </>
  );
}

