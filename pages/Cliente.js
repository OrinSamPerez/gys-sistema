import {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import {firebaseG} from '../firebase.BD/firebase.conf'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import  Modal from '@material-ui/core/Modal'

const db = firebaseG.firestore();
const auth = firebaseG.auth()
export default function  Cliente() {
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false)
  const [dataClientes, setDatosClientes] = useState({})
  const changeId = (id)=>{
      auth.onAuthStateChanged(user=>{
        if(user != null){
          db.collection(user.email).doc('Clientes').collection('Clientes').doc(id).get().then(doc=>{
            setDatosClientes(doc)
          })
        }
      })
  }
  auth.onAuthStateChanged(user =>{
    if(user != null){
      db.collection(user.email).doc('Clientes').collection('Clientes').onSnapshot(coll =>{
        const docs = [];
        coll.forEach(doc =>{
          docs.push({...doc.data(),id:doc.id})
        })
        setClientes(docs)
      })

    }
  })
  const datosCliente = (
    <div>
      <input type="text" disabled value={dataClientes.nombreCliente} />
    </div>
  )
  const 
  return (
    <d>
      {clientes.map(row=>
        <Paper  title="Ver datos de clientes" elevation={2} >
          <div className="flexion">
            <div><Avatar></Avatar></div>
            <div className="nombre">
              <Typography variant="h5" color="initial">
                  Nombre:<span> {row.nombreCliente}</span>
                </Typography>
            </div>
              <div className="id">
                <Typography variant="h5" color="initial">
                    ID:<span> {row.id}</span>
                </Typography>
              </div>
              <div>
              <Button onClick={()=>changeId(row.id)} variant="outlined" color="primary">
                  Datos del cliente
                </Button>
                 <Button variant="outlined" color="secondary">
                  Facturas
                </Button>
              </div>
          </div>
      </Paper>

      )}
      <Modal open={open}>
          {datosClientes}
        </Modal>
      <style jsx> 
      {`
      .flexion{
        padding:10px;
        cursor:pointer;
        display:flex;
        trasintion:1s;
        margin-top:15px;
      }
      .flexion:hover{
        padding:11px;
      }
      .nombre{
        margin-top:6px;
        margin-left:40px;
        margin-right:80px;
        font-size:20px;
      }
      span{
        font-size:18px;
      }
      .id{
        margin-top:6px;
      }
      `}</style>
    </d>
  )
}
