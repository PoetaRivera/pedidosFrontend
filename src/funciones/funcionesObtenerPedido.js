
export function crearPedidoBase(alias, horaPedido, fechaPedido) {
    return {
        alias: alias,
        horaPedido: horaPedido,
        fechaPedido: fechaPedido,
    };
}

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
export function limpiarCantidad(misProductos)  {
  misProductos.forEach((elem) => {
  elem.cantidad = 0
})
}

