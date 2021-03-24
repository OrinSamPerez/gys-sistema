import Button from '@material-ui/core/Button'
import {useState, useEffect} from 'react';
import {firebaseG} from '../../firebase.BD/firebase.conf'
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab'
import swal from 'sweetalert';

const db =  firebaseG.firestore();

export default function FormsProveedor(props){
    const valueInitial = {
        nombreProveedor:'',
        direccionProveedor:'',
        correoProveedor:'',
        telefonoProveedor:'',
        pagoProveedor:'',
        cargoProveedor:'',
     }
    const [values, setValues] = useState(valueInitial);
    const handleInputChange = (e)=>{
        const { name , value } = e.target;
        setValues({...values, [name]:value}) 
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(values.nombreProveedor != ''){
            if(values.direccionProveedor != ''){
                if(values.correoProveedor != ''){
                    if(values.telefonoProveedor != ''){
                        if(values.pagoProveedor != ''){
                            if(values.cargoProveedor != ''){
                                props.addProveedor(values);  
                                setValues({...valueInitial})
                            }else{ swal("¡Alerta!", "No puedes dejar el a que cargo pertenece el proveedor vacio ", "info")}
                        }else{ swal("¡Alerta!", "No puedes dejar la forma de pago vacia", "info")}
                    }else{ swal("¡Alerta!", "No puedes dejar el telefono del proveedor vacio", "info")}
                }else{ swal("¡Alerta!", "No puedes dejar el correo del proveedor vacio", "info")}
            }else{ swal("¡Alerta!", "No puedes dejar la direccion del proveedor vacio", "info")}
        }else{ swal("¡Alerta!", "No puedes dejar el nombre del proveedor vacio", "info")}
    } 
    const getDataId = async (id) =>{
        firebaseG.auth().onAuthStateChanged(async (user) => {
            const doc = await db.collection(user.email).doc('Proveedor').collection('Proveedor').doc(id).get();
            setValues({...doc.data()})
        })
    }

    useEffect(()=>{
        if(props.currentId === ""){
            setValues({ ...valueInitial })
        }
        else{
            getDataId(props.currentId)
        }
    },[props.currentId])

    return(
    <div >
        <form  onSubmit={handleSubmit}>
        {props.currentId === ""? (<h2>Registrar Proveedor</h2> ) : (<h2>Actualizar Proveedor</h2>)}
        <div> 
         <label className="relleno2">Nombre</label> <input  type="text" required value={values.nombreProveedor} onChange={handleInputChange} placeholder="Nombre del proveedor" name="nombreProveedor"/>
         <label className="relleno1" >Direccion</label> <input  type="text" required value={values.direccionProveedor}  onChange={handleInputChange} placeholder="Direccion" name="direccionProveedor"/>
        
         <label className="relleno" >Correo</label><input  type="email" required value={values.correoProveedor}  onChange={handleInputChange} placeholder="Correo" name="correoProveedor"/>
         </div>
         <div >
         <label>Telefono</label> <input  type="text" required value={values.telefonoProveedor}  onChange={handleInputChange} placeholder="Telefono" name="telefonoProveedor"/>
        
        
         <label>Forma de Pago</label> <input  type="text" required value={values.pagoProveedor}  onChange={handleInputChange} placeholder="Termino de pago" name="pagoProveedor"/>
         <label>Cargo</label> <input type="text" required value={values.cargoProveedor} onChange={handleInputChange} placeholder="Cargo del representante" name="cargoProveedor"/>
         </div>
         <Button onClick={handleSubmit} variant="text" color="default">
         <Fab color="default" aria-label="">
             {props.currentId === ""? (<><AddCircleOutlineIcon style={{fontSize:25}} color="secondary"/> {console.log('editar')} </>) : (<EditIcon color="primary" /> )}
             </Fab>
           </Button>
         
         
        </form> 
        
     </div>
    )
} 