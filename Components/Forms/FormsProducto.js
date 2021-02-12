import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { firebaseG } from "../../firebase.BD/firebase.conf";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import { getFecha } from "../../Services/getFecha";
import CloseIcon from "@material-ui/icons/Close";
const db = firebaseG.firestore();

export default function FormsProducto(props) {
  const [fecha, setFecha] = useState(getFecha);
  const valueInitial = {
    nombreProducto: "",
    cantidadProducto: 1,
    imageProducto: "",
    fechaProducto: fecha,
    proveedorProducto: "",
    categoriaProducto: "",
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
      .ref(`/${email}/imagesProducto/${file.name}`);
    const task = ref.put(file);
    console.log(task)
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
    //const nameCategoria = document.getElementById('nameCategoria').value
    values.imageProducto = image;
    values.proveedorProducto = nameProveedor;
    // values.categoriaProducto = nameCategoria
    props.addProducto(values);
    setValues({ ...valueInitial });
    setImage(null);
  };
  const handleDeleteImg = () => {
    const refDelete = firebaseG
      .storage()
      .ref()
      .child(`${email}/imagesProducto/${file.name}`);
    refDelete.delete().then(() => {
      setImage(null);
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={values.nombreProducto}
          onChange={handleInputChange}
          placeholder="Descripcion del producto"
          name="nombreProducto"
        />
        <input
          type="number"
          min={1}
          value={values.cantidadProducto}
          onChange={handleInputChange}
          placeholder="Cantidad en unidades de productos"
          name="cantidadProducto"
        />
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
        <textarea
          onChange={handleInputChange}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          name="imageProducto"
        >
          Arrastar imagen aqui
        </textarea>
        {image && (
          <section>
            <button onClick={handleDeleteImg}>
              <CloseIcon />
            </button>
            <img src={image} />
          </section>
        )}
        <Button onClick={handleSubmit} variant="text" color="default">
          {props.currentId === "" ? (
            <>
              <SendIcon color="secondary" />{" "}
            </>
          ) : (
            <EditIcon color="primary" />
          )}
        </Button>
      </form>

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
            ? "3px solid #09f"
            : "3px solid red"};
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
