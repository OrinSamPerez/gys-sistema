import {firebaseG} from '../firebase.BD/firebase.conf'
import FormsClientes from '../Components/Forms/FormsCliente';
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {reporte} from "../Services/reporte"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const db = firebaseG.firestore();
export default function  Cliente() {
  const [data, setData] = useState([]);
  const [ currentId, setCurrenId] = useState("")
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 
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
 
 
 const getData =()=>{

   firebaseG.auth().onAuthStateChanged(async (user) => {
    db.collection(user.email).doc('Clientes').collection('Clientes').orderBy("nombreCliente", "desc").onSnapshot((querySnapshot)=>{
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

  const addClientes=(objectClientes)=>{
    firebaseG.auth().onAuthStateChanged(async (user) =>{
      try{
      if(currentId === ""){
     await db.collection(user.email).doc('Clientes').collection('Clientes').doc().set(objectClientes)
     toast.success('🙂 Cliente Agregado Sastifactoriamente!', {
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
        await db.collection(user.email).doc('Clientes').collection('Clientes').doc(currentId).update(objectClientes)
        setCurrenId("");
        toast.success('🙂 Cliente Actualizado Sastifactoriamente!', {
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
      toast.error('🙁 Error al Agregar o Actualizar un Cliente ', {
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
        await db.collection(user.email).doc('Clientes').collection('Clientes').doc(id).delete();
        toast.success('🙂 Cliente Eliminado Sastifactoriamente!', {
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
      <h1>Clientes</h1>
      <FormsClientes {...{addClientes, currentId}}/>
      <br></br>
      <div className="grid">
      
      <div >
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
               <Button onClick={()=>reporte('#tCliente','Cliente')}>
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
                    table="tCliente"
                    filename="Cliente"
                    sheet="tablexls"
                    buttonText="Descargar en EXCEL"/>
               
                  
                </ListItemIcon>
               
              </StyledMenuItem>
            </StyledMenu>
      </div>
    </div>
     
        
        
      
      
      <div className="scroll">
        <table id="tCliente">
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Direccion</td>
            <td>Telefono</td>
            <td></td>
            
          </tr>
          
          </thead>
         
         
          
          {data.map(datos =>
            (<tr key={datos.id } >
              <td >{datos.nombreCliente}</td>
              <td>{datos.correoCliente}</td>
              <td>{datos.direccionCliente}</td>
              <td>{datos.telefonoCliente}</td>
              
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
