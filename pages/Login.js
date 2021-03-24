import { useState } from "react";
import Button from "@material-ui/core/Button";
import Styles from "../styles/Login.module.css";
import { loginSingIn,loginWithEmail,loginCollection, firebaseG} from "../firebase.BD/firebase.conf";
import StylesRegistro from "../styles/Registro.module.css";
import {validadorLogin} from "../Services/validadorLogin";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PersonAddIcon from '@material-ui/icons/PersonAdd'; 
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const valueInitial = { 
    nameEmpresa:"",
    emailEmpresa:'',
    numberEmpresa:'',
    direccionEmpresa:'',
    passwordEmpresa:'',
    confPassword:'',
    rncEmpresa:'',
    ncfEmpresa:'',
    PagoEnEfectivo:'',
    PagoConTarjetaDeCréditooDébito:'',
    PUE:'',
    PPD:'',
    tipoEmpresa:'',
    imageLogo:null,
    imageEmpresa:null,
  }


  const [values, setValues] = useState(valueInitial);
  const singIn = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    loginSingIn(email, password).then(result =>{ console.log(result)}).catch(()=>{
      toast.error("🙁 Error al ingresar correo o contraseña", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setValues({...values, [name]:value}) 
    if('nameEmpresa' === name ){ values.nameEmpresa= value;} if('emailEmpresa' === name ){ values.emailEmpresa= value;} 
    if('numberEmpresa' === name ){ values.numberEmpresa= value;}if('direccionEmpresa' === name ){ values.direccionEmpresa= value;}
    if('passwordEmpresa' === name ){ values.passwordEmpresa= value;} if('confPassword' === name ){ values.confPassword= value;} 
    if('rncEmpresa' === name ){ values.rncEmpresa= value;}if('ncfEmpresa' === name ){ values.ncfEmpresa= value;}
    if('PagoEnEfectivo' === name ){ values.PagoEnEfectivo= value;}if('PagoConTarjetaDeCréditooDébito' === name ){ values.PagoConTarjetaDeCréditooDébito= value;}
    if('PUE' === name ){ values.PUE= value;} if('PPD' === name ){ values.PPD= value;} 
    if('tipoEmpresa' === name ){ values.tipoEmpresa= value;}if('imageLogo' === name )
    { values.imageLogo = files[0]}
    if('imageEmpresa' === name ){ values.imageEmpresa  = files[0]}

  };
  const handleValidador =(e)=>{
    e.preventDefault();
    console.log(values.nameEmpresa)
    const password =  values.passwordEmpresa;
    const email = values.emailEmpresa;
    const nameEmpresa = values.nameEmpresa;
    const confPassword  = values.confPassword
    const emailVerificado =  validadorLogin(password,email, nameEmpresa,  confPassword)
    
    
    if(emailVerificado != email){
      console.log('No se ha validado')
    }
    else if(emailVerificado === email ){
      setBody(bodyRegistroEmpresa)

    }
  }
  const handleRegistro =async ()=>{
    loginWithEmail(values.emailEmpresa, values.passwordEmpresa, values)

  }
  let empresaD = values.nameEmpresa
  const bodyRegistroEmpresa = (
    <div className={StylesRegistro.container}>
      <div className={StylesRegistro.formMainEmpresa}>
      <img src="/inventario.svg" />
      <h3>{empresaD}¡Bienvenido  favor rellenar lo siguientes campos!</h3>
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
        Formas de pago
            
          <FormControlLabel onChange={handleInputChange} name="PagoEnEfectivo"  control={<Checkbox onChange={handleInputChange} name="PagoEnEfectivo" id="efectivo" color="primary" />} label="Pago en efectivo" />
          <FormControlLabel onChange={handleInputChange} name="PagoConTarjetaDeCréditooDébito" control={<Checkbox onChange={handleInputChange} name="PagoConTarjetaDeCréditooDébito" color="primary" />} label="Pago con tarjeta de crédito o débito" />
        
        </label>
        </div>
        <div>
          <label>
        Metodos de pago que aceptaras
          <FormControlLabel onChange={handleInputChange} control={<Checkbox onChange={handleInputChange} name="PUE" color="primary" />} name="PUE" label="(PUE)Pago en una sola exhibición" />
          <FormControlLabel onChange={handleInputChange} control={<Checkbox onChange={handleInputChange} name="PPD" color="primary" />} name="PPD" label="(PPD)Pago en parcialidades o diferido" />
        
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
      <input onChange={handleInputChange} name="imageLogo" accept="image/*" className={StylesRegistro.inputNone} id="contained-button-file" type="file" />
        <label  htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Subir Logo aqui
            <PhotoCamera/>
          
          </Button>
    
        </label>
        &nbsp;&nbsp;&nbsp;
        <input onChange={handleInputChange} name="imageEmpresa" accept="image/*" className={StylesRegistro.inputNone} id="image-button-file" type="file" />
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
                placeholder="Ingresa tu contraseña"
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
  const bodyRegistro = (
    <div className={StylesRegistro.container}>
      <form onSubmit={handleValidador} className={StylesRegistro.formMain}>
        <div className={StylesRegistro.formInfo}>
          <img src="/inventario.svg" />
          <h1>Registrarse aqui</h1>
          <div>
            <label>
              <input
                name="nameEmpresa"
                type="text"
                required
                onChange={handleInputChange}
                placeholder="Ingresa el nombre de la empresa"
              />
            </label>
            <label>
              <input
                type="email"
                name="emailEmpresa"
                required
                onChange={handleInputChange}
                placeholder="Ingresa tu email aqui"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                id="number"
                name="numberEmpresa"
                required
                type="text"
                onChange={handleInputChange}
                placeholder="Numero telefonico "
              />
            </label>
            <label>
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
            <label>
              <input
                id="password-registro"
                required
                name="passwordEmpresa"
                type="password"
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña"
              />
            </label>
       
            <label>
              <input
                id="confPassword"
                onChange={handleInputChange}
                required
                name="confPassword"
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
