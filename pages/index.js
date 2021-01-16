import styles from "../styles/Home.module.css";
import NavBar from '../Components/NavBar'
export default function Home() {
  return (
    <>
      <div className={styles.container}>
       
        <main className={styles.main}>
        <NavBar />
         
          Hola mundo
        </main>
      </div>
    </>
  );
}
