import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormsProducto from "../Components/Forms/FormsProducto";
import { firebaseG } from "../firebase.BD/firebase.conf";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui//core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {reporte} from "../Services/reporte"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const db =  firebaseG.firestore();
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          await db.collection(user.email).doc('Producto').collection('Producto').doc(objectProducto.id_Producto).set(objectProducto)
          await db.collection(user.email).doc('Stock').collection('Stock').doc(objectProducto.id_Producto).set({
            id:objectProducto.id_Producto,
            Descripcion:objectProducto.nombreProducto,
            ExistenciaInciales:objectProducto.cantidadProducto,
            Entrada:objectProducto.cantidadProducto,
            Salida_Inicial:0,
            Stock:objectProducto.cantidadProducto
          })

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
           await db.collection(user.email).doc('Stock').collection('Stock').doc(currentId).update({
   
            Descripcion:objectProducto.nombreProducto,
            ExistenciaInciales:objectProducto.cantidadProducto,
            Entrada:objectProducto.cantidadProducto,
            Salida_Inicial:0,
            Stock:objectProducto.cantidadProducto
          })

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
        await db.collection(user.email).doc('Stock').collection('Stock').doc(id).delete();
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
      <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="secondary"
              onClick={handleClick}
            >
              <GetAppIcon />
              Reportes
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                <Button>
                <SendIcon fontSize="small" />
                
                </Button>
                  
                </ListItemIcon>
                <ListItemText primary="Enviar al correo" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                <Button onClick={()=>reporte('#tProducto','Producto')}>
                <PictureAsPdfIcon fontSize="small" />
                
                </Button>
                  
                </ListItemIcon>
                <ListItemText primary="Descargar en PDF" />
              </StyledMenuItem>
              
              <StyledMenuItem>
              <ListItemIcon>
                
                <img className="img-excel" src="/excel.png" width="15px" height="15px"/>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tProducto"
                    filename="Producto"
                    sheet="tablexls"
                    buttonText="Descargar en EXCEL"/>
               
                  
                </ListItemIcon>
               
              </StyledMenuItem>
            </StyledMenu>
      </div>
    </div>
     
    <div >
        <table id="tProducto">
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
                  <Button variant="text" onClick={() => setCurrenId(datos.id_Producto)} color="primary">
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

