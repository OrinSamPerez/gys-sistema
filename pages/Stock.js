import {useState} from 'react'
import {firebaseG} from '../firebase.BD/firebase.conf'
import SearchIcon from "@material-ui/icons/Search";
import 'jspdf-autotable';
import {reporte} from "../Services/reporte"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
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
const db = firebaseG.firestore()
const auth = firebaseG.auth()
export default function Stock(){
const [anchorEl, setAnchorEl] = useState(null);
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
const handleClose = () => {
    setAnchorEl(null);
  };
const [datosStock, setDatosStock] = useState([])
 auth.onAuthStateChanged(user =>{
     if(user != null){
         db.collection(user.email).doc('Stock').collection('Stock').orderBy('id', 'asc').onSnapshot(docus =>{
             const docs = []
             docus.forEach(doc =>{
                 docs.push({...doc.data(),id:doc.id})
             })
             setDatosStock(docs)

         })
     }
 })
 
    return(
        <>
        <h1 className="centro">Stock</h1>
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
               <Button onClick={()=>reporte('#tStock','Stock')}>
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
                    table="tStock"
                    filename="Stock"
                    sheet="tablexls"
                    buttonText="Descargar en EXCEL"/>
               
                  
                </ListItemIcon>
               
              </StyledMenuItem>
            </StyledMenu>
      </div>
    </div>
        <table id="tStock">
            <thead>
                <tr>
                    <td>Codigo de Producto</td>
                    <td>Descripcion</td>
                    <td>Existencia Iniciales</td>
                    <td>Entrada</td>
                    <td>Salida</td>
                    <td>Stock</td>
                </tr>
            </thead>
            <tbody>
                {
                    datosStock.length === 0? 
                    <td> </td>
                    :datosStock.map(row=>
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.Descripcion}</td>
                        <td>{row.ExistenciaInciales}</td>
                        <td>{row.Entrada}</td>
                        <td> {row.Salida_Inicial}</td>
                        <td>{row.Stock}</td>
                    </tr>
                    )

                                     
                }
            </tbody>
        </table>

        </>

  
    )
}