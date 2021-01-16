import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Styles from "../../styles/Login.module.css";
import Link from "next/link";
import {loginSingIn} from '../../firebase.BD/firebase.conf'


export default function  Login() {
    const [open, setModal ] = useState(true)
    const singIn =(e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        loginSingIn(email, password)
        .then((resp)=>{
            setModal(false)
        })
    }
    return(
    <Modal 
    open={open}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    >
    <div className={Styles.container}>
    <form className={Styles.formMain}>
    <div className={Styles.formInfo}>
        <img src="https://www.flaticon.es/svg/vstatic/svg/2897/2897745.svg?token=exp=1610750718~hmac=52266b035fa5c9277e7f5546cd23d55b" />
        <h1>Iniciar Session</h1>
        <div>
        <label>
            <input
            id="email"
            type="email"
            required
            placeholder="Ingresa tu email aqui"
            />
        </label>
        </div>
        <div>
        <label>
            <input id="password" type="password" placeholder="Ingresa tu contraseña" />
        </label>
        </div>
        <Button onClick={singIn} variant="contained" color="default">
            <h2 className={Styles.seccion}>Iniciar Session</h2>
        </Button>
        <div className={Styles.links}>
  
        <Link href="/Registro/Registro">
            <a>
            <span> ¡Registrate aqui!</span>
            </a>
        </Link>
        <Link href="/registro">
            <a>
            <span> ¿Olvidaste tu contraseña?</span>
            </a>
        </Link>
        </div>
    </div>
    </form>
</div>
</Modal>
)
}