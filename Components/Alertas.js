import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
//Alertas notificaciones

//Alerta Error
export const alertaError = (mensaje)=>{
    toast.error(mensaje, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
}

//Alerta sastifactoria
export const alertaSactifactoria = (mensaje)=>{
  toast.success(mensaje, { 
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}