import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormsProducto from "../Components/Forms/FormsProducto";
import { firebaseG } from "../BD-Firebase/firebase.conf";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import {busquedaProducto, busquedaId, busquedaFecha} from '../Services/busqueda'
import BotonReporte from '../Components/BotonReporte'
import {addBDStock, borrarBD, addBDProducto} from '../BD-Firebase/CRUD'

const db =  firebaseG.firestore();
const fecha = new Date
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [datosBuscar,setDatosBuscar] = useState([])
  const [ currentId, setCurrenId] = useState("")
  const [ imageId, setImage] = useState(null)

  const getData =()=>{
   firebaseG.auth().onAuthStateChanged(async (user) => {
    if(user != null){
      db.collection(user.email).doc('Producto').collection('Producto').orderBy("fechaProducto", "desc").onSnapshot((querySnapshot)=>{
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

  const addProducto = async  (objectoProducto)=>{ 
    addBDProducto('Producto', currentId,objectoProducto, "🙂 Producto Agregado Sastifactoriamente!",'🙂 Producto Agregado Sastifactoriamente!', ' Error al Agregar o Actualizar un Producto')
    addBDStock('Stock', currentId,objectoProducto)

    }
  const onDelete = (id,nombreProducto, cantidadProducto , precioVentaProducto, precioCompraProducto,descuentoProducto, proveedorProducto, categoriaProducto, fechaProducto) => {
    const objetoEliminar ={id,nombreProducto, cantidadProducto , precioVentaProducto, precioCompraProducto,descuentoProducto, proveedorProducto, categoriaProducto, fechaProducto}
    borrarBD('Producto',id, objetoEliminar, '🙂 Producto Eliminado Sastifactoriamente!')
    borrarBD('Stock',id, objetoEliminar)
  }

const buscar = (e)=>{
  const resultadoBusquedaId = busquedaId(data, e.target.value)
  const resultadoDescripcion = busquedaProducto(data, e.target.value)
  const resultadoFecha = busquedaFecha(data, e.target.value)
  if(resultadoBusquedaId.length === 5 && resultadoDescripcion === 5){
    setDatosBuscar(resultadoBusquedaId)
  }
  if(resultadoBusquedaId.length != 0){
    setDatosBuscar(resultadoBusquedaId)
  }
  if(resultadoDescripcion.length != 0){
    setDatosBuscar(resultadoDescripcion)
  }
  if(resultadoFecha.length != 0){
    setDatosBuscar(resultadoFecha)
  }
}
 const editar = (id, imageProducto)=>{
  setCurrenId(id)
   setImage(imageProducto)
 }


  return (
    <>
    <BotonReporte title="Productos" buscar={buscar} idTable={'#tProducto'}  idTableExcel={'tProducto'} form={ <FormsProducto {...{addProducto, currentId,data}}/>}/>
    <div className="scroll" >
        <table id="tProducto">
        <thead>
          <tr>
            <td>ID</td>
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

           {datosBuscar.length === 0?
             data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.id}</td>
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
                  <Button onClick={() => onDelete(datos.id, datos.nombreProducto, datos.cantidadProducto , datos.precioVentaProducto, datos.precioCompraProducto,datos.descuentoProducto, datos.proveedorProducto, datos.categoriaProducto, datos.fechaProducto  )} variant="text" color="ff0000">
                  <DeleteIcon style={{color:'ff0000', backGround:'ff0000'}} />
                  </Button>
                </li>
                </td>
                <td>
                <li>
                  <Button variant="text" onClick={()=>editar(datos.id, datos.imageProducto)} color="primary">
                    <EditIcon />
                  </Button>
                </li>
              </td>
            </tr>)
          )
          :
          datosBuscar.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.id}</td>
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
                  <Button onClick={() => onDelete(datos.id, datos.nombreProducto, datos.cantidadProducto , datos.precioVentaProducto, datos.precioCompraProducto,datos.descuentoProducto, datos.proveedorProducto, datos.categoriaProducto, datos.fechaProducto)} variant="text" color="secondary">
                    <DeleteIcon />
                  </Button>
                </li>
                </td>
                <td>
                <li>
                  <Button variant="text" onClick={()=>editar(datos.id, datos.imageProducto)} color="primary">
                    <EditIcon />
                  </Button>
                </li>
              </td>
            </tr>)
          )}  
        </table>
      </div>


    </>
  );
}

