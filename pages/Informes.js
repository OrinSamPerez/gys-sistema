import {Bar, Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import React from 'react';


 



export default function Informes(){
 
   const data1={
       labels:['Fresa', 'Arroz', 'Azucar', 'Guineo', 'Lechuga'],
       datasets:[{
           label:'Productos mas vendidos (Unidades)',
           backgroundColor:'rgba(0,255,255)',
           borderColor:'black',
           borderWidth:2,
           hoverBackgroundColor:'rgba(0,255,255,0.63)',
           hoverborderColor:'#ffffff',
           data:[700,600,650,725,510]
       }]
   };
   const opciones={
     maintainAspectRatio:false,
      responsive:true 
   }
   const data2={
    labels:['Platano', 'Yuca', 'Aguacate', 'Maiz', 'Papa'],
    datasets:[{
        label:'Productos menos Vendidos (Unidades)',
        backgroundColor:'rgba(0,255,225)',
        borderColor:'black',
        borderWidth:2,
        hoverBackgroundColor:'rgba(0, 255, 255, 0.603)',
        hoverborderColor:'#ffffff',
        data:[150,300,125, 250,400],
        

    }]
};
const meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const ventas=[10,20,30,40,50,60,70,50,42,95,78,100]
    const data3={
        labels:meses,
        datasets:[{
            label:'Ventas Mensuales (Ganancias)',
            backgroundColor:'rgba(0,255,225)',
            borderColor:'black',
            borderWidth:2,
            hoverBackgroundColor:'rgba(0, 255, 255, 0.603)',
            hoverborderColor:'#ffffff',
            data:ventas,
            
    
        }]
};
const data4={
    labels:['Platano', 'Yuca', 'Aguacate', 'Maiz', 'Papa','Fresa','Arroz','Guineo','Lechuga','Azucar'],
    datasets:[{
        label:'Productos Menos Vendidos (Unidades)',
        backgroundColor: [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF",
            "#FF6310",
            "#63FF25",
            "#84FF55",
            "#846363",
            "#638490"
        ],
        borderColor:'white',
        borderWidth:3,
        hoverBackgroundColor: [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF",
            "#FF6310",
            "#63FF25",
            "#84FF55",
            "#846363",
            "#638490"
        ],
        hoverborderColor:'#ffffff',
        data:[150,300,125, 250,400,700,600,725,510,650],
        

    }]
};
   const mostrarInforme = (idInforme)=>{
   document.getElementById("informe1").style.display='none'
   document.getElementById("informe2").style.display='none'
   document.getElementById("informe3").style.display='none'
   document.getElementById("informe4").style.display='none'
   document.getElementById(idInforme).style.display='block'
   
   }
 
  
  
    return(
      <>
  <h1 className="columnas-text">Informes</h1>
  <section className="columnas" >
  <div >
  <button  type="button" onClick={()=>mostrarInforme("informe1")} > Productos Mas Vendidos</button>
  
  </div>
<div>
<button  type="button" onClick={()=>mostrarInforme("informe2")}> Productos Menos Vendidos</button>

</div>
<div>
<button  type="button" onClick={()=>mostrarInforme("informe3")} > Ventas Mensuales</button>
</div>
<div>
<button  type="button" onClick={()=>mostrarInforme("informe4")}> Total de Productos</button>
</div>
</section>

<div id="informe1" >
<Bar
    data={data1}
    width='100%'
    height='325px'
    options={opciones}
    />
</div>
<div id="informe2" >
<Bar
    data={data2}
    width='100%'
    height='325px'
    options={opciones}  
    />
</div>
<div id="informe3" >
<Line
    data={data3}
    width='100%'
    height='325px'
    options={opciones}
    />
</div>
<div id="informe4" >
<Pie
    data={data4}
    width='100%'
    height='325px'
    options={opciones}  
    />
</div>
</>
    )
}