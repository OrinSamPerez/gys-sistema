import Button from "@material-ui/core/Button";
import Styles from "../../styles/Registro.module.css";
import Link from "next/link";
import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import {loginWithEmail, loginCollection} from '../../firebase.BD/firebase.conf';
import { validadorLogin } from '../../Services/validadorLogin'
export default function Registro() {
  const [open, setModal] = useState(true);

  const registroInputs = (e)=>{
    e.preventDefault();
    const nameEmpresa = document.getElementById('nameEmpresa').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const typeEmpresa = document.getElementById('typeEmpresa').value;
    const password = document.getElementById('password').value;
    const confPassword = document.getElementById('confPassword').value;
    
    validadorLogin(password, nameEmpresa,number,confPassword);
    loginWithEmail( email, password).
    then((resp)=>{
      console.log(resp)
    })
    loginCollection(email, nameEmpresa,number,typeEmpresa).
    then((resp)=>{
      setModal(false)
    })
  }
  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={Styles.container}>
        <form className={Styles.formMain}>
          <div className={Styles.formInfo}>
            <img src="https://www.flaticon.es/svg/vstatic/svg/2897/2897745.svg?token=exp=1610750718~hmac=52266b035fa5c9277e7f5546cd23d55b" />
            <h1>Registrarse aqui</h1>
            <div>
              <label>
                <input
                  id="nameEmpresa"
                  type="text"
                  required
                  placeholder="Ingresa el nombre de la empresa"
                />
              </label>
              <label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Ingresa tu email aqui"
                />
              </label>
            </div>
            <div>
              <label>
                <input id="number" required type="text" placeholder="Numero telefonico " />
              </label>
              <label>
                <input type="text"required id="typeEmpresa" required placeholder="Tipo de empresa" />
              </label>
            </div>
            <div>
              <label>
                <input id="password" required type="password" placeholder="Ingresa tu contraseña" />
              </label>
              <label>
                <input id="confPassword" required type="password" placeholder="Confirma tu contraseña" />
              </label>
             
            </div>
            <Button onClick={registroInputs} variant="contained" color="default">
              <h2 className={Styles.seccion}>Registrarse</h2>
            </Button>
            <div className={Styles.links}>
              <Link href="/">
                <a>
                  <span> ¿Ya tienes una cuenta?¡Inicia Session aqui! </span>
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
