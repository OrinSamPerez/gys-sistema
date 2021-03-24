import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { firebaseG } from "../../firebase.BD/firebase.conf";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import { getFecha } from "../../Services/getFecha";
import Fab from '@material-ui/core/Fab'
import swal from 'sweetalert';
import CloseIcon from "@material-ui/icons/Close";
const db = firebaseG.firestore();
 const fechaDate = new Date();

export default function FormsProducto(props) {
  const [fecha, setFecha] = useState(getFecha);
  const valueInitial = {
    nombreProducto: "",
    cantidadProducto: 1,
    imageProducto: "",
    fechaProducto: fecha,
    proveedorProducto: "",
    categoriaProducto: "",
    precioCompraProducto:1,
    precioVentaProducto:1,
    descuentoProducto:0,
    id_Producto:''
  };
  const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 1,
    COMPLETE: 3,
  };
  const [values, setValues] = useState(valueInitial);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [file, setFile] = useState(null);
  const [task, setTask] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [getProveedor, setGetProveedor] = useState([]);
  const [getCategoria, setGetCategoria] = useState([]);
  const getDataProveedor = () => {
    firebaseG.auth().onAuthStateChanged(async (user) => {
      db.collection(user.email)
        .doc("Proveedor")
        .collection("Proveedor")
        .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push(doc.data());
          });
          setGetProveedor(docs);
        });
    });
  };

  const getDataCategoria = () => {
    firebaseG.auth().onAuthStateChanged(async (user) => {
      db.collection(user.email)
        .doc("Categoria")
        .collection("Categoria")
        .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push(doc.data());
          });
          setGetCategoria(docs);
        });
    });
  };

  useState(() => {
    getDataProveedor();
    getDataCategoria();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadImage = (file) => {
    firebaseG.auth().onAuthStateChanged(async (user) => {
      setEmail(user.email);
    });
    const ref = firebaseG
      .storage()
      .ref(`/imagesProducto/${file.name}`);
    const task = ref.put(file);
    return task;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getDataId = async (id) => {
    firebaseG.auth().onAuthStateChanged(async (user) => {
      const doc = await db
        .collection(user.email)
        .doc("Producto")
        .collection("Producto")
        .doc(id)
        .get();
      setValues({ ...doc.data() });
    });
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    const task = uploadImage(file);
    setTask(task);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...valueInitial });
    } else {
      getDataId(props.currentId);
    }
  }, [props.currentId]);
  useEffect(() => {
    if (task) {
      const onProgress = () => {
        handleOpen();
      };
      const onError = () => {
        console.log("error");
      };
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then((imgUrl) => {
          setImage(imgUrl);
          handleClose();
        });
      };
      task.on("state_change", onProgress, onError, onComplete);
    }
  }, [task]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameProveedor = document.getElementById("nameProveedor").value;
    values.imageProducto = image;
    values.proveedorProducto = nameProveedor;
    if(values.nombreProducto != ''){
      if(values.proveedorProducto != ''){
        if(values.categoriaProducto != ''){
          values.id_Producto= `${fechaDate.getFullYear()}${fechaDate.getMonth()+1}${fechaDate.getDate()}${fechaDate.getHours()}${fechaDate.getSeconds()}-${values.nombreProducto}`;
          props.addProducto(values);
          setValues({ ...valueInitial });
          setImage(null);
        }else{ swal("¡Alerta!", "No puedes dejar la categoria vacia", "info")}
      }else{ swal("¡Alerta!", "No puedes dejar el nombre proveedor vacio", "info")}
    }else{ swal("¡Alerta!", "No puedes dejar el nombre del producto vacio", "info")}
  };
  const handleDeleteImg = () => { 
    const refDelete = firebaseG
      .storage()
      .ref()
      .child(`/imagesProducto/${file.name}`);
    refDelete.delete().then(() => {
      setImage(null);
    });
  };
  return (
    <>
    <div  >
      <form onSubmit={handleSubmit}>
      {props.currentId === ""? (<h2>Registrar Producto</h2> ) : (<h2>Actualizar Producto</h2>)}
     
      
      <div>
        <label   >Descripcion</label><input
         className="inputd-producto" 
          type="text"
          value={values.nombreProducto}
          onChange={handleInputChange}
          placeholder="Descripcion del producto"
          name="nombreProducto"
        />
         <label >Proveedor</label>
        {getProveedor.length === 0 ? (
          <Link href="/Provedor">
            <Button variant="container" color="primary">
              Añadir Proveedor
            </Button>
          </Link>
        ) : (
          <select
         
            required
            name="proveedorProducto"
            id="nameProveedor"
            onChange={handleInputChange}
          >
            <option value=" ">No selecionado</option>
            {getProveedor.map((proveedor) => (
              <option value={proveedor.nombreProveedor}>
                {proveedor.nombreProveedor}
              </option>
            ))}
          </select>
        )}
        
       <label  >Cantidad</label> <input
          className="nproducto" 
          type="number"
          min={1}
          value={values.cantidadProducto}
          onChange={handleInputChange}
          placeholder="Cantidad en unidades de productos"
          name="cantidadProducto"
        />
       
       <label >Precio de Compra</label> <input
          className="nproducto"  
          type="number"
          min={1}
          value={values.precioCompraProducto}
          onChange={handleInputChange}
          placeholder="Precio de Compra"
          name="precioCompraProducto"
        />
         
        
        </div>
        <div>
        <label className="rellenar">Imagen</label>
        <input
          onChange={handleInputChange}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          name="imageProducto"
          placeholder="Arrastar imagen aqui"
          className="inputd-producto" 
        />
          
          
          
        <label className="rellenar1">Categoria</label>
        {getCategoria.length === 0 ? (
          <Link href="/Categoria">
            <Button variant="container" color="primary">
              Añadir Categoria
            </Button>
          </Link>
        ) : (
          <select
         
            required
            name="categoriaProducto"
            id="nameCategoria"
            onChange={handleInputChange}
          >
            <option value="Ninguno">No selecionado</option>
            {getCategoria.map((categoria) => (
              <option value={categoria.descripcionCategoria}>
                {categoria.descripcionCategoria}
              </option>
            ))}
          </select>
        )}
        <label >Descuento</label><input
          className="nproducto" 
          type="number"
          min={1}
          max={100}
          value={values.descuentoProducto}
          onChange={handleInputChange}
          placeholder="Aplicar descuento"
          name="descuentoProducto"
        />
        
       
        
       
        <label className="rellenar3">Precio de Venta</label><input
         className="nproducto" 
          type="number"
          min={1}
          value={values.precioVentaProducto}
          onChange={handleInputChange}
          placeholder="Precio de venta"
          name="precioVentaProducto"
        />
      {image && (
          <section>
            <button onClick={handleDeleteImg}>
              <CloseIcon />
            </button>
            <img src={image} />
          </section>
        )}
       
        </div>
        <Button onClick={handleSubmit} variant="text" color="default">
         <Fab color="default" aria-label="">
             {props.currentId === ""? (<><AddCircleOutlineIcon style={{fontSize:25}} color="secondary"/> {console.log('editar')} </>) : (<EditIcon color="primary" /> )}
             </Fab>
           </Button>
          
      </form>
</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="progress">
          <CircularProgress color="iherent" />
        </div>
      </Modal>
      <style jsx>{`
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px solid #b6b8bb"
            : "3px solid red"};
            resize:none;
            border-radius: 5px;
            margin-top: 5px;
            
        }

        img {
          width: 40px;
        }
        .progress {
          color: white;
          border: none;
          margin-top: 20%;
          margin-left: 40%;
        }
        .reduce-input {
          width: 0%;
        }
      `}</style>
    </>
  );
}
