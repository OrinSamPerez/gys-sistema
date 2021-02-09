import "../styles/globals.css";
import "../styles/NavBar.css";
import NavBar from "../Components/NavBar";
import Head from "next/head";
import Login from "./Login";
import { firebaseG, userInfo } from "../firebase.BD/firebase.conf";
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
        <NavBar userInfo={userInfo()}>
          <Component {...pageProps} />
        </NavBar>
      ) : (
        <Login />
      )}
    </>
  );
}
export default MyApp;
