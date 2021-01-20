import { useState, useEffect } from "react";
import * as React from "react";
import { getProveedor } from "../../firebase.BD/ProvedorDB";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import Modal from "@material-ui/core/Modal";
import {FormsProveedor} from './FormsProveedor'
import { TableContainer, TableCell ,TableHead,Table, TableRow, TableBody, ButtonGroup } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Provedor() {
  const [open, setModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [ rows, setRows ] = useState([ ]);
  
   useEffect(()=>{
     getProveedor().then(setRows) 
 
  },[])
  const openModal = () => {
    setModal(true)
  };
  const alertDelete =()=>{

  }

  
  getProveedor()
  return (
    <>
    <div className="table">
      <h1>Proveedor</h1>
      <div className="center-table">
        <Button
          onClick={openModal}
          variant="contained"
          color="primary"
          className="button-table"
        >
          Añadir Proveedor
        </Button>
        &nbsp;
        &nbsp;
        <Button variant="contained" color="secondary">
          Descargar tabla
          <GetAppIcon />
        </Button>
      </div>

      <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead >
          <TableRow >
            <TableCell>Nombre</TableCell>
            <TableCell align="left">Dirrecion</TableCell>
            <TableCell align="left">Cargo</TableCell>
            <TableCell align="left">Telefono</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Termino de Pago</TableCell>
            <TableCell align="left">Notas</TableCell>
            <TableCell align="left">&nbsp;</TableCell>
          </TableRow>
        </TableHead>    
        <TableBody >
          {rows.map((row) => (
            <TableRow key={row.nombreProveedor}>
            {console.log(row.uId)}
              <TableCell align="left">{row.nombreProveedor}</TableCell>
              <TableCell align="left">{row.dirrecion}</TableCell>
              <TableCell align="left">{row.cargoRepresentante}</TableCell>
              <TableCell align="left">{row.telefono}</TableCell>
              <TableCell align="left">{row.emailProveedor}</TableCell>
              <TableCell align="left">{row.terminosPago}</TableCell>
              <TableCell align="left">{row.notaProveedor}</TableCell>
              <TableCell>
                  <button  data-id={row.uId} >
                    <EditIcon color="primary"/>
                  </button>
                  <button data-id={row.uId} onClick={alertDelete} >
                    <DeleteIcon color="secondary"/>
                  </button>
                  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </div>


     <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {FormsProveedor}
    </Modal>;
    </>
  );
}
