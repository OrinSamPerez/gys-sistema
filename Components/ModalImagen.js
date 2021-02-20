import {useState} from 'react'
import Modal from '@material-ui/core/modal'
export default function ModalImagen(){
    const [open, close] = useState(false)
    const imagenLogo = (
        <Modal open={open}>

        </Modal>
    )
    const [body, setBody] = useState(imagenLogo)

    return ({body})
}