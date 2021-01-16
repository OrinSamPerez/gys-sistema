export const  validadorLogin = (password, nameEmpresa,number,confPassword)=>{
   
    
    

    if(password.lenght <= 7){
        alert('Su contraseña debe ser menor a 8 caracteres')
    }

    if (password != confPassword){
        alert('Las contraseñas no coinciden');
    }
    
    else if(nameEmpresa.lenght < 2){
        alert('Debe tener mas de dos carctares')
    }
   else if(number.lenght  <= 8 ){
       alert('El numero telefonico, tiene que ser mayor a 8')
   }

} 
