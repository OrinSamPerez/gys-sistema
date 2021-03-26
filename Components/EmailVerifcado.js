import Button from "@material-ui/core/Button";
import { firebaseG } from "../BD-Firebase/firebase.conf";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import {closeApp }from "../Services/closeApp";

export default function EmailVerifcado() {
  const Verificar = () => {
    var user = firebaseG.auth().currentUser;
    user
      .sendEmailVerification()
      .then(function () {
      })
      .catch((error) => {
        console.log(error);
      }); 

      

  };

  firebaseG.auth().onAuthStateChanged((user) => {
    if(user){
      if(user.emailVerified === true){
        location.reload();}
      }
  })
  return (
    <div>
      <div className="logo">
        <VerifiedUserIcon style={{ fontSize: 90 }} color="secondary" />
      </div>
      <h2>¡Hola! todavia su cuenta no ha sido verificada</h2>
      <h4>Por favor verifica tu cuenta, para aseguranos de que eres tu </h4>

      <Button onClick={Verificar} variant="outlined" color="primary">
        ¡Para verificar haga click aqui!
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <Button onClick={closeApp} variant="text" color="default">
        ¡Volver al login!
      </Button>

      <style jsx>{`
        div {
          text-align: center;
          padding: 12px;
        }
        input {
          width: 200px;
        }
        .edit {
          width: 270px;
        }
        .logo {
          margin-top: 80px;
        }
      `}</style>
    </div>
  );
}
