/* eslint-disable react/prop-types */

import styles from "./presentacionPedidos.module.css"


const {datos, titulo, borde1, productos, borde2, eltotal} = styles

export function PresentacionPedidos({ pedidos }) {
  
  
  return (
    <div>
      {pedidos.map((pedido, index) => {
        // Calcula el total de cada pedido
        const total = pedido.productos.reduce(
          (acc, producto) => acc + producto.subtotal,
          0
        );

        return (
          <div className={datos} key={pedido.id}>
            <h3 className={titulo}>Pedido {index + 1}</h3>
            <p>Id: {pedido.id}</p>
            <p>Alias: {pedido.alias}</p>
            <p>Fecha: {pedido.fechaPedido}</p>
            <p className={borde1}>Hora: {pedido.horaPedido}</p>

            <h3>Productos:</h3>
            {pedido.productos.map((producto, index) => (
              <div className={productos} key={index}>
                <p>Nombre: {producto.nombre}</p>
                <p>Precio: {producto.precio}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p className={borde2}>subtotal: {producto.subtotal}</p>
              </div>
            ))}
            <h3 className={eltotal}>Total: {total}</h3>
          </div>
        );
      })}
    </div>
  );
}
