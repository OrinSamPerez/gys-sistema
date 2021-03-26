export function correoValidador(correo){
    const correoRegistrado = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (correoRegistrado.test(correo)) {
        const letrasCorreo= correo.indexOf("@")
        const numerosLetras =  correo.substring(letrasCorreo+ 1 )
        if(numerosLetras === 'gmail.com'){ return true }
        else if(numerosLetras === 'hotmail.com'){ return true }
        else{return false}
    } else {
      return false
    }
}

export function contraseñaValidador(contraseña){
    let i;
    let texto;
    if(contraseña.length >= 8){
            var numeros="0123456789";
            for(i=0; i<contraseña.length; i++){
                if (numeros.indexOf(contraseña.charAt(i),0)!=-1){
                        var letras="abcdefghyjklmnñopqrstuvwxyz";
                        texto = contraseña.toLowerCase();
                        for(i=0; i<texto.length; i++){
                            if (letras.indexOf(texto.charAt(i),0)!=-1){
                                    var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
                                    for(i=0; i<texto.length; i++){
                                        if (letras_mayusculas.indexOf(contraseña.charAt(i),0)!=-1){
                                                for(i=0; i<texto.length; i++){
                                                   if (letras.indexOf(texto.charAt(i),0)!=-1){
                                                      return true
                                                   }
                                                }
                                        } else{ return false}
                                     
                            }
                        }
                        else{ return false}
                        
                    }
                }
             }
             return false
        }
}