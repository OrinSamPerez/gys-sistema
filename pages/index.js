import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from '../Components/NavBar'
export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Sistema de Gestion</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <NavBar />
        </main>
      </div>
    </>
  );
}
