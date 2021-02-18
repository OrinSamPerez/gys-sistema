import Button from '@material-ui/core/Button'
import {useState, useEffect} from 'react';
import {firebaseG} from '../../firebase.BD/firebase.conf'
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab'

const db =  firebaseG.firestore();

export default function FormsCategoria(props){
    const valueInitial = {
        descripcionCategoria:''
     }
    const [values, setValues] = useState(valueInitial);
    const handleInputChange = (e)=>{
        const { name , value } = e.target;
        setValues({...values, [name]:value}) 
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.addCategoria(values);  
        setValues({...valueInitial})
    }
    const getDataId = async (id) =>{
        firebaseG.auth().onAuthStateChanged(async (user) => {
            const doc = await db.collection(user.email).doc('Categoria').collection('Categoria').doc(id).get();
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
        <form className="form-agregar" onSubmit={handleSubmit}>
        {props.currentId === ""? (<h2>Registrar Categoria</h2> ) : (<h2>Actualizar Categoria</h2>)}
        <div> 
         <label >Descripcion </label> <input className="input " type="text" required value={values.descripcionCategoria} onChange={handleInputChange} placeholder="Descripcion de la Categoria" name="descripcionCategoria"/>
         
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