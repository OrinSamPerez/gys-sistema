import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormsProveedor from "../Components/Forms/FormsProveedor";
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
import {busquedaStock} from '../Services/busqueda'
import {reporte} from "../Services/reporte"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const useStyles=makeStyles((theme)=>({
  ubicar:{textAlign:'center',
justifyAlign:'center',
alignItems:'center',
paddingLeft:'40%'
 
}
}))
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
const db =  firebaseG.firestore();
export default function Provedor() {
  const [ data, setData ] = useState([ ])
  const [ currentId, setCurrenId] = useState("")
const [dataBuscar, setDataBuscar] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const estilo = useStyles()
  const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    if(user != null){
      db.collection(user.email).doc('Proveedor').collection('Proveedor').orderBy("nombreProveedor", "desc").onSnapshot((querySnapshot)=>{
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
  const addProveedor =  (objectProveedor)=>{
    firebaseG.auth().onAuthStateChanged(async (user) => {
      if(user != null){
        try{
          if(currentId === ""){
            await db.collection(user.email).doc('Proveedor').collection('Proveedor').doc().set(objectProveedor)
            toast.success('🙂 Proveedor Agregado Sastifactoriamente!', {
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
             await db.collection(user.email).doc('Proveedor').collection('Proveedor').doc(currentId).update(objectProveedor)
             setCurrenId("");
             toast.success('🙂 Proveedor Actualizado Sastifactoriamente!', {
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
              toast.error('🙁 Error al Agregar o Actualizar un Proveedor ', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
           }
        
      }
    })
  }
  const onDelete = (id,nombreProveedor, direccionProveedor,correoProveedor, telefonoProveedor, pagoProveedor,  cargoProveedor) => {
    if (window.confirm("¿Seguro que deseas eliminar?")) {

      firebaseG.auth().onAuthStateChanged(async (user) => {
   if(user != null){
    await db.collection(user.email).doc('Proveedor-Inactivos').collection('Proveedor-Inactivos').doc(id).set({id,nombreProveedor, direccionProveedor,correoProveedor, telefonoProveedor, pagoProveedor,  cargoProveedor});
    await db.collection(user.email).doc('Proveedor').collection('Proveedor').doc(id).delete();
    toast.success('🙂 Proveedor Eliminado Sastifactoriamente!', {
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
}
const buscar = (e)=>{
  const resultadoDescripcion = busquedaStock(data, e.target.value)
  setDataBuscar(resultadoDescripcion)
}
 
  return (
    <>
    <ToastContainer />
    <div className="table">
      <h1>Proveedor</h1>
      <FormsProveedor {...{addProveedor, currentId,data}}/>
      <br></br>
      <div className="grid">
      
      <div >
      <label className="buscar">
      <input id="search" type="text" onChange={buscar}  placeholder="Buscar" />
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
               <Button onClick={()=>reporte('#tProveedor','Proveedor')}>
                <ListItemIcon>
               
                <PictureAsPdfIcon fontSize="small" />
                
               
                  
                </ListItemIcon>
                <ListItemText primary="Descargar en PDF" />
                 </Button>
              </StyledMenuItem>
              
              <StyledMenuItem>
              <ListItemIcon>
                
                <img className="img-excel" src="/excel.png" width="15px" height="15px"/>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tProveedor"
                    filename="Proveedor"
                    sheet="tablexls"
                    buttonText="Descargar en EXCEL"/>
               
                  
                </ListItemIcon>
               
              </StyledMenuItem>
            </StyledMenu>
      </div>
    </div>
     
        
        
      
      
      <div className="scroll">
        <table id="tProveedor">
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
         
         
          
          {
            dataBuscar.length === 0?
                data.map(datos =>
                (<tr key={datos.id } >
                  <td >{datos.nombreProveedor}</td>
                  <td>{datos.direccionProveedor}</td>
                  <td>{datos.correoProveedor}</td>
                  <td>{datos.telefonoProveedor}</td>
                  <td>{datos.pagoProveedor}</td>
                  <td>{datos.cargoProveedor}</td>
                  <td>
                  <td> <li>
                      <Button onClick={() => onDelete(datos.id, datos.nombreProveedor, datos.direccionProveedor,datos.correoProveedor, datos.telefonoProveedor, datos.pagoProveedor,  datos.cargoProveedor )} variant="text" color="secondary">
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
              )
              
            :
            dataBuscar.map(datos =>
                (<tr key={datos.id } >
                  <td >{datos.nombreProveedor}</td>
                  <td>{datos.direccionProveedor}</td>
                  <td>{datos.correoProveedor}</td>
                  <td>{datos.telefonoProveedor}</td>
                  <td>{datos.pagoProveedor}</td>
                  <td>{datos.cargoProveedor}</td>
                  <td>
                  <td> <li>
                      <Button onClick={() => onDelete(datos.id, datos.nombreProveedor, datos.direccionProveedor,datos.correoProveedor, datos.telefonoProveedor, datos.pagoProveedor,  datos.cargoProveedor)} variant="text" color="secondary">
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
              )
          }
      
        </table>
      
    </div>
    </div>
    </>
  );
}

