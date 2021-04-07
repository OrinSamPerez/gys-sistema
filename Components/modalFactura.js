import {useState} from 'react'
import {firebaseG} from '../BD-Firebase/firebase.conf'
import DescriptionIcon from '@material-ui/icons/Description';
const db =  firebaseG.firestore();
const auth =  firebaseG.auth();                                                                                                                                                                                                                                                         
export default function ModalFactura(props){
    const [datos, setDatos] = useState([])
    const [datosEmpresa, setDatosEmpresa]= useState([])
    if(datos.length === 0){
        auth.onAuthStateChanged(user =>{
            if(user != null){
               db.collection(user.email).doc('Factura').collection('Factura').doc(props.idFacturas).get().then(doc =>{
                    setDatos(doc.data())
                
                })
                db.collection(user.email).doc('datosUsuario').get().then(docu=>{
                    setDatosEmpresa(docu.data())
                })
            }
        })
    }
 

    return(
        
       <div className="sc">
       <h2 ><DescriptionIcon className="imgfact"/> FACTURA</h2>
       {datos.length === 0? <h1>Cargando Datos...</h1>
        
        :
        <>
        <div className="gridFactura"> 
          <div >
            <h3 >Desde</h3>
            <br></br>
            <label >Empresa: <small>{datosEmpresa.nombreEmpresa}</small></label> <br></br>
            <label >Direccion: <small>{datosEmpresa.direccionEmpresa}</small></label><br></br>
            <label >RNC: <small>{datosEmpresa.rncEmpresa} </small></label><br></br>
            <label >Correo: <small>{datosEmpresa.correoEmpresa}</small> </label><br></br>
            <label >Telefono: <small>{datosEmpresa.numeroEmpresa}</small> </label><br></br>
            <label >NCF: <small>{datosEmpresa.ncfEmpresa} </small> </label>
           </div>

           <div>
           <h3 >Cliente</h3>
           <br></br>
           <label >Nombre: <small>{datos.nombreClienteFactura} </small></label><br></br>
            <label >Correo: <small>{datos.correoClienteFactura} </small></label><br></br>
            <label >Direccion: <small>{datos.dirrecionCliente}</small></label><br></br>
            <label >Telefono: <small>{datos.telefonoCliente}</small></label>
          </div>
        </div>
        <hr></hr>
          <div className="gridFactura">
              <div>
                <label >No. Factura: <small>{datos.numeroFactura}</small></label><br></br>
                <label  >Fecha: <small>{datos.fechaActual }</small></label> <br></br>
                <label >Forma de pago: <small>{datos.tipoPagoFactura}</small></label>
              </div>
              <div>
                <label >Plazo de Pago: <small>{datos.plazoPagoFactura}</small></label><br></br>
                <label >Vencimiento: {datos.vencimientoFactura}</label><br></br>
                <label >Estado de Pago:</label>
                <select className="estadoPago" id="estadoPago"  name="estadoPago" value={datos.estadoPago} >
                <option value="Pagada">Pagada</option>
                <option value="A plazo">No pagada</option>
                </select>
              </div>
          </div>
          <hr></hr>
          <div>
              <table>
                    <thead className="sincolor">
                            <tr>
                                <td >Producto</td>
                                <td >Cantidad</td>
                                <td >Precio</td>
                                <td >SubTotal</td>
                                <td >ITBIS</td>
                                <td >Descuento</td>
                                <td >Total</td>
                            </tr>
                    </thead>
                    {
                        datos.productoFactura.map(dat=>
                          <tr >
                            <td>{dat.producto}</td>
                            <td>{dat.cantidad}</td>
                            <td>{dat.precio}</td>
                            <td>{dat.subTotal}</td>
                            <td>{dat.itbis}</td>
                            <td>{dat.descuento}</td>
                            <td>{dat.total}</td>
                          </tr>
                        )
                    }
              </table>
   
              <div>
              
                <h5>SUBTOTAL:  <small>{datos.subTotal}</small> </h5> 
                <h5>+ ITBIS:  <small>{datos.ITBISFactura}</small>  </h5>
                <h5>- DESCUENTO: <small></small></h5>
                <h5>TOTAL: <small>{datos.Total}</small> </h5> 
              </div>
             
          </div>
       </>
       }
       </div>
      
    )
}