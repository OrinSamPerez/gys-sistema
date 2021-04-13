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
const ventas=[10,20,30,40,50,60,70,50,42,95,78,100]
    const data={
        labels:meses,
        datasets:[{
            label:'Ventas Mensuales (Ganancias)',
            backgroundColor:'rgba(0,0,0,0.1)',
            borderColor:'#FFB400',
            borderWidth:2,
            hoverborderColor:'#ffffff',
            data:ventas,
            
    
        }]
};
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
    <Line
      data={data}
      width='100%'
      height='325px'
      options={opciones}  
    />
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
