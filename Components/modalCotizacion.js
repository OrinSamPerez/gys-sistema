import {useState, useEffect} from 'react'
import {firebaseG} from '../BD-Firebase/firebase.conf'
import Button from '@material-ui/core/Button'
const db =  firebaseG.firestore();
const auth =  firebaseG.auth();     
export default function ModalCotizacion(props){
    const [datos, setDatos] = useState([])
    const valueInitial = {
        correoClienteFactura:'',
        nombreEmpresa:'',
        numeroFactura:'',
        correoEmpresa:'',
        rncEmpresa:'',
        telefonoEmpresa:'',
        fechaActual:'',
        horaActual:'',
        ITBISFactura:'',
        subTotal:'',
        Total:'',
        productoFactura:[], 
        ncfFactura:'',
        estadoPago:'',

    }
    const [enviar, setEnviar]=useState(valueInitial)
useEffect(()=>{
  auth.onAuthStateChanged(user =>{
    if(user != null){
       db.collection(user.email).doc('Clientes-Facturas').collection('Clientes-Facturas').doc(props.idFacturas).get().then(doc =>{
            setDatos(doc.data())
            valueInitial.productoFactura = doc.data().productos
            valueInitial.numeroFactura = doc.id
            valueInitial.Total = doc.data().Total
            valueInitial.subTotal = doc.data().subTotal
            valueInitial.horaActual = doc.data().horaActual
            valueInitial.estadoPago = 'Pagada'
            valueInitial.fechaActual = doc.data().diaActual
            valueInitial.correoClienteFactura = doc.data().email

        setEnviar(valueInitial)
        })
    }  
})
},[])
const Facturar =()=>{
    auth.onAuthStateChanged(async user =>{
        if(user !=  null){
            await db.collection(user.email).doc('Factura').collection('Factura').doc(enviar.numeroFactura).set(enviar)
            await db.collection(user.email).doc('Clientes-Facturas').collection('Clientes-Facturas').doc(enviar.numeroFactura).delete();
            await db.collection(enviar.email).doc('ListaCotizacion').collection('ListaCotizacion').doc(enviar.numeroFactura).delete();
        }
    })
}
    return(
        <div>
                    {
                        datos.length != 0?
                        <>
                     <div>
                        <h3>Numero de facturas: {datos.id}</h3>
                        <h3>Cotizacion hecha por: {datos.email}</h3>
                        <h3>Fecha de creacion: {datos.diaActual}</h3>
                        <h3>Hora de creacion: {datos.horaActual}</h3>
                    </div>
                    <table>
                    <thead className="sincolor">
                            <tr>
                                <td >Producto</td>
                                <td >Precio</td>
                                <td >Cantidad</td>
                                <td >Descuento</td>
                            </tr>
                    </thead>

                       { datos.productos.map(dat=>
                          <tr >
                            <td>{dat.productoEmpresa}</td>
                            <td>{dat.precio}</td>
                            <td>{dat.cantidadSeleccionada}</td>
                            <td>{dat.descuento}</td>
                          </tr>
                        )
                   }

              </table>
              <br></br>
              <br></br>
              <br></br>
              <Button onClick={Facturar} variant="contained" color="primary">
                    Facturar
              </Button>
              </>
              :<h1>Cargando...</h1> 
            }

        </div>
    )
}