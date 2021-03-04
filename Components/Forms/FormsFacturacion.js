import Button from '@material-ui/core/Button'
import {useState, useEffect} from 'react';
import {firebaseG} from '../../firebase.BD/firebase.conf'
import SendIcon from '@material-ui/icons/Send';
import Link from 'next/head'
import {agregarProductoFactura} from '../../Services/functionFactura'
import {getFecha} from '../../Services/getFecha';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
const db =  firebaseG.firestore();
const metodoPago = ['Efectivo','Tarjeta de credito']
export default function FormsFacturacion(props){
  const [dataProducto, setDataProducto] = useState([]) 
  const [dataProductoAñadidos, setDataProductoAñadidos] = useState([])
  const [fecha, setFecha] = useState(getFecha);
  const [hora, setHora]=useState()
  var fechaA = new Date();
  const horaActual = (`${fechaA.getHours()}:${fechaA.getMinutes()}:${fechaA.getSeconds()}`)
  setTimeout(()=>{
    setHora(horaActual)
},1000) 
 
  const getDataProductoAñadidos =()=>{ 
    firebaseG.auth().onAuthStateChanged(async (user) => {
     db.collection(user.email).doc('Producto-Factura-Temporal').collection('Producto-Factura-Temporal').onSnapshot((querySnapshot)=>{
       const docs = [];
       querySnapshot.forEach(doc =>{
         docs.push({...doc.data(),id:doc.id})
         
       })
       setDataProductoAñadidos(docs);
     });
     })
   }
   useEffect(()=>{
    getDataProductoAñadidos()
   },[])
  const getDataProducto =()=>{

        firebaseG.auth().onAuthStateChanged(async (user) => {
        db.collection(user.email).doc('Producto').collection('Producto').orderBy("fechaProducto", "desc").onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach(doc =>{
              docs.push({...doc.data(),id:doc.id})
              
            })
            setDataProducto(docs)
        });
        })
    }
    useEffect(()=>{
        getDataProducto()
    },[])

    const valueInitial = {
        numeroFactura:'',
        nombreClienteFactura:'',
        correoClienteFactura:'',
        rncEmpresa:'',
        telefonoEmpresa:'',
        fechaActual:fecha,
        horaActual:hora,
        plazoPagoFactura:'',
        vencimientoFactura:'',
        estadoPago:'',
        ITBISFactura:'',
        subTotal:'',
        Total:'',
        productoFactura:[],
        tipoPagoFactura:'',
        dirrecionCliente:'',
        ncfFactura:'',


    }
     
    const [values, setValues] = useState(valueInitial);
    const [valuesProductos, setValuesProductos] = useState([]);
    const [ data, setData ] = useState([ ])
    const [ dataAgregarProducto,setDataAgregarProducto  ]= useState([])
    const [cantidadMax, setCantidadMax ] = useState(1)
    const [productoSeleccionado,setProductoSeleccionado]=useState('')
    const [productAdd, setProductAdd]= useState('Añadir producto')
    const handleInputChange = (e)=>{
        const { name , value } = e.target;
        setValues({...values, [name]:value}) 
    }
    const getData =()=>{

        firebaseG.auth().onAuthStateChanged(async (user) => {
         db.collection(user.email).doc('Producto').collection('Producto').orderBy("fechaProducto", "desc").onSnapshot((querySnapshot)=>{
           const docs = [];
           querySnapshot.forEach(doc =>{
             docs.push({...doc.data(),id:doc.id})
             
           })
           setData(docs);
         });
         })
       }
       useEffect(()=>{
         getData()
       },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const estadoPago = document.getElementById("estadoPago").value;
        const tipoPagoFactura = document.getElementById("tipoPagoFactura").value;
        values.tipoPagoFactura = tipoPagoFactura
        values.estadoPago = estadoPago
        values.subTotal = props.SUBTOTAL
        values.Total = props.TOTAL
        values.ITBISFactura = props.ITBIS
        values.productoFactura = props.data
        props.addFactura(values);  
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
    //Buscar productos
    const buscarProducto = (e)=>{
        let palabraBuscar = e.target.value
        let numeroPalabraBuscar = palabraBuscar.length;

        const result = dataProducto.filter(word =>{
            const PalabraProducto = word.nombreProducto; 
            const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
            return caracterPalabrasActual === palabraBuscar

        } )
        setDataAgregarProducto(result)
        result.map(dato=>{
            setProductoSeleccionado(dato.nombreProducto)
            setCantidadMax(dato.cantidadProducto)
            const datoProductos = {
                producto:dato.nombreProducto,
                descuento:dato.descuentoProducto,
                precio:dato.precioVentaProducto,
                cantidad:dato.cantidadProducto,
                itbis:0,
                total:0,
                subTotal:0,
            }
            setValuesProductos(datoProductos)
        })
    }
    const añdirProductoClick =(e)=>{
        
        const result = dataProducto.filter(word=>word.nombreProducto===e)
        result.map(dato=>{
            setCantidadMax(dato.cantidadProducto)
            setProductAdd(dato.nombreProducto)
            setProductoSeleccionado(dato.nombreProducto)
            const datoProductos = {
                producto:dato.nombreProducto,
                descuento:dato.descuentoProducto,
                precio:dato.precioVentaProducto,
                cantidad:dato.cantidadProducto,
                itbis:0,
                total:0,
                subTotal:0,
            }
            setValuesProductos(datoProductos)
        })
    }
    const addProducto = ()=>{
        let cantidadIn = document.getElementById('cantidadIn').value
        const cantidadMax = valuesProductos.cantidad
        if(cantidadIn === ""){
            cantidadIn = 1
            agregarProductoFactura(cantidadIn,cantidadMax,valuesProductos)
        }
        else{
            agregarProductoFactura(cantidadIn,cantidadMax,valuesProductos)
        }
       
        
    }
const [datosEmpresa, setdatosEmpresa] = useState({})
    firebaseG.auth().onAuthStateChanged(async (user)=>{
        if(user != null){
          firebaseG.firestore().collection(user.email).doc('datosUsuario').get().then((doc)=>{
            if(doc.exists){
          
            }
            setdatosEmpresa(doc.data())
        })
    }
})


    return(
       <>
    
    <form onSubmit={handleSubmit}>
    <div className="columnas">
    
    <div className="ld">
    <h3 >Desde</h3>
    <label>Empresa: {datosEmpresa.nameEmpresa}</label> <br></br>
    <label>Direccion: {datosEmpresa.direccionEmpresa}</label> <br></br>
    <label>RNC: {datosEmpresa.rncEmpresa}</label><br></br>
    <label>Correo: {datosEmpresa.emailEmpresa}</label> <br></br>
    <label>Telefono: {datosEmpresa.numberEmpresa}</label><br></br>
    <label>NCF: {datosEmpresa.ncfEmpresa}</label>
    
  
    </div>
    <div>
    <h3 className="ld">Cliente</h3>
    <label className="ld">Seleccionar cliente</label>
           <select className="selectde" >
               <option value="selec" >Selec</option>
           </select>
    <label className="lado1">Nombre</label>
    <input className="inputde" type="text" required value={values.nombreClienteFactura} onChange={handleInputChange} placeholder="Nombre del Cliente" name="nombreClienteFactura"/>
    <label className="lado2">Correo</label>
    <input className="inputde" type="email"  value={values.correoClienteFactura} onChange={handleInputChange} placeholder="Correo del Cliente" name="correoClienteFactura"/>
    <label className="lado3">Direccion</label>
    <input className="inputde" type="text" value={values.dirrecionCliente} onChange={handleInputChange} placeholder="Dirrecion del Cliente" name="dirrecionCliente"/>
    <label className="lado4">Telefono</label>
    <input className="inputde" placeholder="Telefono de Cliente"/>
    </div>
  
  
   </div>
    
   <hr></hr>
    <div className="columnas">
    <div>
    <label className="lado5">No. Factura</label>
    <input className="inputle nfac" placeholder="Numero de factura" value={`${fechaA.getFullYear()}${fechaA.getDay()}${fechaA.getMonth()+1}${fechaA.getHours()}${fechaA.getMinutes()}${fechaA.getSeconds()}`} disabled/>
    <label className="lado6">Fecha</label>
    <input className="inputle fech" value={`${fecha}  ${hora}`}/>
    <label className="lado8">Forma de pago</label>
    <select className="selectle" id="tipoPagoFactura"  onChange={handleInputChange} name="tipoPagoFactura"> {metodoPago.map(pago => 
               <option value={pago}>{pago}</option>
           )}
           </select>
    </div>
    <div>
    <label className="lado9">Plazo de Pago</label>
    <select className="selectles" id="plazoPagoFactura" onChange={handleInputChange} name="plazoPagoFactura" >
               <option value="10 dias">10 dias</option>
               <option value="15 dias">15 dias</option>
               <option value="25 dias">25 dias</option>
           </select>
    <label className="lado7">Vencimiento</label>
    <input className="inputle" type="text"  value={values.vencimientoFactura} onChange={handleInputChange} placeholder="Vencimiento Factura" name="vencimientoFactura"/>
    <label className="lado10">Estado de Pago</label>
    <select className="selectles" id="estadoPago" onChange={handleInputChange} name="estadoPago" >
               <option value="Pagada">Pagada</option>
               <option value="A plazo">No pagada</option>
           </select>
     </div>
    </div>
        
           
    
    </form>
    
     <br></br>
     <div className="muestra">
                <div>
                    <label>Seleccionar producto</label>
                    <input className="buscarProducto" type="text" onChange={buscarProducto} placeholder={productAdd}/>
                    </div>
                    <div>
                    <label className="labelcant">Cantidad</label>
                <input className="inputcant" type="number" id="cantidadIn" min="1" max={cantidadMax} />
               
                <span className="span">Producto Seleccionado: {productoSeleccionado}, Cantidad maxima: {cantidadMax}</span>
                </div>
                </div>
                <div className="añdirProducto">
                    <div className="todosproductos">
                        {dataAgregarProducto.map(producto=>
                            <>
                            <Button  onClick={()=>añdirProductoClick(producto.nombreProducto)}  variant="container" color="default">
                                {producto.nombreProducto}
                            </Button>
                            
                            <br></br>
                             
                            </>)
                        }
                    
                    </div>
                    <div><Button onClick={addProducto} variant="text" color="default" title="Agregar Producto">
              <Fab > <AddCircleOutlineIcon style={{fontSize:20}} color="secondary"/> </Fab> 
            </Button>   
            </div>
            <div> 
          <Button onClick={handleSubmit} variant="text" color="default" title="Crear Factura">
            <Fab> <NoteAddIcon style={{fontSize:20}} color="secondary"/></Fab>
           </Button></div>
                  
                    </div>
                
               
               
                 
            
         
            
                   
            
        
        <style jsx>{`
        .span{
            margin-top: 4px;
            font-size:15px;
        }
        .muestra{
            display:flex;
        }
        .inputcant{
            height:23px;
            width:15%;
        }
        .añdirProducto{
            display:grid;
            grid-template-columns: 1fr 1fr 1fr;
            
        }
        .buscarProducto{
            width:50%;
            height:23px
        }
        .todosproductos{
            text-align:left;
            width: 330px; 
            height: 100px;
            background: transparent;
            border: 3px solid #b6b8bb;
            border-radius: 5px;
            margin-bottom: 1px;
            display: block; 
            overflow: scroll;
        }
        .labelcant{
            margin-top: 7px;

            
        }
        
        `}</style>
        </>
    );
} 