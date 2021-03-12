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
    
   const opcione={
    maintainAspectRatio:false,
     responsive:true 
  }
  const [datosInformes, setDatosInformes] = useState({})
  const openInforme1=()=>{
    handleOpen()
    setDatosInformes({})
    setDatosInformes ( {
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
    })
    setgraficoInforme(barras)
console.log(datosInformes)
  }
  const openInforme2=()=>{
    handleOpen()
    setDatosInformes({})
    setDatosInformes({
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
  })
console.log(datosInformes)
    setgraficoInforme(barras)
  }
  const openInforme3=()=>{
    setDatosInformes({})
    handleOpen()
    setDatosInformes ( {
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
  })
    setgraficoInforme(pastel)
  }
  const openInforme4=()=>{
    setDatosInformes({})
    setDatosInformes({})
    handleOpen()
    setDatosInformes({
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
  })
    setgraficoInforme(pastel)
  }
  const barras=(
    <Bar
    data={datosInformes}
    width='100%'
    height='325px'
    options={opcione}
    />
  )
  const pastel=(
    <Pie
    data={datosInformes}
    width='100%'
    height='325px'
    options={opcione}  
  />
  )
  const [graficoInforme,setgraficoInforme]=useState(barras)
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