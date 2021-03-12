import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import React from 'react';
import {useState} from 'react';



export default function Informes(){
 
   const data1={
       labels:['Haiti', 'Cuba', 'Italia', 'Japon', 'China'],
       datasets:[{
           label:'Habitantes',
           backgroundColor:'rgba(0,255,0,1)',
           borderColor:'black',
           borderWidth:1,
           hoverBackgroundColor:'rgba(0,255,0,0.2)',
           hoverborderColor:'#FF0000',
           data:[525.25,126.19,325.69,4152,5200]
       }]
   };
   const opciones={
     maintainAspectRatio:false,
      responsive:true 
   }
   const data2={
    labels:['Platano', 'Yuca', 'Aguacate', 'Maiz', 'Papa'],
    datasets:[{
        label:'Productos mas Vendidos',
        backgroundColor:'rgba(0,255,225)',
        borderColor:'black',
        borderWidth:1,
        hoverBackgroundColor:'rgba(0, 255, 255, 0.603)',
        hoverborderColor:'#FF0000',
        data:[150,300,125, 250,400],
        

    }]
};
   
 
  
  
    return(
      <>
  <h1 className="center">Informes</h1>
  <div className="columnas">
  <div>
  <button className="btn-informes" type="button"  > PRODUCTOS MAS VENDIDOS</button>
  
  </div>
<div>
<button className="btn-informes" type="button" > Informe 2</button>

         
    
 
</div>
<div>
<button className="btn-informes" type="button"  > Informe 3</button>
</div>
<div>
<button className="btn-informes" type="button"> Informe 4</button>
</div>

</div>
<div>
<Bar
    data={data1}
    width='100%'
    height='325px'
    options={opciones}
    />
</div>
<div>
<Pie
    data={data2}
    width='100%'
    height='325px'
    options={opciones}  
    />
</div>

</>
    )
}