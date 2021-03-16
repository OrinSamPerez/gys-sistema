import {useState} from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import ImageIcon from '@material-ui/icons/Image';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Modal from '@material-ui/core/Modal'
import {firebaseG} from '../firebase.BD/firebase.conf'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from "@material-ui/core/CircularProgress";
import {emailValidador, contraseñaPassword} from '../Services/validadorConfiguracion';
const db = firebaseG.firestore()
const auth = firebaseG.auth()
export default function Configuracion(){
    const [datosUsuario, setDatosUsuarios] = useState([])
    const [state, setState] = useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
      });
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    //Extrayendo los datos
    auth.onAuthStateChanged(async user=>{
        if(datosUsuario.length === 0){
            if(user != null){
                db.collection(user.email).doc('datosUsuario').get().then(doc =>{
                    setDatosUsuarios(doc.data())
                })
            }
        }
    })
    const DRAG_IMAGE_STATES = {
        ERROR: -1,
        NONE: 0,
        DRAG_OVER: 1,
        UPLOADING: 1,
        COMPLETE: 3,
      };
    const [openLoader, setOpenLoader] = useState(false)
    const values = {
        nameEmpresa:datosUsuario.nameEmpresa,
        emailEmpresa:datosUsuario.emailEmpresa,
        numberEmpresa:datosUsuario.numberEmpresa,
        direccionEmpresa:datosUsuario.direccionEmpresa,
        passwordEmpresa:'',
        confPassword:'',
        rncEmpresa:datosUsuario.rncEmpresa,
        ncfEmpresa:datosUsuario.ncfEmpresa,
        PagoEnEfectivo:datosUsuario.PagoEnEfectivo,
        PagoConTarjetaDeCréditooDébito:datosUsuario.PagoConTarjetaDeCréditooDébito,
        PUE:datosUsuario.PUE,
        PPD:datosUsuario.PPD,
        tipoEmpresa:datosUsuario.tipoEmpresa,
        imageLogo:datosUsuario.imageLogo,
        imageEmpresa:datosUsuario.imageEmpresa,
        conf:'',
        confP:'',
    }
    //fin
    const uploadImage = async (file) => {
        setOpenLoader(true)
        const ref = await firebaseG.storage().ref(`/imagenes/${datosUsuario.nameEmpresa}/${file.name}`);
        const task = await ref.put(file);
        return task;
      };
        const [required, setRequired] = useState()
    const changeSettings = (e)=>{
        const {name, value, files} = e.target;
        if('nameEmpresa' === name ){ values.nameEmpresa= value;} if ('emailEmpresa' === name ){ 
           const emailValor = (emailValidador(value))
           if(emailValor === true){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
           }
           setRequired(emailValor)   

        } 
        if('numberEmpresa' === name ){ values.numberEmpresa= value;}if('direccionEmpresa' === name ){ values.direccionEmpresa= value;}
        if('passwordEmpresa' === name ){ 
            values.conf = value
            if(value === values.confPassword){
                values.passwordEmpresa = value; 
            }
            else{
               
            }
        } 
        if('confPassword' === name ){ 
            const valueConf= contraseñaPassword(value)
            if(valueConf === true){
                values.confPassword= value;
            }
            else{
                
            }

        } 
        if('rncEmpresa' === name ){ values.rncEmpresa= value;}if('ncfEmpresa' === name ){ values.ncfEmpresa= value;}
        if('PagoEnEfectivo' === name ){ values.PagoEnEfectivo= 'Pago En Efectivo';}if('PagoConTarjetaDeCréditooDébito' === name ){ values.PagoConTarjetaDeCréditooDébito= 'Pago Con Tarjeta De Crédito Débito';}
        if('PUE' === name ){ values.PUE= 'PUE'; } if('PPD' === name ){ values.PPD= 'PPD'} 
        if('tipoEmpresa' === name ){ values.tipoEmpresa= value;}
        if('imageLogo' === name )
        {  
            
            uploadImage(files[0]).then(async task=>{
                const ref =firebaseG.storage().ref(`/imagenes/${files.name}`)
                task.ref.getDownloadURL().then(async imgUrl=>{
                    values.imageLogo = await  imgUrl;
                    setOpenLoader(false)
                })
            })

        }
        if('imageEmpresa' === name ){ 
            uploadImage(files[0]).then(async task=>{
                const ref =firebaseG.storage().ref(`/imagenes/${datosUsuario.nameEmpresa}/${files.name}`)
                task.ref.getDownloadURL().then(async imgUrl=>{
                    values.imageEmpresa =await  imgUrl;
                    setOpenLoader(false)
                })
            })
         }
       }
    const updateSettings = ()=>{
        values.conf = '******'
        auth.onAuthStateChanged(async user =>{
            if(user != null){ 
                if(datosUsuario.passwordEmpresa !=  '' ){
                    var userData = auth.currentUser;
                    if(userData != null){
                        userData.updatePassword(datosUsuario.passwordEmpresa).then(function() {
                            alert('contraseña cambiada correctamente')  
                          }).catch(function(error) {
                              if(error.code === 'auth/requires-recent-login'){
                                  alert('Segurida: Al parecer ha durado mucho tiempo para iniciar seccion, por favor cierre la seccion y vuelva abrirla')
                              }
                          });
                }
                }
               await  db.collection(user.email).doc('datosUsuario').update(values)
                await   db.collection(user.email).doc('datosUsuario').get().then(doc =>{
                    toast.success('🙂 Actualizado Correctamente!', {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        }); 
                        setDatosUsuarios(doc.data())

               })
            setOpen(false)
            }
        })
    }

    const administrador = (
        <>
        <ToastContainer />
         <PersonIcon style={{fontSize:50, color:'#ff3eaf'}} />
         <h1>Configuracion Administrador</h1>
        <div className="settingsAdmin">
            <div className="center-settings">
                <label>Nombre de la empresa</label>
                <label >Correo Electronico</label>
            </div>
            <div>
                <input type="text" value={datosUsuario.nameEmpresa} disabled/>
                <input type="text"  name="emailEmpresa"  disabled value={datosUsuario.emailEmpresa}/>
            </div>         
            
            <div>
                <input type="text" onChange={changeSettings}  name="nameEmpresa"  placeholder="Nuevo nombre de la empresa"/>
                <input type="text" onChange={changeSettings} alt="EL CORREO NO SE PUEDE MODIFICAR, PARA HACERLO ESCRIBA A ESTE CORREO: sistemadegestion@gmail.com " disabled name="emailEmpresa" placeholder="Nuevo correo electronico"/>
            </div>

           <div className="center-settings">
                <label>Numero de la empresa</label>
                <label>Dirrecion de la empresa</label>
           </div>

            <div>
                <input type="text" value={datosUsuario.numberEmpresa} disabled/>
                <input type="text" value={datosUsuario.direccionEmpresa} disabled/>
            </div>         
            
            <div>
                <input type="text" onChange={changeSettings} name="numberEmpresa" placeholder="Nuevo numero de telefono"/>
                <input type="text" onChange={changeSettings} name="direccionEmpresa" placeholder="Nueva direccion de la empresa"/>
            </div>    
        </div>
        <div>
        <Button onClick={()=>setOpen(false)} variant="contained" color="secondary">
              Cancelar
            </Button>    
            &nbsp; &nbsp; &nbsp; 
            <Button onClick={updateSettings} variant="contained" color="primary">
              Guardar 
            </Button>
        </div>
        </>
    )

    const imagenesEmpresa = (
        <>
        <ImageIcon style={{fontSize:50, color:'#ff3eaf'}} />
         <h1>Configuracion de Imagenes</h1>
        <div className="settingsAdmin">
            <div>
                <label>Logo de la Empresa</label>

                    <br></br>
                <img   onChange={changeSettings}  className="logoEmpresa" src={values.imageLogo}/>
            </div>   

            <div className="LogoEmpresa-div"   >
                    <input onChange={changeSettings} className="none-image" name="imageLogo" accept="image/*" id="contained-button-file" type="file" />
                    <input onChange={changeSettings} name="imageEmpresa" className="none-image" accept="image/*"  id="image-button-file" type="file" />

                </div>
                <br></br>
                <label  htmlFor="contained-button-file">
                <Button variant="contained"  name="imageLogo" onChange={changeSettings} color="primary" component="span">
                        Subir Logo Aqui
                        <PhotoCamera/>
                    
                    </Button>
                    </label>
            <div >
                <label>Imagen de la Empresa</label>
                <img className="imagenEmpresa" src={values.imageEmpresa}/>
            </div> 
            <div className="imagenEmpresa-div">
        <label htmlFor="image-button-file">
                        <Button variant="contained" name="imageEmpresa" onChange={changeSettings} color="primary" component="span">
                        Subir Imagen Aqui
                        <PhotoCamera/>
                    
                    </Button>
                    </label>
            </div>

            <div>
        <Button onClick={()=>setOpen(false)} variant="contained" color="secondary">
              Cancelar
            </Button>    
            &nbsp; &nbsp; &nbsp; 
            <Button onClick={updateSettings} variant="contained" color="primary">
              Guardar 
            </Button>
        </div>
        </div>
        
        </>
    )
    const contraseñas = (
        <>
            <LockIcon style={{fontSize:50, color:'#ff3eaf'}} />
         <h1>Configuracion de Contraseña</h1>
        <div className="settingsAdmin">
            <div>
                <label>Nueva Contraseña</label>
            </div>
            <div>
                <input type="text" type="password" onChange={changeSettings} name="confPassword" placeholder="Ingrese Nueva Contraseña "/><br></br>
                    <div className="contraseña" >   <span title="La contraseña debe contener por lo menos una minuscula, una mayuscula y ser mayor a 8 caracteres" >La contraseña debe contener por lo menos una minuscula, una mayuscula y ser mayor a 8 caracteres </span>
                    </div>
            </div>
            <br></br> {' '}
            <div>
                <label>Confirmar Contraseña</label>
            </div>
            <div>
           
            <input type="password" name="passwordEmpresa" onChange={changeSettings}  type="text" placeholder="Confirme la Contraseña "/>
            </div>
            <br></br> {' '}
                <br></br> {' '}
            <div>
                <Button onClick={()=>setOpen(false)} variant="contained" color="secondary">
                        Cancelar
                    </Button>    
                    &nbsp; &nbsp; &nbsp; 
                     <Button onClick={updateSettings}  variant="contained" color="primary">
                        Guardar 
                    </Button>
                </div>
                <br></br> {' '}
                <br></br> {' '}
                <br></br> {' '}
        </div>
        </>
    )
    const Empresa = (
        <>
        <BusinessCenterIcon style={{fontSize:50,color:'#ff3eaf'}} />
         <h1>Configuracion de la Empresa</h1>
        <div className="settingsAdmin">
            <div className="center-settings">
                <label>RNC Empresa</label>
                <label>NFC Empresa</label>
            </div>
            <div>
                <input type="text" value={datosUsuario.rncEmpresa} disabled/>
                <input type="text" disabled value={datosUsuario.ncfEmpresa}/>
            </div>         
            
            <div>
                <input type="text" onChange={changeSettings} name="rncEmpresa" placeholder="Ingrese el nuevo RNC"/>
                <input type="text" onChange={changeSettings} name="ncfEmpresa" placeholder="Ingrese el nuevo NCF"/>
            </div>

            <div className="pagos-grid">
                <div>
                    <label>
                        Metodos de pago que aceptaras
                        <FormControlLabel    onChange={changeSettings} name="PUE" control={<Checkbox   name="PUE"  onChange={changeSettings}  name="PUE" color="primary" />} name="PUE" label="(PUE)Pago en una sola exhibición" />
                        <FormControlLabel name="PUE"  onChange={changeSettings} control={<Checkbox onChange={changeSettings} name="ncfEmpresa" name="PPD" color="primary" />} name="PPD" label="(PPD)Pago en parcialidades o diferido" />  
                    </label>
                </div>

                <div>
                    <label>
                        Formas de pago       
                        <FormControlLabel onChange={changeSettings} name="PagoEnEfectivo"  control={<Checkbox  onChange={changeSettings} name="PagoEnEfectivo" id="efectivo" color="primary" />} label="Pago en efectivo" />
                        <FormControlLabel onChange={changeSettings} name="PagoConTarjetaDeCréditooDébito" control={<Checkbox onChange={changeSettings} name="PagoConTarjetaDeCréditooDébito" color="primary" />} label="Pago con tarjeta de crédito o débito" />        
                </label>
               </div>
            </div>         
            
            <div>
                <div>
                    <label>
                    Tipo de empresa
                    <select onChange={changeSettings}  className="tipoEmpresa-configuracion" name="tipoEmpresa">
                        <option value="" >Selecciona uno</option>
                        <option value="sectorprimario" >Sector primario</option>
                        <option value="sectorsecundario" >Sector secundario(Industrial)</option>
                        <option value="sectorterciario" >sector terciario (sector servicios)</option>
                    </select>
                    </label>
                </div>
            </div>    
            <div>
                <Button onClick={()=>setOpen(false)} variant="contained" color="secondary">
                    Cancelar
                    </Button>    
                    &nbsp; &nbsp; &nbsp; 
                    <Button onClick={updateSettings} variant="contained" color="primary">
                    Guardar 
                    </Button>
                </div>
        </div>
        </>
    )
    const [open, setOpen] =useState(false)
    const [bodyConfiguracion, setBodyConfiguracion] = useState(administrador)
    const handleClose = ()=>{
        setOpen(false)
    }
    const openAdmin = ()=>{
        setBodyConfiguracion(administrador)
        setOpen(true)
    } 
       const openEmpresa = ()=>{
        setBodyConfiguracion(Empresa)
        setOpen(true)
    }
    const openImagenes=()=>{
        setBodyConfiguracion(imagenesEmpresa)
        setOpen(true)
    }
    const openContraseñas = ()=>{
        setBodyConfiguracion(contraseñas)
        setOpen(true)
    }
    return(
        <>
            <div className="setting-text" ><SettingsIcon style={{fontSize:40}}/><h1>Configuracion</h1></div>
            <section className="settings">
                <div onClick={openAdmin}> 
                    <PersonIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Administrador</span>
                </div>

                <div onClick={openEmpresa}> 
                    <BusinessCenterIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Empresa</span>
                </div>

                <div onClick={openContraseñas}> 
                    <LockIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Contraseña</span>
                </div>

                <div onClick={openImagenes}> 
                    <ImageIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Imagenes</span>
                </div>


            </section>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div className="configuracion-modal">
                    {bodyConfiguracion}
                </div>
                </Modal>
                <Modal
                        open={openLoader}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className="progress">
                        <CircularProgress color="iherent" />
                        </div>
                </Modal>
        </>   
  
    )
}