import '../styles/globals.css'
import '../styles/NavBar.css';
import NavBar from '../Components/NavBar'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <>
       <Head>
          <title>Sistema de Gestion</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
      
    </>

  )
}

export default MyApp
