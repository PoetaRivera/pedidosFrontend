/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../componenteContexto";
import { Productos } from "../componentes/Productos.jsx";
import styles from "./paginaHacerPedidos.module.css";
import Tooltip from "@mui/material/Tooltip";
import { msjAyuda } from "../constantes/constantes.js";
import {
  obtenerProductos,
  crearMisProductos,
  agregarPedido,
  obtienePedido,
} from "../funciones/funcionesHacerPedido.js";

// -------------------------------------------------

//-------------------------------------------------
// Creamos un arreglo con un solo elemento para definir el esquema que tendra el arreglo misProductos
// y su estado inicial
const productoEsquema = [
  {
    id: "0",
    descripcion: "descripcion",
    precio: 0,
    nombre: "nombre",
    horaPedido: "hora",
    cantidad: 0,
  },
];

// Pagina para que el cliente haga sus pedidos
// -----------------------------------------------------------------------------------------------
export function PaginaHacerPedidos() {
  let { user } = useAuth();

  const [misProductos, setMisProductos] = useState(productoEsquema); // Adicionando a productos horaPedido y cantidad
  const [productos, setProductos] = useState([]); // Datos provenientes de firestore
  const [detalle, setDetalle] = useState([]); // Detalle del pedido
  const [pedido, setPedido] = useState({
    nombre: "",
    fecha: "",
    hora: "",
  }); // Almacena nombre, fecha y hora del pedido
  const [confirmar, setConfirmar] = useState(false); // hemos entrado a funcion obtener pedido
  const [enviar, setEnviar] = useState(false);
  const [msjAviso, setMsjAviso] = useState(false);
  const [msjDetalle, setMsjDetalle] = useState(false); //
  // const [mensaje, setMensaje] = useState("");
  const [estadoBotones, setEstadoBotones] = useState({
    boton1: false,
    boton2: true,
    boton3: true,
  });
  const [elTotalPedido, setElTotalPedido] = useState(0);
  const mensaje1 = "Debes hacer un pedido.  Haz click en reiniciar";

  // ------------------------------------------------------------------------------------------------
  const { boton1, boton2, boton3 } = estadoBotones;
  // ***************************************************************************************************

  // Solicita productos al servidor y los almacena en el estado productos
  useEffect(() => {
    obtenerProductos(setProductos);
  }, []);

  // ------------------------------------------------------------------------------------------------------
  // Luego creamos un nuevo arreglo "misProductos" que contenga productos
  // mas los campos cantidad y horaPedido.
  useEffect(() => {
    crearMisProductos(productos, setMisProductos);
  }, [productos]);
  // --------------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------------
  // funcion adiciona un pedido en la base de datos
  const guardarPedido = () => {
    agregarPedido(pedido, setMsjDetalle, misProductos);
    setEstadoBotones({ boton1: true, boton2: true, boton3: true });
  };
  // ---------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------
  // Esta es la funcion que prepara el pedido para ser enviado
  function confirmarPedido() {
    setConfirmar(true);
    setMsjDetalle(false);
    setMsjAviso(false);
    obtienePedido(
      misProductos,
      setDetalle,
      setPedido,
      setElTotalPedido,
      setMsjAviso,
      setConfirmar,
      setEstadoBotones,
      user
    );
  }
  // -----------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  // Habilita para mostrar el detalle del pedido
  function detallePedido() {
    if (confirmar) {
      setMsjDetalle(!msjDetalle);
      setEstadoBotones({ boton1: true, boton2: true, boton3: false });
    } else {
      setMsjAviso(true);
    }
  }
  // --------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  // Reinicia para hacer un nuevo pedido, o editar el actual
  const reIniciar = () => {
    setMsjAviso(false);
    setMsjDetalle(false);
    setElTotalPedido(0);
    setConfirmar(false);
    setDetalle(false);
    setEnviar(false);
    setEstadoBotones({ boton1: false, boton2: true, boton3: true });
    setMisProductos(misProductos);
  };
  // --------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  const {
    contenedorBoton,
    tituloBoton,
    principal,
    botones,
    boton,
    productosCss,
    producto,
    detalleCss,
    aviso,
    inhabilitado,
  } = styles;
  // --------------------------------------------------------------------------------------------

  // ******************************************************************************************
  return (
    <div className={principal}>
      <div className={botones}>
        <div className={contenedorBoton}>
          <p className={tituloBoton}>Paso 1🤔</p>

          <Tooltip arrow title={msjAyuda[0]} placement="top">
            <button
              disabled={boton1}
              className={boton1 ? inhabilitado : boton}
              onClick={confirmarPedido}
            >
              Confirmar
            </button>
          </Tooltip>
        </div>

        <div className={contenedorBoton}>
          <p className={tituloBoton}>Paso 2🤔</p>

          <Tooltip arrow title={msjAyuda[1]} placement="top">
            <button
              disabled={boton2}
              className={boton2 ? inhabilitado : boton}
              onClick={detallePedido}
            >
              detalle
            </button>
          </Tooltip>
        </div>

        <div className={contenedorBoton}>
          <p className={tituloBoton}>Paso 3🤔</p>

          <Tooltip arrow title={msjAyuda[2]} placement="top">
            <button
              disabled={boton3}
              className={boton3 ? inhabilitado : boton}
              onClick={guardarPedido}
            >
              Enviar
            </button>
          </Tooltip>
        </div>

        <div className={contenedorBoton}>
          <p className={tituloBoton}>?👉Reiniciar🤔</p>

          <Tooltip arrow title={msjAyuda[3]} placement="top">
            <button className={boton} onClick={reIniciar}>
              reIniciar
            </button>
          </Tooltip>
        </div>
      </div>
      {msjAviso && <h4 className={aviso}>{mensaje1}</h4>}

      <div className={productosCss}>
        {!msjDetalle
          ? misProductos.map(function (elem, index) {
              return (
                <Productos
                  className={producto}
                  key={elem.id}
                  idProducto={elem.id}
                  descripcionProducto={elem.descripcion}
                  precioProducto={elem.precio}
                  nombreProducto={elem.nombre}
                  horaPedido={elem.horaPedido}
                  cantidad={elem.cantidad}
                  misProductos={misProductos}
                  setMisProductos={setMisProductos}
                />
              );
            })
          : detalle.map(function (elem, index) {
              return (
                <div className={detalleCss} key={index}>
                  {elem}
                </div>
              );
            })}
      </div>
    </div>
  );
}
