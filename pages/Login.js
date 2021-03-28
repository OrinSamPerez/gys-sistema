import { useState } from "react";
import Button from "@material-ui/core/Button";
import Styles from "../styles/Login.module.css";
import { loginSingIn,loginCollection, firebaseG} from "../BD-Firebase/firebase.conf";
import StylesRegistro from "../styles/Registro.module.css";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { ToastContainer, toast } from "react-toastify";
import {correoValidador, contraseñaValidador} from '../Services/validadorConfiguracion'
import "react-toastify/dist/ReactToastify.css";
import {alertaError} from '../Components/Alertas'
import swal from 'sweetalert';
import { delBasePath } from "next/dist/next-server/lib/router/router";
export default function Login() {
  const valueInitial = { 
    nombreEmpresa:"",
    correoEmpresa:'',
    numeroEmpresa:'',
    direccionEmpresa:'',
    contraseñaEmpresa:'',
    confContraseña:'',
    rncEmpresa:'',
    ncfEmpresa:'',
    PagoEnEfectivo:'',
    PagoConTarjetaDeCréditooDébito:'',
    PUE:'',
    PPD:'',
    tipoEmpresa:'',
    imagenLogo:null,
    imagenEmpresa:null,
    estado:false,
  }


  const [values, setValues] = useState(valueInitial);
const db = firebaseG.firestore()
  const singIn = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    loginSingIn(email, password).then(result =>{ console.log(result)}).catch(()=>{  alertaError("🙁 Error al ingresar correo o contraseña") })
  }
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setValues({...values, [name]:value}) 
    if('nombreEmpresa' === name ){ values.nombreEmpresa= value;} if('correoEmpresa' === name ){ values.correoEmpresa= value;} 
    if('numeroEmpresa' === name ){ values.numeroEmpresa= value;}if('direccionEmpresa' === name ){ values.direccionEmpresa= value;}
    if('contraseñaEmpresa' === name ){ values.contraseñaEmpresa= value;} if('confContraseña' === name ){ values.confContraseña= value;} 
    if('rncEmpresa' === name ){ values.rncEmpresa= value;}if('ncfEmpresa' === name ){ values.ncfEmpresa= value;}
    if('PagoEnEfectivo' === name ){ values.PagoEnEfectivo= value;}if('PagoConTarjetaDeCréditooDébito' === name ){ values.PagoConTarjetaDeCréditooDébito= value;}
    if('PUE' === name ){ values.PUE= value;} if('PPD' === name ){ values.PPD= value;} 
    if('tipoEmpresa' === name ){ values.tipoEmpresa= value;}if('imagenLogo' === name )
    { values.imagenLogo = files[0]}
    if('imagenEmpresa' === name ){ values.imagenEmpresa  = files[0]}

  };

  const handleRegistro =async ()=>{
    loginWithEmail(values.correoEmpresa, values.contraseñaEmpresa, values)
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
                placeholder="Ingresa  tu contraseña"
              />
            </label>
          </div>
          <Button onClick={singIn} variant="contained" color="default">
            <h2 className={Styles.seccion}>Iniciar Session</h2>
          </Button>
          <div className={Styles.links}>
            <a onClick={()=> setBody(bodyRegistro)}>
              <span> ¡Registrate aqui!</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
  const handleValidador =async (e)=>{
    e.preventDefault();
    if(values.nombreEmpresa.length >=  4){
      if(values.direccionEmpresa.length >= 2 ){
        if(values.numeroEmpresa >= 2){
         if(correoValidador(values.correoEmpresa) === true){
            if(contraseñaValidador(values.contraseñaEmpresa)=== true){
              if(values.contraseñaEmpresa ===values.confContraseña ){
                    await firebaseG.auth().createUserWithEmailAndPassword(values.correoEmpresa, values.contraseñaEmpresa)
                    .then(async ()=>{
                      values.contraseñaEmpresa = '*****'
                      values.confContraseña = '*****'
                      await db.collection(values.correoEmpresa).doc('datosUsuario').set(values)
                      await db.collection('Empresa').doc(values.correoEmpresa).set(values)
                    })
                    .catch(error =>{
                      error.code === 'auth/email-already-in-use'?swal("¡Atencion!", "Este correo ya esta siendo utilizado, favor iniciar seccion o colocar otro correo", "error")
                      :swal("¡Alerta!", "Error a la hora de registrarse, favor de intentarlo mas tarde ", "info")
                      console.log(error);
                    });
              }else{swal("¡Alerta!", "Las contraseñas no coinciden ", "info");}
            }else{swal("¡Alerta!", "La contraseña es insegura, escriba contraseña que contenga mayuscula, minuscula, numeros y mayor a 8 caracteres  ", "info");}
         }else{swal("¡Alerta!", "El correo solo debe admiten los siguentes dominios,@gmail.com, @hotmail.com ", "info");}
        }else{swal("¡Alerta!", "EL numero telefonico es obligatorio ", "info");}
      } else {swal("¡Alerta!", "La direccion es obligatoria ", "info");}
    }
    else{
      swal("¡Alerta!", "El nombre de la empresa ingresado es muy corto", "info");
    }
    
  }
  const bodyRegistro = (
    <div className={StylesRegistro.container}>
      <form id='mi-form' onSubmit={handleValidador} className={StylesRegistro.formMain}>
        <div className={StylesRegistro.formInfo}>
          <img src="/inventario.svg" />
          <h1>Registrarse aqui</h1>
          <div>
          <label className="empresa-none"><input type="text"/></label>
            <label>
            <input
                name="nombreEmpresa"
                type="text"
                required
                onChange={handleInputChange}
                placeholder="Ingresa el nombre de la empresa"
              />
            </label>
            <label>
              <input
                type="email"
                name="correoEmpresa"
                required
                onChange={handleInputChange}
                placeholder="Ingresa tu email aqui"
              />
            </label>
          </div>
          <div>
          <label className="empresa-none"><input type="text"/></label>
            <label>
              <input
                id="number"
                name="numeroEmpresa"
                required
                type="text"
                onChange={handleInputChange}
                placeholder="Numero telefonico "
              />
            </label>
            <label>
            <label className="empresa-none"><input type="text"/></label>
              <input
                type="text"
                required
                onChange={handleInputChange}
                name="direccionEmpresa"
                id="dirrecion"
                required
                placeholder="Ingresar la direccion "
              />
            </label>
          </div>
          <div>
          <label className="empresa-none"><input type="text"/></label>
            <label>
              <input
                id="password-registro"
                required
                name="contraseñaEmpresa"
                type="password"
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña"
              />
            </label>
       
            <label>
            <label className="empresa-none"><input type="text"/></label>
              <input
                id="confContraseña"
                onChange={handleInputChange}
                required
                name="confContraseña"
                type="password"
                placeholder="Confirma tu contraseña"
              />
            </label>
          </div>
          <Button onClick={handleValidador} variant="text " color="">
            Registrarse <ArrowForwardIcon  color="secondary"/>
         </Button>
          <div className={StylesRegistro.links}>
            
              <a onClick={()=>setBody(bodyLogin)}>
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
        <ToastContainer />
    <div className="fondo-login" >
        {body}
    </div>
    </>

  );
}
