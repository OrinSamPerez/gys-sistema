import Button from '@material-ui/core/Button'
import {useState, useEffect} from 'react';
import {firebaseG} from '../../firebase.BD/firebase.conf'
import SendIcon from '@material-ui/icons/Send';

const db =  firebaseG.firestore();

export default function FormsFacturacion(props){
    const valueInitial = {
        clienteFactura:'',
        domicilioFactura:'',
        ciudadFactura:'',
        NIFFactura:'',
        comentariosFactura:'',
        productos:[],
        clienteExistente:[]

     }
    const [values, setValues] = useState(valueInitial);
    const handleInputChange = (e)=>{
        const { name , value } = e.target;
        setValues({...values, [name]:value}) 
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.addactFactura(values);  
        setValues({...valueInitial})
    }
    const getDataId = async (id) =>{
        firebaseG.auth().onAuthStateChanged(async (user) => {
            const doc = await db.collection(user.email).doc('Factura').collection('Factura').doc(id).get();
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
          <input type="text" required value={values.clienteFactura} onChange={handleInputChange} placeholder="Cliente" name="domicilioFactura"/>
          <input type="text" required value={values.domicilioFactura}  onChange={handleInputChange} placeholder="Domicilio" name="domicilioFactura"/>
          <input type="text" required value={values.ciudadFactura}  onChange={handleInputChange} placeholder="Ciudad" name="ciudadFactura"/>
          <input type="text" required value={values.NIFFactura}  onChange={handleInputChange} placeholder="NIF" name="NIFFactura"/>
          <Button onClick={handleSubmit} variant="text" color="default">
             <SendIcon color="secondary"/> 
           </Button>
        </form> 
        
     </div>
    )
} 