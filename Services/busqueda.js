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

//Busqueda  stock 


export const busquedaStock= (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.nombreProveedor; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}


//Busqueda nombre cliente
export const busquedaCliente = (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.nombreCliente; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}


//Busqueda categorias
export const busquedaCategoria= (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.descripcionCategoria; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}


//Busqueda Producto
export const busquedaProducto= (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.nombreProducto; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}
//Busqueda Por fecha
export const busquedaFecha= (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.fechaProducto; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}


//Busqueda Por factura
export const busquedaNoFactura = (arrayBusqueda, wordBusqueda)=>{
    let numeroPalabraBuscar = wordBusqueda.length;
    const result = arrayBusqueda.filter(word =>{
        const PalabraProducto = word.numeroFactura; 
        const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
        return caracterPalabrasActual.toLowerCase()  === wordBusqueda.toLowerCase() 
    }
    )
    return result
}

