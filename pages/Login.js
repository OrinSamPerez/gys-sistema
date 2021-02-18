import { useState } from "react";
import Button from "@material-ui/core/Button";
import Styles from "../styles/Login.module.css";
import { loginSingIn,loginWithEmail,loginCollection, firebaseG } from "../firebase.BD/firebase.conf";
import StylesRegistro from "../styles/Registro.module.css";
import {validadorLogin} from "../Services/validadorLogin";
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    const direccion= document.getElementById("direccion").value;

    validadorLogin(password,email, nameEmpresa, number, confPassword);
    loginCollection(email, nameEmpresa, number, typeEmpresa, direccion).then((resp) => {

    }, []);
    loginWithEmail(email, password).then((resp) => {
      console.log(resp);
    });

    
  };
  const [welcomeName, setWelcomeName]=useState('')

  const bodyRegistroEmpresa = (
    <div className={StylesRegistro.container}>
      <div className={StylesRegistro.formMainEmpresa}>
      <img src="/inventario.svg" />
      <h3>Bienvenido {welcomeName} favor rellenar lo siguientes campos </h3>
      <div>
        <label>
        RNC Empresa
          <input
            id="rncEmpresa"
            required
            type="text"
            placeholder="Rnc empresa "
          />
          </label>
          <label>
          NCF Empresa
            <input
              id="ncfEmpresa"
              required
              type="text"
              placeholder="NCF empresa "
            />
          </label>
      </div>
      <div>
          <label>
        Tipo de empresa
          <select>
            <option value="sectorprimario" >Sector primario</option>
            <option value="sectorsecundario" >Sector secundario(Industrial)</option>
            <option value="sectorterciario" >sector terciario (sector servicios)</option>
          </select>
        </label>
      </div>

      <div>
        <div>
          <label>
        Formas de pago
          <FormControlLabel control={<Checkbox name="Pago en efectivo" color="primary" />} label="Pago en efectivo" />
          <FormControlLabel control={<Checkbox name="Pago con tarjeta de crédito o débito" color="primary" />} label="Pago con tarjeta de crédito o débito" />
          <FormControlLabel control={<Checkbox name="Pago por transferencia bancaria" color="primary" />} label="Pago por transferencia bancaria" />
        
        </label>
        </div>
        <div>
          <label>
        Meotodos de pago que aceptaras
          <FormControlLabel control={<Checkbox name="(PUE)Pago en una sola exhibición" color="primary" />} label="(PUE)Pago en una sola exhibición" />
          <FormControlLabel control={<Checkbox name="(PPD)Pago en parcialidades o diferido" color="primary" />} label="(PPD)Pago en parcialidades o diferido" />
        
        </label>
        </div>
      </div>
      
      </div>
      <label></label>
    </div>
  )
  const validaccion = async (e) => {
    e.preventDefault();
    const nameEmpresa = document.getElementById("nameEmpresa").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password-registro").value;
    const confPassword = document.getElementById("confPassword").value;
    const correoEmail = validadorLogin(password,email, nameEmpresa, confPassword);
    setWelcomeName(nameEmpresa)
    if(correoEmail===''){
      console.log('Espere')
    }
    else{
      
      setBody(bodyRegistroEmpresa)
    }
  //   if (correoEmail === ''){
  //     console.log('Espere')
  //   }
  //   else{
  //     const actionCodeSettings = {
  //       url:'http://localhost:3000/?email='+correoEmail,
  //     handleCodeInApp: true,
  //     iOS: {
  //       bundleId: 'sistemagestion.page.link'
  //     },
  //     android: {
  //       packageName: 'sistemagestion.page.link',
  //       installApp: true,
  //       minimumVersion: '12'
  //     },
  //      dynamicLinkDomain: 'sistemagestion.page.link'
  //       }
  //     firebaseG.auth().sendSignInLinkToEmail(email, actionCodeSettings).then((resp)=>{
  //       console.log(resp)
  //     }) 
  //     .catch((error) => {
  //       console.log(error)
  //       // ...
  //     });
    
  // }
}
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
                id="dirrecion"
                required
                placeholder="Ingresar la direccion "
              />
            </label>
          </div>
          <div>
            <label>
              <input
                id="password-registro"
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
         <Button onClick={validaccion} variant="contained" color="inherent">
           Siguiente
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
//   <Button onClick={registroInputs} variant="contained" color="default">
//   <h2 className={StylesRegistro.seccion}>Registrarse</h2>
// </Button>
  const [body, setBody] = useState(bodyLogin);

  return (
    <>

    <div className="fondo-login" >
        {body}
    </div>
    </>

  );
}
