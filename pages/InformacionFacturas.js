import React,{useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {firebaseG} from '../firebase.BD/firebase.conf'
import Paper from '@material-ui/core/Paper'
import DescriptionIcon from '@material-ui/icons/Description';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ModalFactura  from '../Components/modalFactura' 
import Modal from '@material-ui/core/Modal'

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
  //Extrayendo todos los datos facturas

  //Facturas de admin
  auth.onAuthStateChanged(user =>{
    if(user != null){
      db.collection(user.email).doc('Factura').collection('Factura').orderBy('fechaActual', 'desc').onSnapshot(documents =>{
        const docs = []
        const pagadas = [];
        const noPagadas = []
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

const verFactura = (id) =>{
  seIdFactura(id)
  setOpen(true)
}
  //Finalizacion
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
      </Tabs>
      <TabPanel  value={value} index={0}>
        <h2>Todas las facturas</h2>
        {
            facturaADMIN.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
                <h3>No hay factura</h3>
            </Avatar>
          </Paper>
            :facturaADMIN.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'grab'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h3>Cliente:{doc.nombreClienteFactura}</h3>
              <h3>Fecha:{doc.fechaActual}</h3>
              <Button variant="outlined" color="primary">
                {doc.estadoPago}
              </Button>
              
          </Paper>
            
            )
          }

      </TabPanel>
      <TabPanel value={value} index={1}>
      <h2>Facturas Pagadas</h2>
        {
          facturasPagadas.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
          </Paper>
            :facturasPagadas.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'grab'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h3>Cliente:{doc.nombreClienteFactura}</h3>
              <h3>Fecha:{doc.fechaActual}</h3>
              <Button variant="outlined" color="primary">
                {doc.estadoPago}
              </Button>
              
          </Paper>
            
            )
          }
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Facturas por cobrar</h2>
        {
          facturasNoPagadas.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
          </Paper>
            :facturasNoPagadas.map(doc =>
           <Paper onClick={()=>verFactura(doc.id)} title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'grab'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h3>Cliente:{doc.nombreClienteFactura}</h3>
              <h3>Fecha:{doc.fechaActual}</h3>
              <Button variant="outlined" color="primary">
                No pagada
              </Button>
              
              {/* //{console.log(doc)} */}
          </Paper>
            
            )
          }
      </TabPanel>
      <Modal
        open={openM}
        >
        <>
          <Button onClick={()=>setOpen(false)} variant="contained" color="secondary">
              Cerrar
          </Button>
        <ModalFactura  idFacturas={idFactura} />
        </>
      </Modal>
      <style jsx>{`
        h2{text-align:center;}
      `}</style>
    </div>
  );
}
