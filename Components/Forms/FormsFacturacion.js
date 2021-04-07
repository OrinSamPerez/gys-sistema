import Button from '@material-ui/core/Button'
import {useState, useEffect} from 'react';
import {firebaseG} from '../../BD-Firebase/firebase.conf'
import SendIcon from '@material-ui/icons/Send';
import Link from 'next/head'
import {agregarProductoFactura} from '../../Services/functionFactura'
import {getFecha} from '../../Services/getFecha';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DescriptionIcon from '@material-ui/icons/Description';
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
     if(user !=null){
        db.collection(user.email).doc('Producto-Factura-Temporal').collection('Producto-Factura-Temporal').onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach(doc =>{
              docs.push({...doc.data(),id:doc.id})
              
            })
            setDataProductoAñadidos(docs);
          });
     }
     })
   }
   useEffect(()=>{
    getDataProductoAñadidos()
   },[])
  const getDataProducto =()=>{

        firebaseG.auth().onAuthStateChanged(async (user) => {
        if(user != null){
            db.collection(user.email).doc('Producto').collection('Producto').orderBy("fechaProducto", "desc").onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach(doc =>{
                  docs.push({...doc.data(),id:doc.id})
                  
                })
                setDataProducto(docs)
            });
        }
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
        horaActual:'',
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
        telefonoCliente:'',


    }
     
    const [values, setValues] = useState(valueInitial);
    const [valuesProductos, setValuesProductos] = useState([]);
    const [ data, setData ] = useState([ ])
    const [ dataAgregarProducto,setDataAgregarProducto  ]= useState([])
    const [cantidadMax, setCantidadMax ] = useState(1)
    const [productoSeleccionado,setProductoSeleccionado]=useState('')
    const [productAdd, setProductAdd]= useState('Añadir producto')
    const [dataCliente, setDataCliente] = useState([])
    const [dataBuscarCliente,setDataBuscarCliente] = useState([])
    const handleInputChange = (e)=>{
        const { name , value } = e.target;
        setValues({...values, [name]:value}) 
    }
    const getData =()=>{

        firebaseG.auth().onAuthStateChanged(async (user) => {
         if(user != null){
            db.collection(user.email).doc('Producto').collection('Producto').orderBy("fechaProducto", "desc").onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach(doc =>{
                  docs.push({...doc.data(),id:doc.id})
                  
                })
                setData(docs);
              });
     
              db.collection(user.email).doc('Clientes').collection('Clientes').onSnapshot(documentos =>{
                  const docsCliente = []
                  documentos.forEach(doc =>{
                      docsCliente.push({...doc.data(),id:doc.id})
                  })
                  setDataCliente(docsCliente)
              })
     
         }
       
        })
    }
       useEffect(()=>{
         getData()
       },[])
    const imprimir=()=>{
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        mywindow.document.write('<html><head>');
        mywindow.document.write(
        `<style>
        .tablas{
            width:100%;
            border-collapse:collapse;
            margin:16px 0 16px 0;}
        .tablas th{
            border:1px solid #ddd;
            padding:4px;
            background-color:#d4eefd;
            text-align:left;
            font-size:15px;}
        .tablas td{
            border:1px solid #ddd;
            text-align:left;
            padding:6px;}
        .colum-factura{
            display:grid;
            grid-template-columns: 1fr 1fr;}
        .nmostrar{
            display:none}
        .sinborde{
            border:0;
        }
        .salto{
            padding-right:75px;
        }
        .salto2{
            padding-right:100px;
        }
        .salto3{
            padding-right:120px; 
        }
        .salto4{
            padding-right:105px; 
        }
        .margin{
            padding-top:18px;
        }
        .letras{
            font-size:12px;
        }
        .imgfact{
            width:20px;
            height:20px;
        }
        .lados{
            margin-top:3%;

        }
        </style>`);
        mywindow.document.write('</head><body >');
        mywindow.document.write(props.dproductosFactura.innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necesario para IE >= 10
        mywindow.focus(); // necesario para IE >= 10
        mywindow.print();
        mywindow.close();
        
        return true;
        
    }
     
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(values.nombreClienteFactura != ""){
            firebaseG.auth().onAuthStateChanged(async user =>{
                if(user != null){
                    db.collection(user.email).doc('Clientes').collection('Clientes').doc().set({
                        nombreCliente:values.nombreClienteFactura,
                        correoCliente:values.correoClienteFactura,
                        dirrecionCliente:values.dirrecionCliente,
                        telefonoCliente:values.telefonoCliente
    
                    })
                }
            })
        }

        values.numeroFactura = (`AC${fechaA.getFullYear()}${fechaA.getDay()}${fechaA.getMonth()+1}${fechaA.getHours()}${fechaA.getMinutes()}${fechaA.getSeconds()}`)
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

        imprimir()


    }

    const getDataId = async (id) =>{
        firebaseG.auth().onAuthStateChanged(async (user) => {
            if(user != null){
                const doc = await db.collection(user.email).doc('Factura').collection('Factura').doc(id).get();
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
    //Buscar productos
    const buscarProducto = (e)=>{
        let palabraBuscar = e.target.value
        let numeroPalabraBuscar = palabraBuscar.length;

        const result = dataProducto.filter(word =>{
            const PalabraProducto = word.nombreProducto; 
            const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
            return caracterPalabrasActual.toLowerCase()  === palabraBuscar.toLowerCase() 

        } )
        setDataAgregarProducto(result)
        result.map(dato=>{
            setProductoSeleccionado(dato.nombreProducto)
            setCantidadMax(dato.cantidadProducto)
            const datoProductos = {
                id:dato.id_Producto,
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
                id:dato.id_Producto,
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

const [datosEmpresa, setdatosEmpresa] = useState([])
if(datosEmpresa.length === 0 ){
    firebaseG.auth().onAuthStateChanged(async (user)=>{
        if(user != null){
          firebaseG.firestore().collection(user.email).doc('datosUsuario').get().then((doc)=>{
            if(doc.exists){
          
            }
            setdatosEmpresa(doc.data())
        })
    }
    })

} 
const buscarCliente = (e)=>{
    const cliente = e.target.value;
    let numeroPalabraBuscar = cliente.length;
    const result = dataCliente.filter(word => {
        const PalabraCliente = word.nombreCliente; 
        const caracterPalabrasActual = PalabraCliente.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase() === cliente.toLowerCase()
           
    })
    setDataBuscarCliente(result)
}
const clienteClick = (dato)=>{
    values.nombreClienteFactura = dato.nombreCliente
    values.correoClienteFactura = dato.correoCliente;
    values.dirrecionCliente = dato.dirrecionCliente;
    values.telefonoCliente = dato.telefonoCliente
} 
    return(
       <>
     
    <form onSubmit={handleSubmit}>
         <h2 className=" nver"><DescriptionIcon className="imgfact"/> FACTURA</h2>
        <div id="idPfactura " className="colum colum-factura ">
             <div className="ld nver">
                <h3 >Desde</h3>
                <br></br>
                <label className="ld1">Empresa: </label> <input className="sinborde salto" value={datosEmpresa.nombreEmpresa} disabled/>
                <label >Direccion: </label><input className="sinborde"  value={datosEmpresa.direccionEmpresa} disabled/> <br></br>
                <label className="in1">RNC: </label><input  className="sinborde" value={datosEmpresa.rncEmpresa} disabled/><br></br>
                <label className="in2">Correo: </label><input className="sinborde salto2" value={datosEmpresa.correoEmpresa} disabled/>
                <label className="in3">Telefono: </label><input className="sinborde" value={datosEmpresa.numeroEmpresa} disabled/><br></br>
                <label className="in1">NCF: </label><input className="sinborde" value={datosEmpresa.ncfEmpresa} disabled/>
            </div>
        <div >
    <h3 className="ld">Cliente</h3>
    <label className="labelClientes nmostrar">Buscar cliente</label>
    <input className="inputde labelClientes nmostrar" type="text"onChange={buscarCliente}  placeholder="Buscar cliente aqui..." name="nombreClienteFactura"/>    
    <div className="todosClientes">
        {
            dataBuscarCliente.length === 0? console.log()
            :dataBuscarCliente.map(row=>
                <>
                <div onClick={()=>clienteClick(row)}>
                    <span >{row.nombreCliente}</span>
                    <span>{row.id}</span>
                </div>
                <br></br>
                </>
            )
            }
    </div>

    <label className="lado1 ">Nombre:</label>
    <input className="inputde sinborde salto2 margin" type="text" required value={values.nombreClienteFactura} onChange={handleInputChange} placeholder="Nombre del Cliente" name="nombreClienteFactura"/>
    <label className="lado2 ">Correo:</label>
    <input className="inputde sinborde salto2" type="email"  value={values.correoClienteFactura} onChange={handleInputChange} placeholder="Correo del Cliente" name="correoClienteFactura"/>
    <label className="lado3">Direccion:</label>
    <input className="inputde sinborde salto2" type="text" value={values.dirrecionCliente} onChange={handleInputChange} placeholder="Dirrecion del Cliente" name="dirrecionCliente"/>
    <label className="lado4">Telefono:</label>
    <input className="inputde sinborde" type="text" value={values.telefonoCliente} onChange={handleInputChange} name="telefonoCliente" placeholder="Telefono de Cliente"/>
    </div>
  
  

  
   
   
    <div className="lado-factura " >
    <label   >No. Factura:</label>
    <input  className="sinborde nfactura lados" placeholder="Numero de factura" value={`AC${fechaA.getFullYear()}${fechaA.getDay()}${fechaA.getMonth()+1}${fechaA.getHours()}${fechaA.getMinutes()}${fechaA.getSeconds()}`} disabled/><br></br>
    <label >Fecha:</label> 
    <input className="sinborde inputF" value={`${fecha}  ${hora}`}/> <br></br>
    <label >Forma de pago:</label>
    <select className=" sinborde" id="tipoPagoFactura"  onChange={handleInputChange} name="tipoPagoFactura"> {metodoPago.map(pago => 
               <option value={pago}>{pago}</option>
           )}
           </select>
   <br></br>
    <label >Plazo de Pago:</label>
    <select className=" sinborde salto3" id="plazoPagoFactura" onChange={handleInputChange} name="plazoPagoFactura" >
               <option value="10 dias">10 dias</option>
               <option value="15 dias">15 dias</option>
               <option value="25 dias">25 dias</option>
           </select>
           <br></br>
    <label >Vencimiento:</label>
    <input  className="sinborde salto4 ladoi" type="text"  value={values.vencimientoFactura} onChange={handleInputChange} placeholder="Vencimiento Factura" name="vencimientoFactura"/>
    <label >Estado de Pago:</label>
    <select className=" sinborde " id="estadoPago" onChange={handleInputChange} name="estadoPago" >
               <option value="Pagada">Pagada</option>
               <option value="A plazo">No pagada</option>
           </select>
     </div>

     </div> 
           
    
    </form>
    
     <br></br>
     <div className="muestra">
                <div>
                    <label className="nmostrar">Seleccionar producto</label>
                    <input className="buscarProducto nmostrar" type="text" onChange={buscarProducto} placeholder={productAdd}/>
                    </div>
                    <div>
                    <label className="labelcant nmostrar">Cantidad</label>
                <input className="inputcant nmostrar" type="number" id="cantidadIn" min="1" max={cantidadMax} />
               
                <span className="span nmostrar">Producto Seleccionado: {productoSeleccionado}, Cantidad maxima: {cantidadMax}</span>
                </div>
                </div>
                <div className="añdirProducto nmostrar">
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
              <Fab > <AddCircleOutlineIcon style={{fontSize:20, color:'008000'}} /> </Fab> 
            </Button>   
            </div>
            <div> 
          <Button onClick={handleSubmit} variant="text" color="default" title="Crear Factura">
            <Fab> <NoteAddIcon style={{fontSize:20}} color="primary"/></Fab>
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