export function emailValidador(email){
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email)) {
        const charEmail = email.indexOf("@")
        const numberChar =  email.substring(charEmail + 1 )
        if(numberChar === 'gmail.com'){ return true }
        else if(numberChar === 'hotmail.com'){ return true }
        else{return false}
    } else {
      return false
    }
}

export function contraseñaPassword(password){
    let i;
    let texto;
    if(password.length >= 8){
            var numeros="0123456789";
            for(i=0; i<password.length; i++){
                if (numeros.indexOf(password.charAt(i),0)!=-1){
                        var letras="abcdefghyjklmnñopqrstuvwxyz";
                        texto = password.toLowerCase();
                        for(i=0; i<texto.length; i++){
                            if (letras.indexOf(texto.charAt(i),0)!=-1){
                                    var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
                                    for(i=0; i<texto.length; i++){
                                        if (letras_mayusculas.indexOf(password.charAt(i),0)!=-1){
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