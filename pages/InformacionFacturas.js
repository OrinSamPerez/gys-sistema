import React,{useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {firebaseG} from '../BD-Firebase/firebase.conf'
import Paper from '@material-ui/core/Paper'
import DescriptionIcon from '@material-ui/icons/Description';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ModalFactura  from '../Components/modalFactura' 
import Modal from '@material-ui/core/Modal'
import SearchIcon from "@material-ui/icons/Search";
import { busquedaCliente, busquedaFecha, busquedaNoFactura} from '../Services/busqueda';
import ModalCotizacion from '../Components/modalCotizacion'
const db = firebaseG.firestore();
const auth = firebaseG.auth()
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
 
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 424,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function InformacionFacturas() {
  //Hook referentes a los getFacturas
  const [facturaADMIN,setFacturaADMIN] = useState([])
  const [facturasPagadas, setFacturasPagadas] = useState([])
  const [facturasNoPagadas, setFacturasNoPagadas] = useState([])
  const [idFactura, seIdFactura ] = useState('')
  const [openM, setOpen] = useState(false)

  const [buscarAllFacturas,setBuscarAllFacturas] = useState([])
  const [buscarXPFacturas,setBuscarXPFacturas] = useState([])
  const [buscarPFacturas,setBuscarPFacturas] = useState([])
  const [cotizaciones, setCotizaciones]=useState([])
  const [idCotizacion, setIDCotizaciones]=useState('')
  const [openCotizacion, setOpenCotizacion] =useState(false)  //Facturas de admin
if(facturaADMIN.length === 0){
  auth.onAuthStateChanged(user =>{
    if(user != null){
      const cotizacione=[];
      db.collection(user.email).doc('Clientes-Facturas').collection('Clientes-Facturas').onSnapshot(cotizacion=>{
        cotizacion.forEach(cotizar =>{
          cotizacione.push({...cotizar.data(),id:cotizar.id})
        })
        setCotizaciones(cotizacione)
      })
      db.collection(user.email).doc('Factura').collection('Factura').orderBy('fechaActual', 'desc').onSnapshot(documents =>{
        const docs = []
        const pagadas = [];
        const noPagadas = [];

        documents.forEach(doc =>{
          docs.push({...doc.data(),id:doc.id})
         if( doc.data().estadoPago === 'Pagada'){ pagadas.push({...doc.data(),id:doc.id})}
         else( noPagadas.push({...doc.data(),id:doc.id}))
        })
        setFacturaADMIN(docs)
        setFacturasPagadas(pagadas)
        setFacturasNoPagadas(noPagadas)
      })
      
    }
  })

}
const verFactura = (id) =>{
  seIdFactura(id)
  setOpen(true)
}
const verCotizacion=(id)=>{
  setIDCotizaciones(id)
  setOpenCotizacion(true)
}
  //Finalizacion
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //Buscar todas las facturas
  const buscarTodas = (e)=>{
    const resultadoBusquedaNoF = busquedaNoFactura(facturaADMIN, e.target.value)
      setBuscarAllFacturas(resultadoBusquedaNoF)
  }
  const buscarP = (e)=>{
    const resultadoBusquedaNoF = busquedaNoFactura(facturasPagadas, e.target.value)
    setBuscarXPFacturas(resultadoBusquedaNoF)
  }
  const buscarXP = (e)=>{
    const resultadoBusquedaNoF = busquedaNoFactura(facturasNoPagadas, e.target.value)
    setBuscarPFacturas(resultadoBusquedaNoF)
  }
  const close = ()=>{
    setOpenCotizacion(false)
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Todas las facturas" {...a11yProps(0)} />
        <Tab label="Facturas pagadas" {...a11yProps(1)} />
        <Tab label="Facturas por cobrar" {...a11yProps(2)} />
        <Tab label="Cotizaciones" {...a11yProps(3)} />
      </Tabs>
      <TabPanel  value={value} index={0}>
        <h2>Todas las facturas</h2>
        <div >
      <label className="buscar">
      <input id="search" type="text"  placeholder="Buscar" onChange={buscarTodas} />
     <button className="button"> <i className="icon">  <SearchIcon /></i></button>
      </label>
      </div>
        {buscarAllFacturas.length === 0?
            facturaADMIN.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
            <h3>No hay factura</h3>
          </Paper>
            :facturaADMIN.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'pointer'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h4>No. Factura: <small>{doc.numeroFactura}</small> Cliente: <small> {doc.nombreClienteFactura}  </small>     Fecha:<small> {doc.fechaActual}</small></h4>
              <div className="der">
              <button id="bfac" variant="outlined"  color="primary">
                {doc.estadoPago}
              </button>
              </div>
          </Paper>
            
            )
          : buscarAllFacturas.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'pointer'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h4>No. Factura: <small>{doc.numeroFactura}</small> Cliente: <small> {doc.nombreClienteFactura}  </small>     Fecha:<small> {doc.fechaActual}</small></h4>
              <div className="der">
              <button id="bfac" variant="outlined"  color="primary">
                {doc.estadoPago}
              </button>
              </div>
          </Paper>
            
            )}

      </TabPanel>
      <TabPanel value={value} index={1}>
      <h2>Facturas Pagadas</h2>
      <div >
      <label className="buscar">
      <input id="search" type="text"  placeholder="Buscar" onChange={buscarP} />
     <button className="button"> <i className="icon">  <SearchIcon /></i></button>
      </label>
      </div>
        {buscarXPFacturas.length === 0?
          facturasPagadas.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
            <h3>No hay factura</h3>
          </Paper>
            :facturasPagadas.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'pointer'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h4>No. Factura: <small>{doc.numeroFactura}</small> Cliente: <small> {doc.nombreClienteFactura}  </small>     Fecha:<small> {doc.fechaActual}</small></h4>
        
              <div className="der">
              <button id="bfacg" variant="outlined" color="primary">
                {doc.estadoPago}
              </button>
              </div>
          </Paper>
            
            ):buscarXPFacturas.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
            <h3>No hay factura</h3>
          </Paper>
            :buscarXPFacturas.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'pointer'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h4>No. Factura: <small>{doc.numeroFactura}</small> Cliente: <small> {doc.nombreClienteFactura}  </small>     Fecha:<small> {doc.fechaActual}</small></h4>
        
              <div className="der">
              <button id="bfacg" variant="outlined" color="primary">
                {doc.estadoPago}
              </button>
              </div>
          </Paper>
            
            )
          }
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Facturas por cobrar</h2>
        <div >
      <label className="buscar">
      <input id="search" type="text"  placeholder="Buscar" onChange={buscarXP} />
     <button className="button"> <i className="icon">  <SearchIcon /></i></button>
      </label>
      </div>
        {buscarPFacturas.length === 0?
          facturasNoPagadas.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
            <h3>No hay factura</h3>
          </Paper>
            :facturasNoPagadas.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'pointer'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h4>No. Factura: <small>{doc.numeroFactura}</small> Cliente: <small> {doc.nombreClienteFactura}  </small>     Fecha:<small> {doc.fechaActual}</small></h4>

              <div className="der">
              <button id="bfacr" variant="outlined" color="primary">
              {doc.estadoPago}
                </button>
              </div>
              
              {/* //{console.log(doc)} */}
          </Paper>
            
            )
            :buscarPFacturas.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
            <h3>No hay factura</h3>
          </Paper>
            :buscarPFacturas.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'pointer'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h4>No. Factura: <small>{doc.numeroFactura}</small> Cliente: <small> {doc.nombreClienteFactura}  </small>     Fecha:<small> {doc.fechaActual}</small></h4>

              <div className="der">
              <button id="bfacr" variant="outlined" color="primary">
              {doc.estadoPago}
                </button>
              </div>
              
              {/* //{console.log(doc)} */}
          </Paper>
            
            )
          }
      </TabPanel>
      <TabPanel value={value} index={3}>
      <h2>Cotizaciones</h2>
      <div >
            <label className="buscar">
                  <input id="search" type="text"  placeholder="Buscar" onChange={buscarXP} />
                  <button className="button"> <i className="icon">  <SearchIcon /></i></button>
            </label>
      </div>
      {
        cotizaciones.length === 0?
          <h1>No existe cotizaiones</h1>
          :cotizaciones.map(doc=>
            <Paper onClick={()=>verCotizacion(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'pointer'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h4>No. Factura: <small>{doc.id}</small> Cliente: <small> {doc.email}  </small>     Fecha:<small> {doc.diaActual}</small></h4>

              <div className="der">
              <button id="bfacr" variant="outlined" color="primary">
              {doc.estadoPago}
                </button>
              </div>
              
              {/* //{console.log(doc)} */}
          </Paper>
            )
      }
      </TabPanel>
      <Modal
        open={openM}
        >
        <>
        
          <Button id="mover" onClick={()=>setOpen(false)} variant="contained" >
              Cerrar
          </Button>
          
          <div className="colorfondomodal"><ModalFactura  idFacturas={idFactura} close={close} /></div>
        
        </>
      </Modal>
      <Modal
        open={openCotizacion}
        >
        <>
        
          <Button id="mover" onClick={()=>setOpenCotizacion(false)} variant="contained" >
              Cerrar
          </Button>
          <div className="colorfondomodal"><ModalCotizacion  close={close} idFacturas={idCotizacion} /></div>
        
        </>
      </Modal>
      <style jsx>{`
        h2{text-align:center;}
      `}</style>
    </div>
  );
}
