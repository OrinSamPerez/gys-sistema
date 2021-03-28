import {firebaseG} from '../../BD-Firebase/firebase.conf';
import {useState, useEffect} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
const db =  firebaseG.firestore();
export default function FormsClientes(props){

    const valueInitial={
        nombreCliente:'',
        correoCliente:'',
        direccionCliente:'',
        telefonoCliente:'',

    }
    const [values, setValues]=useState(valueInitial)
    
    const handleInputChange=(e)=>{
    const {name, value}= e.target;
    setValues({...values, [name]:value})
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      if(values.nombreCliente != ''){
          if(values.correoCliente != ''){
              if(values.direccionCliente != ''){
                  if(values.telefonoCliente != ''){
                    props.addClientes(values)
                    setValues({...valueInitial}) 
                  }else{ swal("¡Alerta!", "No puedes dejar el numero de telefono vacio", "info")}
              }else{ swal("¡Alerta!", "No puedes dejar la direccion del cliente vacia", "info")}
          }else{ swal("¡Alerta!", "No puedes dejar el correo vacio", "info")}
      }else{ swal("¡Alerta!", "No puedes dejar el nombre del cliente vacio", "info")}
    }

    const getDataId = async (id) =>{
      firebaseG.auth().onAuthStateChanged(async (user) => {
         if(user != null){
            const doc = await db.collection(user.email).doc('Clientes').collection('Clientes').doc(id).get();
            setValues({...doc.data()})
         }
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
        <>
        <div>
            <form onSubmit={handleSubmit}>
                {props.currentId === ""? (<h2>Registrar Cliente</h2> ) : (<h2>Actualizar Cliente</h2>)}
                <div className="fcliente">
                    <div>
                        <label>Nombre:</label><input type="text" name="nombreCliente" onChange={handleInputChange} value={values.nombreCliente}/>
                        <label >Correo:</label><input   type="text" name="correoCliente" onChange={handleInputChange} value={values.correoCliente}/>
                     </div>
                    <div>
                        <label>Direccion:</label><input type="text" name="direccionCliente" onChange={handleInputChange} value={values.direccionCliente}/>
                        <label>Telefono:</label><input id="lcliente" type="text" name="telefonoCliente" onChange={handleInputChange} value={values.telefonoCliente}/>
                    </div>
                </div>     
                <Button onClick={handleSubmit} variant="text" color="default">
                <Fab color="default" style={{width:'35px', height:'6px'}} aria-label="">
                    {props.currentId === ""? (<><AddCircleOutlineIcon style={{fontSize:25, color:'green'}} />  {console.log('editar')} </>) : (<EditIcon style={{fontSize:25}} color="primary" /> )}
                    </Fab>
                </Button>
            </form>
        </div>
        </>
    )
}