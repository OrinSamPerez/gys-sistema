import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import React from 'react';
import {useState} from 'react';
import Modal from '@material-ui/core/Modal';


export default function Informes(){
 
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
   const data={
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
   const datas={
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
   const opcione={
    maintainAspectRatio:false,
     responsive:true 
  }
  const [datosInforme, setdatosInforme]= useState(data)
  const [opcionesInforme, setopcionesInforme]=useState(opciones)
  const [graficoInforme,setgraficoInforme]=useState(barras)
  const openInforme1=()=>{
    handleOpen()
    setdatosInforme(datas)
    setopcionesInforme(opcione)
    setgraficoInforme(barras)
  }
  const openInforme2=()=>{
    handleOpen()
    setdatosInforme(data)
    setopcionesInforme(opciones)
    setgraficoInforme(barras)
  }
  const openInforme3=()=>{
    handleOpen()
    setdatosInforme(data)
    setopcionesInforme(opciones)
    setgraficoInforme(pastel)
  }
  const openInforme4=()=>{
    handleOpen()
    setdatosInforme(data)
    setopcionesInforme(opciones)
    setgraficoInforme(pastel)
  }
  const barras=(
    <Bar
    data={datosInforme}
    width='100%'
    height='325px'
    options={opcionesInforme}
    />
  )
  const pastel=(
    <Pie
    data={data}
    width='100%'
    height='325px'
    options={opciones}  
  />
  )
    return(
      <>
  <h1 className="center">Informes</h1>
  <div className="columnas">
  <div>
  <button className="btn-informes" type="button" onClick={openInforme1} > PRODUCTOS MAS VENDIDOS</button>
  <Modal
          open={open}
          onClose={handleClose}
          
        >
    <div className="modal-informe1">
   
       <div className="fondo-informe">
       
        {graficoInforme}
         
        
      </div>
    </div> 
  </Modal>
  </div>
<div>
<button className="btn-informes" type="button" onClick={openInforme2}> Informe 2</button>

         
    
 
</div>
<div>
<button className="btn-informes" type="button" onClick={openInforme3} > Informe 3</button>
</div>
<div>
<button className="btn-informes" type="button" onClick={openInforme4}> Informe 4</button>
</div>

</div>



</>
    )
}