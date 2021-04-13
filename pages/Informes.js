import {Bar, Line} from 'react-chartjs-2';
import React from 'react';
import {firebaseG} from '../BD-Firebase/firebase.conf'
import {useState} from 'react';
 
const db = firebaseG.firestore();

export default function Informes(){
const valuesProductosMasVendidos={ 
    descripcionP1:'',
    cantidadVP1:0,
    descripcionP2:'',
    cantidadVP2:0,
    descripcionP3:'',
    cantidadVP3:0,
    descripcionP4:'',
    cantidadVP4:0,
    descripcionP5:'',
    cantidadVP5:0,
}
const valuesProductosMenosVendidos={ 
    descripcionPM1:'',
    cantidadVPM1:0,
    descripcionPM2:'',
    cantidadVPM2:0,
    descripcionPM3:'',
    cantidadVPM3:0,
    descripcionPM4:'',
    cantidadVPM4:0,
    descripcionPM5:'',
    cantidadVPM5:0,
}
const [datosInforme, setdatosInforme]= useState([]);
const [productosMasV, setproductosMasV]= useState(valuesProductosMasVendidos);
const [productosMenosV, setproductosMenosV]= useState(valuesProductosMenosVendidos);
const [data3,setData3]=useState({})
const mesData= new Object()
const meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const documentos=[] 
meses.forEach(mes=>{
    mesData[mes] = 0;
    
})
let control=0;
if (datosInforme.length === 0){
firebaseG.auth().onAuthStateChanged(async (user) => {
    if(user != null){
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
                console.log('Le pedimos a Dios que funcione')
                control=control+1;
              }) 
              
        })
    }while(control<5)
    
     
     await db.collection(user.email).doc('Stock').collection('Stock').orderBy("Salida_Inicial", "desc").get().then(data=>{
         
        data.forEach(dataInforme=>{
            
            documentos.push({...dataInforme.data()})
          })
          setdatosInforme(documentos) 
          if (documentos.length >= 10)
            {setproductosMasV({ 
                descripcionP1:documentos[0].Descripcion,
                cantidadVP1:documentos[0].Salida_Inicial,
                descripcionP2:documentos[1].Descripcion,
                cantidadVP2:documentos[1].Salida_Inicial,
                descripcionP3:documentos[2].Descripcion,
                cantidadVP3:documentos[2].Salida_Inicial,
                descripcionP4:documentos[3].Descripcion,
                cantidadVP4:documentos[3].Salida_Inicial,
                descripcionP5:documentos[4].Descripcion,
                cantidadVP5:documentos[4].Salida_Inicial,
            })
            const n = documentos.length;
            setproductosMenosV({ 
                descripcionPM1:documentos[n-1].Descripcion,
                cantidadVPM1:documentos[n-1].Salida_Inicial,
                descripcionPM2:documentos[n-2].Descripcion,
                cantidadVPM2:documentos[n-2].Salida_Inicial,
                descripcionPM3:documentos[n-3].Descripcion,
                cantidadVPM3:documentos[n-3].Salida_Inicial,
                descripcionPM4:documentos[n-4].Descripcion,
                cantidadVPM4:documentos[n-4].Salida_Inicial,
                descripcionPM5:documentos[n-5].Descripcion,
                cantidadVPM5:documentos[n-5].Salida_Inicial,
            })}
        
      })
     
        
    }
    })
}

    
   const data1={
       labels:[productosMasV.descripcionP1, productosMasV.descripcionP2, productosMasV.descripcionP3, productosMasV.descripcionP4, productosMasV.descripcionP5],
       datasets:[{
           label:'Productos mas vendidos (Unidades)',
           backgroundColor:'#83BAFF',
           borderColor:'#2B2B2B',
           borderWidth:2,
           hoverBackgroundColor:'#00E1FF',
           hoverborderColor:'#83BAFF',
           data:[productosMasV.cantidadVP1,productosMasV.cantidadVP2,productosMasV.cantidadVP3,productosMasV.cantidadVP4,productosMasV.cantidadVP5]
       }]
   };
  
   const data2={
    labels:[productosMenosV.descripcionPM1,productosMenosV.descripcionPM2,productosMenosV.descripcionPM3,productosMenosV.descripcionPM4,productosMenosV.descripcionPM5],
    datasets:[{
        label:'Productos menos Vendidos (Unidades)',
        backgroundColor:'#83BAFF',
        borderColor:'#2B2B2B',
        borderWidth:2,
        hoverBackgroundColor:'#00E1FF',
        hoverborderColor:'#83BAFF',
        data:[productosMenosV.cantidadVPM1,productosMenosV.cantidadVPM2,productosMenosV.cantidadVPM3,productosMenosV.cantidadVPM4,productosMenosV.cantidadVPM5],
        

    }] 
};


   
   const mostrarInforme = (idInforme)=>{
   document.getElementById("informe1").style.display='none'
   document.getElementById("informe2").style.display='none'
   document.getElementById("informe3").style.display='none'
  
   document.getElementById(idInforme).style.display='block'
   
   }
 
   const opciones={
    maintainAspectRatio:false,
     responsive:true 
  
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
 
</section>
{ datosInforme.length >= 10 ?<>
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
      //  data={data3}
        width='100%'
        height='325px'
        options={opciones}
        />
    </div>
</>:<h1>{datosInforme.length}</h1>
}
</>
    )
}