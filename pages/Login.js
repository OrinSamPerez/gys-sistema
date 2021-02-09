import { useState } from "react";
import Button from "@material-ui/core/Button";
import Styles from "../styles/Login.module.css";
import Link from "next/link";
import { loginSingIn,loginWithEmail,loginCollection } from "../firebase.BD/firebase.conf";
import StylesRegistro from "../styles/Registro.module.css";
import {validadorLogin} from "../Services/validadorLogin";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function Login() {

  const cambio = () => {
    setBody(bodyRegistro);
  };
  const cambioLogin = ()=>{
      setBody(bodyLogin)
  }
  const singIn = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    loginSingIn(email, password).then((resp) => {

    }, []).catch(resp => console.log("error" ) );
  };

  const registroInputs = (e) => {
    e.preventDefault();
    const nameEmpresa = document.getElementById("nameEmpresa").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const typeEmpresa = document.getElementById("typeEmpresa").value;
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("confPassword").value;

    validadorLogin(password, nameEmpresa, number, confPassword);
    loginWithEmail(email, password).then((resp) => {
      console.log(resp);
    });

    loginCollection(email, nameEmpresa, number, typeEmpresa).then((resp) => {

    }, []);
  };
  const bodyLogin = (
    <div className={Styles.container}>
      <form className={Styles.formMain}>
        <div className={Styles.formInfo}>
          <img src="/inventario.svg" />
          <h1>Iniciar Session</h1>
          <div>
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
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </label>
          </div>
          <Button onClick={singIn} variant="contained" color="default">
            <h2 className={Styles.seccion}>Iniciar Session</h2>
          </Button>
          <div className={Styles.links}>
            <a onClick={cambio}>
              <span> ¡Registrate aqui!</span>
            </a>

            <Link href="/registro">
              <a>
                <span> ¿Olvidaste tu contraseña?</span>
              </a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
  const bodyRegistro = (
    <div className={StylesRegistro.container}>
      <form className={StylesRegistro.formMain}>
        <div className={StylesRegistro.formInfo}>
          <img src="/inventario.svg" />
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
              <input
                id="number"
                required
                type="text"
                placeholder="Numero telefonico "
              />
            </label>
            <label>
              <input
                type="text"
                required
                id="typeEmpresa"
                required
                placeholder="Tipo de empresa"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                id="password"
                required
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </label>
            <label>
              <input
                id="confPassword"
                required
                type="password"
                placeholder="Confirma tu contraseña"
              />
            </label>
          </div>
          <Button onClick={registroInputs} variant="contained" color="default">
            <h2 className={StylesRegistro.seccion}>Registrarse</h2>
          </Button>
          <div className={StylesRegistro.links}>
            
              <a onClick={cambioLogin}>
                <span> ¿Ya tienes una cuenta?¡Inicia Session aqui! </span>
              </a>
           
          </div>
        </div>
      </form>
    </div>
  );
  const [body, setBody] = useState(bodyLogin);

  return (
    <>

    <div className="fondo-login" >
        {body}
    </div>
    </>

  );
}
