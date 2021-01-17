import Drawer from "@material-ui/core/Drawer";
import Link from "next/link";
import AppBarNav from './AppBarNav';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SettingsIcon from '@material-ui/icons/Settings';
export default function NavBar({children}) {
  return (
    <>
    <AppBarNav />
    <Drawer  variant="permanent" anchor="left" color="primary">
      <ul className="nav-main">

        <div className="Logo">
            <img src="https://www.flaticon.es/svg/vstatic/svg/2897/2897743.svg?token=exp=1610909471~hmac=c19c98f63e80478be05e99c969e79cec"/>
            <h1>SGIF</h1>
        </div>
        <li>
        <Link href="/">
            <div className="imagenes"><HomeIcon/>  <a>Casa</a></div>
           
          </Link>
        </li>
        <li>
        
          <Link href="/Factura/Factura">
            <div className="imagenes"><DescriptionIcon/>  <a>Factura</a></div>
          </Link>
        </li>
        <li>
       
        <Link href="/Producto/Producto">
          <div className="imagenes"><OpenInBrowserIcon/>  <a>Producto</a></div>
        </Link>

        </li>
        <li>
          <Link href="/Cliente/Cliente">
            <div className="imagenes"><SupervisorAccountIcon/>  <a>Cliente</a></div>
          </Link>
        </li>
        <li>
          <Link href="/Provedor/Provedor">
            <div className="imagenes"><LocalShippingIcon/>  <a>Provedor</a></div>    
          </Link>
        </li>
        <li>
          <Link href="/Informes/Informes">
            <div className="imagenes"><ShowChartIcon />  <a>Informes</a></div>
          </Link>
        </li>
        <li>
          <Link href="/Stock/Stock">
            <div className="imagenes"><ImportContactsIcon/>  <a>Stock</a></div>
          </Link>
        </li>
        <li>
          <Link href="/Configuracion/Configuracion">
            <div className="imagenes"><SettingsIcon/>  <a>Configuracion</a></div>
          </Link>
        </li>
      </ul>
    </Drawer>
      <main className="contaniner-principal">
        {children}
      </main>
    </>
  );
}
