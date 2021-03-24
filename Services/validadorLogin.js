let enviar = ''
export const  validadorLogin = (password,email, nameEmpresa,  confPassword)=>{
    console.log(password, confPassword)

    const paramsRequired = {
        number:true,
        lowerCase:true,
        capitalLetter:true,
        letter:true
     }
     const charName = 3;
     const numberMaxPassword = 12;
     const numberMinPassword = 8;
      const Domain = [
          'gmail.com',
          'hotmail.com',
      ]
    let i = 0;
    let texto;
    console.log(nameEmpresa)
    console.log(nameEmpresa.length)
    console.log(password, confPassword)
    if(charName <= nameEmpresa.length){
        const charEmail = email.indexOf("@")
        const numberChar =  email.substring(charEmail, charEmail + 1 )
        if(numberChar === "@" ){
            console.log(password, confPassword)
            const domain =  email.substring(charEmail + 1 ) 
            const result = Domain.filter(word => word === domain )
            Domain.forEach(element => {
                if(domain === element ){
                    if(password.length <= numberMaxPassword && password.length >=  numberMinPassword ){
                        if(paramsRequired.number === true){
                            var numeros="0123456789";
                            for(i=0; i<password.length; i++){
                                if (numeros.indexOf(password.charAt(i),0)!=-1){
                                    if (paramsRequired.letter === true){
                                        var letras="abcdefghyjklmnñopqrstuvwxyz";
                                        texto = password.toLowerCase();
                                        for(i=0; i<texto.length; i++){
                                            if (letras.indexOf(texto.charAt(i),0)!=-1){
                                                if(paramsRequired.capitalLetter === true){
                                                    var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
                                                    for(i=0; i<texto.length; i++){
                                                        if (letras_mayusculas.indexOf(password.charAt(i),0)!=-1){
                                                           if(paramsRequired.lowerCase === true){
                                                                for(i=0; i<texto.length; i++){
                                                                   if (letras.indexOf(texto.charAt(i),0)!=-1){
                                                                      if(password === confPassword){
                                                                            return enviar = email
                                                                            
                                                                      }
                                                                      else if(password != confPassword){
                                                                          return 'Contraseña-no'
                                                                          
                                                                      }
                                                                   }
                                                                }
                                                                
                                                            }
                                                        }
                                                     }return 'contraseña-insegura'
                                                     
                                                }
                                            }
                                        }
                                        
                                    }
                                }
                             }
                             return  'contraseña-insegura'
                        }
                    }
                    else{
                        'contraseña-mal'
                    }
                }
            });
        }
        else{
            return '@'
        }
    }
    else{
        return 'nombre-corto'
    }
    return enviar

} 
