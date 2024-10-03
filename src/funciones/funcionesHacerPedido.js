import { productosRequest, agregarPedidoRequest } from "../api/auth";

import { obtenerHora } from "../funciones/obtenerHora";
import { obtenerFecha } from "../funciones/obtenerFecha.js";

 
export function crearPedidoBase(alias, horaPedido, fechaPedido) {
  return {
    alias: alias,
    horaPedido: horaPedido,
    fechaPedido: fechaPedido,
  };
}

// crea un nuevo arreglo "misProductos" que contenga productos
// mas  los campos cantidad y horaPedido.
export const crearMisProductos = async (productos, setMisProductos) => {
   if (productos.length > 0) {
     const misProductosNuevos = productos.map((elemento) => ({
       ...elemento,
       horaPedido: "hora",
       cantidad: 0,
     }));
     setMisProductos(misProductosNuevos);
   } else console.log("productos no actualizados");
 };

//Declaracion de funcion Solicita productos al servidor y los almacena en el estado productos
export const obtenerProductos = async (setProductos) => {
  try {
    const res = await productosRequest();
    setProductos(res.data);
  } catch (error) {
    console.error(error);
  }
};

// Elabora el pedido y el detalle del pedido
export function procesarProductos(misProductos) {
  let totalPedido = 0;
  let detalleNuevo = [];
  let productosPedido = [];

  misProductos.forEach((elem) => {
    // Crea el pedido solo con los productos que tienen una cantidad mayor que cero
    if (elem.cantidad > 0) {
      const productoPedido = {
        nombre: elem.nombre,
        precio: elem.precio,
        cantidad: elem.cantidad,
        subtotal: parseFloat((elem.cantidad * elem.precio).toFixed(2)),
      };

      // Separamos precio, cantidad y subtotal, para utilizarlos en el detalle
      const { precio, cantidad, subtotal } = productoPedido;

      // adicionamos al arreglo el producto pedido.
      productosPedido.push(productoPedido);

      // creamos el arreglo que contiene el detalle del pedido
      detalleNuevo = [
        ...detalleNuevo,
        `${elem.descripcion}:  ${cantidad} X ${precio} = ${subtotal}`,
      ];
      // Sumamos los subtotales para obtener el total del pedido
      totalPedido += subtotal;
    }
  });

  return { productosPedido, detalleNuevo, totalPedido };
}

// Reinicia a cero la cantidad de cada producto
export function limpiarCantidad(misProductos) {
  misProductos.forEach((elem) => {
    elem.cantidad = 0;
  });
}

// Agrega pedido a la base de datos
 export const agregarPedido = async (pedido, setMsjDetalle, misProductos) => {
   try {
     await agregarPedidoRequest(pedido);
     setMsjDetalle(false);
     limpiarCantidad(misProductos);
   } catch (error) {
     console.error(error.response?.data);
   }
};
 

const convertirArregloAString = (arreglo) => {
  const arregloACadena = arreglo.map((elemento) => String(elemento));
  const mensaje = arregloACadena.join("\n");
  return mensaje;
};

export function obtienePedido(misProductos, setDetalle, setPedido, setElTotalPedido, setMsjAviso, setConfirmar, setEstadoBotones, user) {
 
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
    // limpiarCantidad(misProductos);
    setEstadoBotones({ boton1: true, boton2: false, boton3: true });
  }
}
