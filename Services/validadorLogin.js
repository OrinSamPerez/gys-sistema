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
          'outlook.com'
      ]
    let i = 0;
    let texto;
    console.log(nameEmpresa)
    console.log(nameEmpresa.length)
    console.log(password, confPassword)
    if(charName <= nameEmpresa.length){
        alert('si es mayor')
        const charEmail = email.indexOf("@")
        const numberChar =  email.substring(charEmail, charEmail + 1 )
        if(numberChar === "@" ){
            console.log(password, confPassword)
            const domain =  email.substring(charEmail + 1 ) 
            const result = Domain.filter(word => word === domain )
            console.log(result)
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
                                                                            enviar = email
                                                                            console.log('si')
                                                                      }
                                                                      else if(password != confPassword){
                                                                          return alert(password, confPassword)
                                                                          
                                                                      }
                                                                   }
                                                                }
                                                                
                                                            }
                                                        }
                                                     }
                                                     
                                                }
                                            }
                                        }
                                        return alert('La contraseña debe contener, por lo menos una letra minuscula y mayucula');
                                        
                                    }
                                }
                             }
                             return alert('la contraseña de contener, numeros');
                        }
                                               }
                    else{
                        alert('La contraseña tiene que mayor a 8 y menor a 12') 

                    }
                }
            });
        }
        else{
            return alert('El correo no cotinene un @')
        }
    }
    else{
        return alert('Nombre muy corto')
    }
    return enviar

} 
