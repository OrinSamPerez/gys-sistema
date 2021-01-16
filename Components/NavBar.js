import Drawer from "@material-ui/core/Drawer";
import Link from "next/link";
import AppBarNav from './AppBarNav';
export default function NavBar({children}) {
  return (
    <>
    <AppBarNav />
    <Drawer  variant="permanent" anchor="left" color="primary">
      <ul className="nav-main">

        <div className="Logo">
            <img src="https://www.flaticon.es/svg/vstatic/svg/2897/2897745.svg?token=exp=1610750718~hmac=52266b035fa5c9277e7f5546cd23d55b"/>
            <h1>SGIF</h1>
        </div>
        <li>
        <img src="https://www.flaticon.es/svg/vstatic/svg/25/25694.svg?token=exp=1610748697~hmac=3437445e313696bbffad4fdb0ab1d2b0"/>
          <Link href="/">
            <a>Casa</a>
          </Link>
        </li>
        <li>
        <img src="https://www.flaticon.es/svg/vstatic/svg/85/85966.svg?token=exp=1610748751~hmac=9f70d2d9c280734b81a38f572602345a"/>
          <Link href="/Factura/Factura">
            <a>Factura</a>
          </Link>
        </li>
        <li>
        <img src="https://www.flaticon.es/svg/vstatic/svg/3144/3144448.svg?token=exp=1610749055~hmac=8cc450c50100bfe73d82f1bd5d0e629d"/>
          <Link href="/Producto/Producto">
            <a>Producto</a>
          </Link>
        </li>
        <li>
        <img src="https://www.flaticon.es/svg/vstatic/svg/3126/3126649.svg?token=exp=1610749118~hmac=eeb71004dd8d08f0a1de58ef1a32246c"/>
          <Link href="/Cliente/Cliente">
            <a>Cliente</a>
          </Link>
        </li>
        <li>
          <img src="https://www.flaticon.es/svg/vstatic/svg/72/72109.svg?token=exp=1610749169~hmac=fa6c38dd9a50e281a35db80f1a330258" />
          <Link href="/Provedor/Provedor">
            <a>Provedor</a>
          </Link>
        </li>
        <li>
          <img  src="https://www.flaticon.es/svg/vstatic/svg/3094/3094851.svg?token=exp=1610749211~hmac=3e0b7f2a92febae872b2a9a385cce697"/>
          <Link href="/Informes/Informes">
            <a>Informes</a>
          </Link>
        </li>
        <li>
          <img src="https://www.flaticon.es/svg/vstatic/svg/702/702455.svg?token=exp=1610749285~hmac=7f11346e9a3d2849e4b270fedd19649c" />
          <Link href="/Stock/Stock">
            <a>Stock</a>
          </Link>
        </li>
        <li>
            <img src="https://www.flaticon.es/svg/vstatic/svg/561/561196.svg?token=exp=1610749328~hmac=8c6885cd3b1b1d915dbda79d73ebf01e"/>
          <Link href="/Configuracion/Configuracion">
            <a>Configuracion</a>
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
