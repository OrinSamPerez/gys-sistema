//Por Id
export const busquedaId = (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.id; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}

//Busqueda por descripicon

export const busquedaDescripcion = (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.Descripcion; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}