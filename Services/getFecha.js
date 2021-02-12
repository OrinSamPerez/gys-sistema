export const getFecha = ()=>{
    var fecha = new Date();
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const diaActual = fecha.getDate()
    const añoActual = fecha.getFullYear()
    const horaActual = fecha.getHours();
    const mesActual = meses[fecha.getMonth()];
     const fechaActual = (`${diaActual}/${mesActual}/${añoActual}`)
    return fechaActual
}