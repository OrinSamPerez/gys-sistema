import Button from '@material-ui/core/Button'
import {useState, useEffect} from 'react';
import {firebaseG} from '../../firebase.BD/firebase.conf'
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';

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
        props.addProveedor(values);  
        setValues({...valueInitial})
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
    <div>
        <form onSubmit={handleSubmit}>
          <input type="text" required value={values.nombreProveedor} onChange={handleInputChange} placeholder="Nombre del proveedor" name="nombreProveedor"/>
          <input type="text" required value={values.direccionProveedor}  onChange={handleInputChange} placeholder="Direccion" name="direccionProveedor"/>
          <input type="email" required value={values.correoProveedor}  onChange={handleInputChange} placeholder="Correo" name="correoProveedor"/>
          <input type="text" required value={values.telefonoProveedor}  onChange={handleInputChange} placeholder="Telefono" name="telefonoProveedor"/>
          <input type="text" required value={values.pagoProveedor}  onChange={handleInputChange} placeholder="Termino de pago" name="pagoProveedor"/>
          <input type="text" required value={values.cargoProveedor} onChange={handleInputChange} placeholder="Cargo del representante" name="cargoProveedor"/>
          <Button onClick={handleSubmit} variant="text" color="default">
             {props.currentId === ""? (<><SendIcon color="secondary"/> {console.log('editar')} </>) : (<EditIcon color="primary" /> )}
           </Button>
        </form> 
        
     </div>
    )
} 