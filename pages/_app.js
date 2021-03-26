import "../styles/globals.css";
import "../styles/NavBar.css";
import "../styles/table.css";
import "../styles/form.css";
import "../styles/home.css";
import "../styles/factura.css";
import "../styles/informes.css";
import "../styles/modalFacturas.css"
import NavBar from "../Components/NavBar";
import Head from "next/head";
import Login from "./Login";
import EmailVerifcado from '../Components/EmailVerifcado'
import { firebaseG, userInfo } from "../BD-Firebase/firebase.conf";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const [userName, setUserName] = useState(null);
  return (
    <>
      <Head>
        <title>Sistema de Gestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {firebaseG.auth().onAuthStateChanged((user) => setUserName(user))}

      {userName ? (
        userName.emailVerified === true?
        <NavBar userInfo={userInfo()}>
          <Component {...pageProps} />
        </NavBar>
        :<EmailVerifcado />
      ) : (
        <Login />
      )}
    </>
  );
}
export default MyApp;
