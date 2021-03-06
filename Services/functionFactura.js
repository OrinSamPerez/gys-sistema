import {firebaseG }from '../BD-Firebase/firebase.conf';
const db = firebaseG.firestore();
const Itbis = 18
export function agregarProductoFactura(cantidadIn,cantidadMax, valuesProductos){
    console.log(cantidadMax) 
    console.log()
    if(parseInt(cantidadIn) <= parseInt(cantidadMax)){
        valuesProductos.cantidad = cantidadIn
        const valuePrecioCantidad = valuesProductos.precio * cantidadIn 
        valuesProductos.subTotal = valuePrecioCantidad
        const calcItbis = (valuePrecioCantidad * Itbis)/100  
        valuesProductos.itbis = calcItbis; 
        valuesProductos.total = calcItbis + valuePrecioCantidad

        if(valuesProductos.descuento === 0){
            firebaseG.auth().onAuthStateChanged(async (user) => {
                try{
                    await db.collection(user.email).doc('Producto-Factura-Temporal').collection('Producto-Factura-Temporal').doc(valuesProductos.id).set(valuesProductos)               
                }catch(error){
                      console.error(error);
                   }
                
              })
        }
        else if(valuesProductos.descuento != 0){
            const descuento = (valuesProductos.precio * valuesProductos.descuento)/100
            valuesProductos.total =  valuesProductos.total - descuento 
            firebaseG.auth().onAuthStateChanged(async (user) => {
                try{
                    await db.collection(user.email).doc('Producto-Factura-Temporal').collection('Producto-Factura-Temporal').doc(valuesProductos.id).set(valuesProductos)               
                }catch(error){
                      console.error(error);
                   }
                
              })
        }
    }
    else{
        alert('No puede agregar mas cantidad, de la cantidad existente')
    }
}