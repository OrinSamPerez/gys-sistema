import Button from "@material-ui/core/Button";
import {enviarDatoProveedor} from '../../firebase.BD/ProvedorDB';
const proveedorInputs = () => {
  const nombreProveedor = document.getElementById("nombreProveedor").value;
  const dirrecion = document.getElementById("dirrecion").value;
  const cargoRepresentante = document.getElementById("cargoRepresentante").value;
  const telefono = document.getElementById("telefono").value;
  const emailProveedor = document.getElementById("email").value;
  const terminosPago = document.getElementById("terminosPago").value;
  const notaProveedor = document.getElementById("notaProveedor").value;
  enviarDatoProveedor(
    emailProveedor,
    terminosPago,
    notaProveedor,
    telefono,
    dirrecion,
    cargoRepresentante,
    nombreProveedor
  );
  
};

export const FormsProveedor = (
  <form className="form-modal">
    <h1>Añadir proveedor</h1>
    <div>
      <label>
        <input
          type="text"
          id="nombreProveedor"
          placeholder="Nombre del proveedor"
          required
        />
      </label>
      <label>
        <input
          type="text"
          id="terminosPago"
          placeholder="Terminos de pago"
          required
        />
      </label>
    </div>
    <div>
      <label>
        <input
          type="text"
          id="dirrecion"
          placeholder="Dirrecion del proveedor"
          required
        />
      </label>
      <label>
        <input
          type="text"
          id="cargoRepresentante"
          placeholder="Cargo del Representante"
          required
        />
      </label>
    </div>
    <div>
      <label>
        <input type="text" id="telefono" placeholder="Telefono" required />
      </label>
      <label>
        <input type="email" id="email" placeholder="Email" required />
      </label>
    </div>

    <div>
      <textarea id="notaProveedor" placeholder="Añadir nota..."></textarea>
    </div>
    <div>
      <Button variant="contained" color="secondary">
        Cancelar
      </Button>
      &nbsp; &nbsp;
      <Button
        variant="contained"
        onClick={proveedorInputs}
        onKeyPress={proveedorInputs}
        color="primary"
      >
        Añadir
      </Button>
    </div>
  </form>
);
