import {useState} from 'react'
import StylesRegistro from "../styles/Registro.module.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PersonAddIcon from '@material-ui/icons/PersonAdd'; 
import Button from "@material-ui/core/Button";
import {firebaseG} from '../BD-Firebase/firebase.conf'
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PinDropSharp } from '@material-ui/icons';
const db = firebaseG.firestore()
const auth = firebaseG.auth()
export default function EmpresaConf(props){
    const [dataEmpresa, setDataEmpresa] = useState([])
    if(dataEmpresa.length === 0){
          auth.onAuthStateChanged(async user =>{
        if(user != null){
         await db.collection(user.email).doc('datosUsuario').get().then(doc =>{
           if(doc.exists){
             setDataEmpresa(doc.data())
           }
         })
        }
      })
    }
    const [logo, setLogo]=useState(null)
    const [imagen, setImagen]=useState(null)
    const valueInitial = { 
        nombreEmpresa:dataEmpresa.nombreEmpresa,
        correoEmpresa:dataEmpresa.correoEmpresa,
        numeroEmpresa:dataEmpresa.numeroEmpresa,
        direccionEmpresa:dataEmpresa.direccionEmpresa,
        contraseñaEmpresa:'***',
        confContraseña:'****',
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
      const [enviar, setEnviar] = useState(false)
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setValues({...values, [name]:value}) 
        if('rncEmpresa' === name ){ values.rncEmpresa= value;}if('ncfEmpresa' === name ){ values.ncfEmpresa= value;}
        if('PagoEnEfectivo' === name ){ values.PagoEnEfectivo= true}if('PagoConTarjetaDeCréditooDébito' === name ){ values.PagoConTarjetaDeCréditooDébito= true}
        if('PUE' === name ){ values.PUE= true} if('PPD' === name ){ values.PPD= true} 
        if('tipoEmpresa' === name ){ values.tipoEmpresa= value;}if('imagenLogo' === name )
        { values.imagenLogo = files[0]}
        if('imagenEmpresa' === name ){ values.imagenEmpresa  = files[0]}
        setValues({
          ...values, 
          nombreEmpresa:dataEmpresa.nombreEmpresa,
          correoEmpresa:dataEmpresa.correoEmpresa,
          numeroEmpresa:dataEmpresa.numeroEmpresa,
          direccionEmpresa:dataEmpresa.direccionEmpresa,
        }) 
      };
     const enviarDatos =async ()=>{
       values.estado = true
       setEnviar(true)
       if(values.imagenLogo != null){
          const refL = await firebaseG.storage().ref(`/ImagenesLogos/${values.imagenLogo.name}`)
          refL.put(values.imagenLogo).snapshot.ref.getDownloadURL().then(async imgUrl =>{
                values.imagenLogo = imgUrl;
                if( values.imagenEmpresa != null )
                  {
                    const refL = firebaseG.storage().ref(`/ImagenesEmpresas/${values.imagenEmpresa.name}`)
                         await refL.put(values.imagenEmpresa).snapshot.ref.getDownloadURL().then(async imUrl =>{
                          if(imUrl != null){
                            console.log(imUrl)
                            values.imagenEmpresa = await imUrl;
                            firebaseG.auth().onAuthStateChanged(async user =>{
                              if(user != null){
                                await db.collection('Empresa').doc(user.uid).set(values)
                                await db.collection(values.correoEmpresa).doc("datosUsuario").update(values)
                                props.close()

                              }
                            })
                          }
                    })
                  }
                        else if( values.imagenEmpresa != null){
                        const refL = firebaseG.storage().ref(`/ImagenesEmpresas/${values.imagenEmpresa.name}`)
                        refL.put(values.imagenEmpresa).snapshot.ref.getDownloadURL().then(async imUrl =>{
                              values.imagenEmpresa = imUrl;
                              if(user != null){
                                await db.collection('Empresa').doc(user.uid).set(values)
                                await db.collection(values.correoEmpresa).doc("datosUsuario").update(values)
                                props.close()

                              }
                        })    
                       }
                  else{
                    firebaseG.auth().onAuthStateChanged(async user =>{
                      if(user != null){
                        await db.collection('Empresa').doc(user.uid).set(values)
                        await db.collection(values.correoEmpresa).doc("datosUsuario").update(values)
                        props.close()

                      }
                    })
                  }
          })
       }
 
       else{
        await db.collection('Empresa').doc(user.uid).set(values)
        await db.collection(values.correoEmpresa).doc("datosUsuario").update(values)
        props.close()
       }
  }
    return(   
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
                Metodos de pago que aceptaras
            <label>
               <FormControlLabel  onChange={handleInputChange} name="PPD" control={<Checkbox onChange={handleInputChange}  name="PPD" color="primary" name="PPD"/>} name="PPD" label="(PPD)Pago en parcialidades o diferido" />  
                <FormControlLabel  onChange={handleInputChange} name="PUE" control={<Checkbox onChange={handleInputChange}  name="PUE" color="primary" name="PUE"/>} name="PUE" label="(PUE)Pago en una sola exhibición" />  
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
              {values.imagenLogo === null? <PhotoCamera/>:<DoneIcon/>}
              
            
            </Button>
      
          </label>
          &nbsp;&nbsp;&nbsp;
          <input onChange={handleInputChange} name="imagenEmpresa" accept="image/*" className={StylesRegistro.inputNone} id="image-button-file" type="file" />
          <label htmlFor="image-button-file">
            <Button variant="contained" color="primary" component="span">
              Subir Imagen aqui
              {values.imagenEmpresa === null? <PhotoCamera/>:<DoneIcon/>}

            </Button>
          </label>
        </div>
        <div className="buttons-aceptar">
                {enviar === false?  
                  <Button onClick={enviarDatos} variant="contained" color="secondary">
                      Aceptar                  
                  </Button>
                  : 
                  <div>
                      <span>Cargando...</span>
                  </div>
                   }
             
        </div>
        </div>
     
  
        <label></label>
      </div>
    )
}