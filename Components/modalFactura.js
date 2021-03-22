import {useState} from 'react'
import {firebaseG} from '../firebase.BD/firebase.conf'
const db =  firebaseG.firestore();
const auth =  firebaseG.auth();                                                                                                                                                                                                                                                         
export default function ModalFactura(props){
    const [datos, setDatos] = useState([])

    return(
       <div>
       </div>
    )
}