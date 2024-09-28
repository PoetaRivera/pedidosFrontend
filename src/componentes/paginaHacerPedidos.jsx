/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../componenteContexto";
import { Productos } from "../componentes/Productos.jsx";
import { obtenerHora } from "../funciones/obtenerHora";
import { obtenerFecha } from "../funciones/obtenerFecha.js";
import { productosRequest, agregarPedidoRequest } from "../api/auth.js";
import styles from "./paginaHacerPedidos.module.css";
// -------------------------------------------------
import {
  crearPedidoBase,
  procesarProductos,
  limpiarCantidad,
} from "../funciones/funcionesObtenerPedido.js";

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

  const [misProductos, setMisProductos] = useState(productoEsquema);
  const [productos, setProductos] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [pedido, setPedido] = useState({});
  const [confirmar, setConfirmar] = useState(false); // hemos entrado a funcion obtener pedido
  const [ver, setVer] = useState(true);
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
  const mensajeInformacion = "";
  // ------------------------------------------------------------------------------------------------
  const { boton1, boton2, boton3 } = estadoBotones;
  // ***************************************************************************************************

  // Solicita productos al servidor y los almacena en el estado productos
  const obtenerProductos = async () => {
    try {
      const res = await productosRequest();
      setProductos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);
  // ******************************************************************************************************
  // Luego creamos un nuevo arreglo "misProductos" que contenga productos
  // mas  los campos cantidad y horaPedido.
  useEffect(() => {
    if (productos.length > 0) {
      const misProductosNuevos = productos.map((elemento) => ({
        ...elemento,
        horaPedido: "hora",
        cantidad: 0,
      }));
      setMisProductos(misProductosNuevos);
    } else console.log("productos no actualizados");
  }, [productos]);

  // *******************************************************************************************************
  //Adiciona un pedido en la base de datos
  const agregarPedido = async () => {
    try {
      const response = await agregarPedidoRequest(pedido);
      setMsjDetalle(false);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  // *****************************************************************************************
  const convertirArregloAString = (arreglo) => {
    const arregloACadena = arreglo.map((elemento) => String(elemento));
    const mensaje = arregloACadena.join("\n");

    return mensaje;
  };
  // *****************************************************************************************

  // *********************************************************************************************
  // Obtiene el pedido y lo prepara para enviarlo al backend
  function obtienePedido() {
    if (!user?.alias) {
      return;
    }
    // ----------------------------------------------------------------------------------------------
    // Obtenemos el alias; la hora y la fecha del pedido
    const alias = user.alias;
    const horaPedido = obtenerHora();
    const fechaPedido = obtenerFecha();

    let miPedido = {
      alias: alias,
      horaPedido: horaPedido,
      fechaPedido: fechaPedido,
    };

    // ------------------------------------------------------------------------------------------------
    // prepara los productos pedidos, el  detalle a presentar y determina el total en dolares del pedido.
    let { productosPedido, detalleNuevo, totalPedido } =
      procesarProductos(misProductos);

    // ----------------------------------------------------------------------------------------------
    // Genera el detalle final y une la base del pedido con los productos, para dejar el pedido listo
    // para enviar
    detalleNuevo = [
      ...detalleNuevo,
      `total: ${totalPedido}`,
      `horaPedido: ${horaPedido}`,
      `fechaPedido: ${fechaPedido}`,
      `Alias: ${user.alias}`,
    ];

    // parte nueva: convierte arreglo detalle a string y actualiza el estado
    const mensaje = convertirArregloAString(detalleNuevo).concat("\n");
    miPedido = { miPedido, productosPedido, mensaje };
    // parte nueva

    // ----------------------------------------------------------------------------------------------
    // Actualiza el estado del detalle del pedido para ser presentado
    setDetalle(detalleNuevo);

    // Actualiza el estado del pedido para ser enviado al backend
    setPedido(miPedido);
    setElTotalPedido(totalPedido);

    if (totalPedido === 0) {
      setMsjAviso(true);
      setConfirmar(false);
      setEstadoBotones({ boton1: false, boton2: true, boton3: true });
      return;
    } else {
      limpiarCantidad(misProductos);
      setEstadoBotones({ boton1: true, boton2: false, boton3: true });
    }
  }
  // ****************************************************************************************
  // ----------------------------------------------------------------------------------------
  function confirmarPedido() {
    setConfirmar(true);
    setMsjDetalle(false);
    setMsjAviso(false);
    obtienePedido();
  }
  // -----------------------------------------------------------------------------------------
  function detallePedido() {
    if (confirmar) {
      setMsjDetalle(!msjDetalle);
      setEstadoBotones({ boton1: true, boton2: true, boton3: false });
    } else {
      setMsjAviso(true);
    }
  }

  const guardarPedido = () => {
    agregarPedido();
    setEstadoBotones({ boton1: true, boton2: true, boton3: true });
  };

  const reIniciar = () => {
    setMsjAviso(false);
    setMsjDetalle(false);
    setElTotalPedido(0);
    setConfirmar(false);
    setDetalle(false);
    setEnviar(false);
    setEstadoBotones({ boton1: false, boton2: true, boton3: true });
  };
  const ocultar = () => {
    setVer(!ver);
  };

  const {
    principal,
    botones,
    boton,
    productosCss,
    producto,
    detalleCss,
    aviso,
    instrucciones,
    inhabilitado,
    contenedorInstrucciones,
    botonMostrar,
    mostrarInstrucciones,
  } = styles;
  // ******************************************************************************************

  return (
    <div className={principal}>
      <div className={ver ? contenedorInstrucciones : mostrarInstrucciones}>
        {ver && (
          <p className={instrucciones}>
            - Coloca la cantidad deseada de cada producto.<br></br>- Haz click
            en el botón confirmar pedido, si estás seguro de tu pedido.<br></br>
            - Haz click en el botón ver detalle, para ver el detalle de tu
            pedido.
            <br></br>- Y si estás seguro de tu pedido, haz click en enviar
            pedido.
            <br></br>si no haz enviado tu pedido puedes reiniciar <br></br> el
            proceso con el botón Re-iniciar
          </p>
        )}
        <button className={ver ? boton : botonMostrar} onClick={ocultar}>
          {ver ? "Ocultar Ayuda" : "Mostrar Ayuda"}
        </button>
      </div>

      <div className={botones}>
        <button
          disabled={boton1}
          className={boton1 ? inhabilitado : boton}
          onClick={confirmarPedido}
        >
          1. Confirmar pedido
        </button>
        <button
          disabled={boton2}
          className={boton2 ? inhabilitado : boton}
          onClick={detallePedido}
        >
          2. Ver detalle
        </button>
        <button
          disabled={boton3}
          className={boton3 ? inhabilitado : boton}
          onClick={guardarPedido}
        >
          3. Enviar pedido
        </button>
        <button className={boton} onClick={reIniciar}>
          Re-iniciar
        </button>
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
