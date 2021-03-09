import {Pie} from 'react-chartjs-2';

export default function Home() {
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
  return (
    <>
  
      <h1 className="center">Home</h1>
  <div className="columnas">
     <div>
       <button className="btn-informes" type="button"> PRODUCTOS </button>
  
      </div>
    <div>
        <button className="btn-informes"> CLIENTES</button>
    </div>
    <div>
        <button className="btn-informes" > PROVEEDORES</button>
    </div>
    <div>
        <button className="btn-informes"> CATEGORIAS</button>
    </div>

  </div>


<div>
    <Pie
      data={data}

      options={opciones}  
    />
</div>
    </>
  );
}
