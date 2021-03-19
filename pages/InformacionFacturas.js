import React,{useState} from 'react'
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
  const [dataCliente, setDataCliente] = useState([])
  //Extrayendo todos los datos facturas

  //Facturas de admin
  auth.onAuthStateChanged(user =>{
    if(user != null){
      db.collection(user.email).doc('Factura').collection('Factura').orderBy('fechaActual', 'desc').onSnapshot(documents =>{
        const docs = []
        documents.forEach(doc =>{
          docs.push({...doc.data(),id:doc.id})
        })
        setFacturaADMIN(docs)
      })
      db.collection(user.email).doc('Clientes').collection('Clientes').onSnapshot(documents =>{
        const docsCliente = [];
        documents.forEach(doc=>{
          docsCliente.push({...doc.data(), id:doc.id})
        })
        setDataCliente(docsCliente)
      })
    }
  })

  //Facturas de Clientes
  auth.onAuthStateChanged(user =>{
    if(user != null){
      db.collection(user.email).doc('Clientes-Facturas').collection('Clientes-Facturas').onSnapshot(documents =>{
        const docs = []
        documents.forEach(doc =>{
          docs.push({...doc.data(),id:doc.id})
        })
        //console.log(docs)
      })
    }
  })
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
        <Tab label="Clientes Registrados" {...a11yProps(0)} />
        <Tab label="Todas las facturas" {...a11yProps(1)} />
        <Tab label="Facturas pagadas" {...a11yProps(2)} />
        <Tab label="Facturas por cobrar" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <h2>Clientes Registrados</h2>
        {
          dataCliente.length === 0? <h3>No existen clientes</h3>
          :dataCliente.map(row=>
            <div>
              <span>{row.nombreCliente}</span>
              <span>{row.id}</span>
            </div>
          )
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Todas las facturas</h2>
          {
            facturaADMIN.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
          </Paper>
            :facturaADMIN.map(doc =>
           <Paper title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'grab'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h3>Cliente:{doc.nombreClienteFactura}</h3>
              <h3>Fecha:{doc.fechaActual}</h3>
              <Button variant="outlined" color="primary">
                {doc.estadoPago}
              </Button>
              
              {/* //{console.log(doc)} */}
          </Paper>
            
            )
          }
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Facturas pagadas</h2>
        {
            facturaADMIN.length === 0?
           <Paper style={{padding:10, marginLeft:'auto'}} elevation={3}>
            <Avatar>
                <DescriptionIcon/>
            </Avatar>
          </Paper>
            :facturaADMIN.map(doc =>
           <Paper title="Ver detalles de la factura" style={{padding:10, display:'flex', width:700, cursor:'grab'}} elevation={3}>
              <Avatar>
                <DescriptionIcon/>
              </Avatar>
              <h3>Cliente:{doc.nombreClienteFactura}</h3>
              <h3>Fecha:{doc.fechaActual}</h3>
              <Button variant="outlined" color="primary">
                {doc.estadoPago}
              </Button>
              
              {/* //{console.log(doc)} */}
          </Paper>
            
            )
          }
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>Facturas por cobrar</h2>
      </TabPanel>
      <style jsx>{`
        h2{text-align:center;}
      `}</style>
    </div>
  );
}
