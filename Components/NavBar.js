import {useState} from 'react'
import Drawer from "@material-ui/core/Drawer";
import Link from "next/link";
import {firebaseG} from '../BD-Firebase/firebase.conf'
import AppBarNav from './AppBarNav';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SettingsIcon from '@material-ui/icons/Settings';
import CategoryIcon from '@material-ui/icons/Category';
import NotesIcon from '@material-ui/icons/Notes';
import Modal from '@material-ui/core/Modal';
import EmpresaConf from './EmpresaConf'
const db = firebaseG.firestore()
const auth = firebaseG.auth()
export default function NavBar({children, userInfo}) {
  const [open, setOpen] = useState(false)
auth.onAuthStateChanged(async user =>{
  if(user != null){
   await db.collection(user.email).doc('datosUsuario').get().then(doc =>{
     if(doc.exists){
       doc.data().estado === false?setOpen(true)
       :setOpen(false)
     }
   })
  }
})
  return (
    <>
    
    <AppBarNav user={userInfo} />
    <Drawer  variant="permanent" anchor="left" color="primary">
      <ul className="nav-main">

        <div className="Logo">
            <img src="/inventario.svg"/>
            <h1>SGI&F</h1>
        </div>
        <li>
        <Link href="/">
            <div className="imagenes"><HomeIcon/>  <a>Casa</a></div>
            
          </Link>
        </li>
        <li>
       
        <Link href="/Categoria">
          <div className="imagenes"><CategoryIcon />  <a>Categorias</a></div>
        </Link>

        </li>
        <li>
          <Link href="/Provedor">
            <div className="imagenes"><LocalShippingIcon/>  <a>Proveedores</a></div>    
          </Link>
        </li>
        <li>
       
       <Link href="/Producto">
         <div className="imagenes"><OpenInBrowserIcon/>  <a>Producto</a></div>
       </Link>

       </li>
       <li>
          <Link href="/Cliente">
            <div className="imagenes"><SupervisorAccountIcon/>  <a>Clientes</a></div>
          </Link>
        </li>
        <li>
        
          <Link href="/Factura">
            <div className="imagenes"><DescriptionIcon/>  <a>Facturacion</a></div>
          </Link>
        </li>
        <li>
       
       <Link href="/InformacionFacturas">
         <div className="imagenes"><NotesIcon />  <a>Facturas</a></div>
       </Link>

       </li>
        <li>
          <Link href="/Stock">
            <div className="imagenes"><ImportContactsIcon/>  <a>Stock</a></div>
          </Link>
        </li>
        

       
        <li>
          <Link href="/Informes">
            <div className="imagenes"><ShowChartIcon />  <a>Informes</a></div>
          </Link>
        </li>
      
        <li>
          <Link href="/Configuracion">
            <div className="imagenes"><SettingsIcon/>  <a>Configuracion</a></div>
          </Link>
        </li>
      </ul>
    </Drawer>
      <main className="contaniner-principal">
        {children}
      </main>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <EmpresaConf/>
      </Modal>
    </>
  );
}
