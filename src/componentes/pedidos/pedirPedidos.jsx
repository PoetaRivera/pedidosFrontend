import { pedirPedidosRequest } from "../../api/auth";
import { useEffect, useState } from "react";
import styles from "./pedidos.module.css";
import { Regresar } from "../regresar";
import { Logout } from "../auth/logout.jsx";
import { useAuth } from "../../componenteContexto";
// Solicita todos los pedidos sin productos

export const PedirPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
const { setErrors } = useAuth();
  useEffect(() => {
    // Realiza la solicitud al montar el componente
    const fetchPedidos = async () => {
      try {
        const response = await pedirPedidosRequest();
        console.log("response", response);
        // La respuesta se espera en response.data.pedidos
        setPedidos(response.data.pedidos);
      } catch (error) {
         return setErrors(error.response.data);
      }
    };

    fetchPedidos();
  }, []);

  const {
    contenedorPrincipalPedidos,
    contenedorBotones,
    listaPedidosForm,
    listaPedidos,
    titulo2,
    
  } = styles;

  return (
    <div className={contenedorPrincipalPedidos}>
      <div className={contenedorBotones}></div>
      <h2>Lista de Pedidos</h2>
      <ul className={listaPedidosForm}>
        {pedidos.map((pedido, index) => (
          <li className={listaPedidos} key={pedido.id}>
            <h3 className={titulo2}>Pedido {index + 1}</h3>
            <p>Alias: {pedido.alias}</p>
            <p>Fecha: {pedido.fechaPedido}</p>
            <p>Hora: {pedido.horaPedido}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};
