import { useState, useEffect } from "react";
import { pedirPedidosProductosRequest } from "../../api/auth.js";
import styles from "./pedidosproductos.module.css";
import { useAuth } from "../../componenteContexto";
// Solicita y presenta todos los pedidos incluyendo los productos
export const PedidosProductos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { setErrors } = useAuth();
  useEffect(() => {
    // Solicita todos los pedidos al backend
    const fetchPedidos = async () => {
      try {
        const res = await pedirPedidosProductosRequest();
        setPedidos(res.data);
      } catch (error) {
        return setErrors(error.response.data);
      }
    };
    fetchPedidos();
  }, []);

  const {
    pedidosDatos,
    tituloPedido,
    pedidosProductos,
    subtotal,
    eltotal,
    borde,
  } = styles;

  return (
    <div>
      {pedidos.map((pedido, index) => {
        // Calcula el total de cada pedido
        const total = pedido.productos.reduce(
          (acc, producto) => acc + producto.subtotal,
          0
        );

        return (
          <div className={pedidosDatos} key={pedido.id}>
            <h3 className={tituloPedido}>Pedido {index + 1}</h3>
            <p>Id: {pedido.id}</p>
            <p>Alias: {pedido.alias}</p>
            <p>Fecha: {pedido.fechaPedido}</p>
            <p className={borde}>Hora: {pedido.horaPedido}</p>

            {pedido.productos.map((producto, idx) => (
              <div className={pedidosProductos} key={idx}>
                <p>Nombre: {producto.nombre}</p>
                <p>Precio: {producto.precio}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p className={subtotal}>Subtotal: {producto.subtotal}</p>
              </div>
            ))}

            <h3 className={eltotal}>Total: {total}</h3>
          </div>
        );
      })}
    </div>
  );
};
