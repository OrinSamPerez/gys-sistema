import {enviarDatoProveedor} from '../../firebase.BD/ProvedorDB';
import { useState, useEffect } from "react";
import * as React from "react";
import {  listenData } from "../../firebase.BD/ProvedorDB";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import Modal from "@material-ui/core/Modal";
// import {FormsProveedor} from './FormsProveedor'
import { TableContainer, TableCell ,TableHead,Table, TableRow, TableBody, ButtonGroup, Fab } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Provedor() {
  const [open, setModal] = useState(false);
  const [ rows, setRows ] = useState([ ]);
  
   useEffect(()=>{
    // getProveedor().then(setRows) 
    listenData((newData)=>{setRows(newData)})
 
  },[])
  const openModal = () => {
    setModal(true)
  };
  const closeModal =()=>{
    setModal(false)
  }
  
  const search = ()=>{
    const valueSearch =  document.getElementById('search').value
    const found = rows.indexOf(valueSearch);

    console.log(rows)
    console.log(found)
  }
const proveedorInputs = () => {
  const nombreProveedor = document.getElementById("nombreProveedor").value;
  const dirrecion = document.getElementById("dirrecion").value;
  const cargoRepresentante = document.getElementById("cargoRepresentante").value;
  const telefono = document.getElementById("telefono").value;
  const emailProveedor = document.getElementById("email").value;
  const terminosPago = document.getElementById("terminosPago").value;
  const notaProveedor = document.getElementById("notaProveedor").value;
  enviarDatoProveedor(
    emailProveedor,
    terminosPago,
    notaProveedor,
    telefono,
    dirrecion,
    cargoRepresentante,
    nombreProveedor
  );
  setModal(false)
};
const deleteFila = (e)=>{
  console.log(e.target.dataset.id)
}
const FormsProveedor = (
  <form className="form-modal">
    <h1>Añadir proveedor</h1>
    <div>
      <label>
        <input
          type="text"
          id="nombreProveedor"
          placeholder="Nombre del proveedor"
          required
        />
      </label>
      <label>
        <input
          type="text"
          id="terminosPago"
          placeholder="Terminos de pago"
          required
        />
      </label>
    </div>
    <div>
      <label>
        <input
          type="text"
          id="dirrecion"
          placeholder="Dirrecion del proveedor"
          required
        />
      </label>
      <label>
        <input
          type="text"
          id="cargoRepresentante"
          placeholder="Cargo del Representante"
          required
        />
      </label>
    </div>
    <div>
      <label>
        <input type="text" id="telefono" placeholder="Telefono" required />
      </label>
      <label>
        <input type="email" id="email" placeholder="Email" required />
      </label>
    </div>

    <div>
      <textarea id="notaProveedor" placeholder="Añadir nota..."></textarea>
    </div>
    <div>
      <Button onClick={closeModal} variant="contained" color="secondary">
        Cancelar
      </Button>
      &nbsp; &nbsp;
      <Button
        variant="contained"
        onClick={proveedorInputs}
        onKeyPress={proveedorInputs}
        color="primary"
      >
        Añadir
      </Button>
    </div>
  </form>
);

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
      <div>
        <input id="search" placeholder="Buscar en tabla"/>
        <Button onClick={search} variant="text" color="default">
          <Fab color="inherit" aria-label="">
            buscar
          </Fab>
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
          {rows.lenght ===0?<h1>No tiene datos, registrados</h1> :(rows.map((row) => (
            <TableRow key={row.nombreProveedor}>
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
                  <button data-id={row.telefono} onClick={deleteFila}  >
                    <DeleteIcon color="secondary"/>
                  </button>
                  
              </TableCell>
            </TableRow>
          )))}
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
    </Modal>
    </>
  );
}
