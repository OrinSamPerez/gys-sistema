import emailjs from 'emailjs-com';
export const enviarCorreo = async (mensaje) =>{
    emailjs.send("service_9tcef9z","template_b5dfmeb",mensaje, "user_f0BIzPQzmrASZorH7Da4S").then(result=>{})
}