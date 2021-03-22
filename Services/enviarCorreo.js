import emailjs from 'emailjs-com';
const enviarFactura = async () =>{
    var templateParams = {
                  Title:`El cliente con el correo ${user.email} ha realizado una cotizacion`,
                  FromTo:`${user.email}`,
                  day:`${fecha.getDate()}/${meses[fecha.getMonth()]}/${fecha.getFullYear()}`,
                  hours:`${hora}`,
                  message:`¡PARA MAS INFORMACION REVISAR EN LA PAGINA DE CLIENTES!`,
                  reply_to:`${user.email}`,
                  sendEmailDynamic:`${doc.data().emailEmpresa}`
              };

    emailjs.send("service_9tcef9z","template_b5dfmeb",templateParams, "user_f0BIzPQzmrASZorH7Da4S").then(result=>{})

  
}