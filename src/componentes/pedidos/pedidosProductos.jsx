import { useState, useEffect } from "react";
import { pedirPedidosProductosRequest } from "../../api/auth.js";
import { useAuth } from "../../componenteContexto";
import { PresentacionPedidos } from "./presentacionPedidos.jsx";
// **********************************************************************************************
// Solicita y presenta todos los pedidos incluyendo los productos
export const PedidosProductos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { setErrors, CircularIndeterminate } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Solicita todos los pedidos al backend
    const fetchPedidos = async () => {
      setLoading(true); // Establecer loading a true antes de hacer la solicitud
      try {
        const res = await pedirPedidosProductosRequest();
        // Asegura que res.data tenga el formato esperado antes de asignar a pedidos
        if (res?.data && Array.isArray(res.data)) {
          setPedidos(res.data);
        } else {
          setErrors("Los datos recibidos no son válidos");
        }
      } catch (error) {
        // Si error.response no está definido, usar un mensaje por defecto
        const errorMessage = error.response?.data || "Error al obtener pedidos";
        setErrors(errorMessage);
      } finally {
        setLoading(false); // Establecer loading a false una vez que se complete la solicitud
      }
    };
    fetchPedidos();
  }, [setErrors]);

  return (
    <div  className="contenedor">
      {loading ? (
        <CircularIndeterminate /> // Muestra el loader mientras loading es true
      ) : pedidos.length > 0 ? (
        <PresentacionPedidos pedidos={pedidos} />
      ) : (
        <p>No hay pedidos disponibles.</p>
      )}
    </div>
  );
};
