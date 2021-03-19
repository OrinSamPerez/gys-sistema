import {Line} from 'react-chartjs-2';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CategoryIcon from '@material-ui/icons/Category';
import Link from 'next/link'

export default function Home() {
  const meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const ventas=[10,20,30,40,50,60,70,50,42,95,78,100]
    const data={
        labels:meses,
        datasets:[{
            label:'Ventas Mensuales (Ganancias)',
            backgroundColor:'rgba(0,0,0,0.1)',
            borderColor:'aqua',
            borderWidth:2,
            hoverborderColor:'#ffffff',
            data:ventas,
            
    
        }]
};
const opciones={
  maintainAspectRatio:false,
   responsive:true 
}
  return (
    <>
  
      <h1 className="center">Home</h1>
  <div className="columnasHome">
     <div>
       <Link href="/Producto">
          <a > <button className="btn-informes" type="button" > <OpenInBrowserIcon /> PRODUCTOS </button> </a>
       </Link>
     
       <small className="debajo">15</small>
      </div>
      
    <div>
       <Link href="/Cliente">
          <a > <button className="btn-informes debajo"> <SupervisorAccountIcon/> CLIENTES</button></a>
       </Link>
        <small className="debajo">15</small>
    </div>
    <div>
      <Link href="/Provedor">
        <a > <button className="btn-informes" > <LocalShippingIcon/>  PROVEEDORES</button> </a>
      </Link>
        <small className="debajo">15</small>
    </div>
    <div>
      <Link href="/Categoria">
        <a > 
        <button className="btn-informes"> <CategoryIcon />  CATEGORIAS</button>
        </a>
      </Link>
        <small className="debajo">15</small>
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
              <tr >
                <td>Pera</td>
                <td>5</td>
                </tr>
                <tr >
                <td>Limon</td>
                <td>4</td>
                </tr>  
                </tbody>   
          </table>
          
          
          <br></br>
          <br></br>
</div>
    </>
  );
}
