import {Line} from 'react-chartjs-2';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CategoryIcon from '@material-ui/icons/Category';
import Link from 'next/link'
import {firebaseG} from '../BD-Firebase/firebase.conf'
import {useState , useEffect} from 'react'

export default function Home() {
const meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const [data3,setData3]=useState({})
const [datosInforme, setdatosInforme]= useState([]);
const documentos=[]
const mesData= new Object()
meses.forEach(mes=>{
  mesData[mes] = 0;
  
})
let control=1;
useEffect(()=>{
  firebaseG.auth().onAuthStateChanged(async (user) => {
      if(user != null){
        await db.collection(user.email).doc('Stock').collection('Stock').orderBy("Salida_Inicial", "desc").get().then(data=>{
         
          data.forEach(dataInforme=>{
              
              documentos.push({...dataInforme.data()})
            })
            setdatosInforme(documentos) 
            if (documentos.length >= 10)
              {
do{
  meses.forEach(async mes=>{
      await db.collection(user.email).doc('Datos-Ventas').collection(mes).get().then(dat=>{
          dat.forEach(ventasM=>{
              mesData[mes]+= ventasM.data().totales;
          })
          const dataVentasM={
              labels:meses,
              datasets:[{
                  label:'Ventas Mensuales (Ganancias) 2021',
                  backgroundColor:'#83BAFF',
                  borderColor:'#2B2B2B',
                  borderWidth:2,
                  hoverBackgroundColor:'#00E1FF',
                  hoverborderColor:'#83BAFF',
                  data:[mesData.Enero,mesData.Febrero,mesData.Marzo,mesData.Abril,mesData.Mayo,mesData.Junio,mesData.Julio,mesData.Agosto,mesData.Septiembre,mesData.Octubre,mesData.Noviembre,mesData.Diciembre],
                  
          
              }]
      }; 
      setData3(dataVentasM)
        }) 
        
  })
}while(control != 1)
}
              })
}})

},  [])


const opciones={
  maintainAspectRatio:false,
   responsive:true 
} 
const db = firebaseG.firestore();
const [cantidadCliente, setcantidadCliente]= useState('0');
const [cantidadProducto, setcantidadProducto]= useState('0');
const [cantidadProveedor, setcantidadProveedor]= useState('0');
const [cantidadCategoria, setcantidadCategoria]= useState('0');
firebaseG.auth().onAuthStateChanged(async (user) => {
  if(user != null){
        db.collection(user.email).doc('Clientes').collection('Clientes').get().then(clientes =>
        {
          setcantidadCliente(clientes.size)
        });
        db.collection(user.email).doc('Proveedor').collection('Proveedor').get().then(proveedor => 
        {
          setcantidadProveedor(proveedor.size)
        });
        db.collection(user.email).doc('Categoria').collection('Categoria').get().then(categoria => 
        {
          setcantidadCategoria(categoria.size)
        });
        db.collection(user.email).doc('Producto').collection('Producto').get().then(producto => 
        {
          setcantidadProducto(producto.size)
        });
}})
const [ datos, setDatos ] = useState([ ])
const getData =()=>{
  firebaseG.auth().onAuthStateChanged(async (user) => {
   if(user != null){
     db.collection(user.email).doc('Producto').collection('Producto').orderBy("fechaProducto", "desc").onSnapshot((querySnapshot)=>{
       const docs = [];
       querySnapshot.forEach(doc =>{
        console.log(doc.data()) 
         if (doc.data().cantidadProducto < 11) {
         docs.push({...doc.data(),id:doc.id})  
        console.log(doc.data())  } 
       })
       setDatos(docs);
       console.log(datos)
     });
   }
   })
 }

 useEffect(()=>{
   getData()
 },[])

  return (
    <>
  
      <h1 className="center">Home</h1>
  <div className="columnasHome">
     <div>
       <Link href="/Producto">
          <a > <button className="btn-informes" type="button" > <OpenInBrowserIcon /> PRODUCTOS </button> </a>
       </Link>
     
       <small className="debajo">{cantidadProducto}</small>
      </div>
      
    <div>
       <Link href="/Cliente">
          <a > <button className="btn-informes debajo"> <SupervisorAccountIcon/> CLIENTES</button></a>
       </Link>
        <small className="debajo">{cantidadCliente}</small>
    </div>
    <div>
      <Link href="/Provedor">
        <a > <button className="btn-informes" > <LocalShippingIcon/>  PROVEEDORES</button> </a>
      </Link>
        <small className="debajo">{cantidadProveedor}</small>
    </div>
    <div>
      <Link href="/Categoria">
        <a > 
        <button className="btn-informes"> <CategoryIcon />  CATEGORIAS</button>
        </a>
      </Link>
        <small className="debajo">{cantidadCategoria}</small>
    </div>

  </div>

<br></br>
<hr></hr>
<div>
{ datosInforme.length >= 10 ?<>
<Line
      data={data3}
        width='100%'
        height='325px'
        options={opciones}
        />
        </>:<h1 id="mensajeAdv">NO HAY SUFICIENTES PRODUCTOS REGISTRADOS PARA GENERAR UN INFORME</h1>
}
</div>

<br></br>
<hr></hr>
<div>
<h2 className="centrado">Productos Faltantes (Menos de 10 Unidades en Stock)</h2>
<table>
            
            <thead>
              <tr>
                <td>Descripcion</td>
                <td>Cantidad</td>

                <td></td>
              </tr>
            </thead>

           <tbody>
           
               {datos.map(dato=>
                 <><tr >
                   <td>{dato.nombreProducto}</td>
                   <td>{dato.cantidadProducto}</td>
                   </tr>
                </>
               )}
               
           </tbody>   
          </table>
          
          
          <br></br>
          <br></br>
</div>
    </>
  );
}
