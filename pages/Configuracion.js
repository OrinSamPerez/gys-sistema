import {useState} from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import ImageIcon from '@material-ui/icons/Image';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Modal from '@material-ui/core/Modal'
export default function Configuracion(){
    const administrador = (
        <>
         <PersonIcon style={{fontSize:50, color:'#ff3eaf'}} />
         <h1>Configuracion Administrador</h1>
        <div className="settingsAdmin">
            <div>
                <label>Nombre de la empresa</label>
                <label>Correo Electronico</label>
            </div>
            <div>
                <input type="text" disabled/>
                <input type="text" disabled/>
            </div>         
            
            <div>
                <input type="text" placeholder="Nuevo nombre de la empresa"/>
                <input type="text" placeholder="Nuevo correo electronico"/>
            </div>

            <div>
                <input type="text" disabled/>
                <input type="text" disabled/>
            </div>         
            
            <div>
                <input type="text" placeholder="Nuevo numero de telefono"/>
                <input type="text" placeholder="Nueva direccion de la empresa"/>
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
    return(
        <>
            <div className="setting-text" ><SettingsIcon style={{fontSize:40}}/><h1>Configuracion</h1></div>
            <section className="settings">
                <div onClick={openAdmin}> 
                    <PersonIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Administrador</span>
                </div>

                <div> 
                    <BusinessCenterIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Empresa</span>
                </div>

                <div> 
                    <LockIcon style={{fontSize:50}} />
                    <br></br>
                    <span>Contraseña</span>
                </div>

                <div> 
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
        </>   
  
    )
}