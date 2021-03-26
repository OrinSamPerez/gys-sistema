import { useState } from "react";
import Button from "@material-ui/core/Button";
import Styles from "../styles/Login.module.css";
import { loginSingIn,loginWithEmail,loginCollection, firebaseG} from "../BD-Firebase/firebase.conf";
import StylesRegistro from "../styles/Registro.module.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PersonAddIcon from '@material-ui/icons/PersonAdd'; 
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { ToastContainer, toast } from "react-toastify";
import {correoValidador, contraseñaValidador} from '../Services/validadorConfiguracion'
import "react-toastify/dist/ReactToastify.css";
import {alertaError} from '../Components/Alertas'
import swal from 'sweetalert';
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
  }


  const [values, setValues] = useState(valueInitial);

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

  const bodyRegistroEmpresa = (
    <div className={StylesRegistro.container}>
      <div className={StylesRegistro.formMainEmpresa}>
      <img src="/inventario.svg" />
      <h3>¡Bienvenido  favor rellenar lo siguientes campos!</h3>
      <div>
        <label>
        RNC Empresa
          <input
            name="rncEmpresa"
            required
            type="text"
            placeholder="Rnc empresa "
            onChange={handleInputChange}

          />
          </label>
          <label>
          NCF Empresa
            <input
            onChange={handleInputChange}
              id="ncfEmpresa"
              name="ncfEmpresa"
              required
              type="text"
              placeholder="NCF empresa "
            />
          </label>
      </div> 

      <div className={StylesRegistro.flexion}>
        <div>
        <label>
              Metodos de pago que aceptaras
              <FormControlLabel    onChange={handleInputChange} name="PUE" control={<Checkbox   name="PUE"  onChange={handleInputChange}  name="PUE" color="primary" />} name="PUE" label="(PUE)Pago en una sola exhibición" />
              <FormControlLabel name="PUE"  onChange={handleInputChange} control={<Checkbox onChange={handleInputChange} name="ncfEmpresa" name="PPD" color="primary" />} name="PPD" label="(PPD)Pago en parcialidades o diferido" />  
          </label>
      </div>

      <div>
          <label>
              Formas de pago       
              <FormControlLabel onChange={handleInputChange} name="PagoEnEfectivo"  control={<Checkbox  onChange={handleInputChange} name="PagoEnEfectivo" id="efectivo" color="primary" />} label="Pago en efectivo" />
              <FormControlLabel onChange={handleInputChange} name="PagoConTarjetaDeCréditooDébito" control={<Checkbox onChange={handleInputChange} name="PagoConTarjetaDeCréditooDébito" color="primary" />} label="Pago con tarjeta de crédito o débito" />        
      </label>
        </div>
      </div>
      <div>
          <label>
        Tipo de empresa
          <select onChange={handleInputChange} name="tipoEmpresa">
            <option value="" >Selecciona uno</option>
            <option value="sectorprimario" >Sector primario</option>
            <option value="sectorsecundario" >Sector secundario(Industrial)</option>
            <option value="sectorterciario" >sector terciario (sector servicios)</option>
          </select>
        </label>
      </div>
      <div className={StylesRegistro.botonImage}>
      <input onChange={handleInputChange} name="imagenLogo" accept="image/*" className={StylesRegistro.inputNone} id="contained-button-file" type="file" />
        <label  htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Subir Logo aqui
            <PhotoCamera/>
          
          </Button>
    
        </label>
        &nbsp;&nbsp;&nbsp;
        <input onChange={handleInputChange} name="imagenEmpresa" accept="image/*" className={StylesRegistro.inputNone} id="image-button-file" type="file" />
        <label htmlFor="image-button-file">
          <Button variant="contained" color="primary" component="span">
            Subir Imagen aqui
            <PhotoCamera/>
          </Button>
        </label>
      </div>
      <div className={StylesRegistro.botones}>
        <Button onClick={()=> setBody(bodyRegistro)} variant="text" color="primary">
          <KeyboardBackspaceIcon />
          Atras
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={handleRegistro} variant="text" color="secondary">
          Registrarse
          <PersonAddIcon/>
        </Button>
      </div>
      </div>
   

      <label></label>
    </div>
  )
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
  const handleValidador =(e)=>{
    e.preventDefault();
    if(values.nombreEmpresa.length >=  4){
      if(values.direccionEmpresa.length >= 2 ){
        if(values.numeroEmpresa >= 2){
         if(correoValidador(values.correoEmpresa) === true){
            if(contraseñaValidador(values.contraseñaEmpresa)=== true){
              if(values.contraseñaEmpresa ===values.confContraseña ){
                setBody(bodyRegistroEmpresa)
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
            Siguiente <ArrowForwardIcon  color="secondary"/>
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
