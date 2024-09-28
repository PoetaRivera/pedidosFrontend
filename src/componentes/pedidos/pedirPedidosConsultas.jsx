import { useState } from "react";
import styles from "./pedirPedidosConsultas.module.css";
import {
  pedirPedidosPorAliasRequest,
  pedirPedidosPorFechaRequest,
  pedirPedidosPorIdRequest,
} from "../../api/auth";
import { PresentacionPedidos } from "./presentacionPedidos";
import { useAuth } from "../../componenteContexto";
import { datePatternFecha } from "../../constantes/constantes";

// *******************************************************************************************
export const PedirPedidosConsultas = () => {
  const [paramType, setParamType] = useState("fecha"); // Tipo de parámetro seleccionado
  const [paramValue, setParamValue] = useState(""); // Valor del parámetro
  const [pedidos, setPedidos] = useState([]);
  const { errors, setErrors } = useAuth();
  // ********************************************************************************************
  // Validaciones según el tipo de parámetro seleccionado
  const validateInput = () => {
    if (paramType === "fecha") {
      console.log("estoy en fecha");
      // Validar formato de fecha dd/mm/aa
      const fechaRegex = datePatternFecha;
      if (!fechaRegex.test(paramValue)) {
        setErrors(["La fecha debe tener el formato dd/mm/aa"]);
        return false;
      }
    } else if (paramType === "alias") {
      // Validar que alias solo sea texto
      const aliasRegex = /^[A-Za-z0-9]+$/;
      if (!aliasRegex.test(paramValue)) {
        setErrors(["El alias solo debe contener letras y números"]);
        return false;
      }
    } else if (paramType === "id") {
      // Validar que el ID contenga letras y números (Firestore ID)
      const idRegex = /^[A-Za-z0-9]+$/;
      if (!idRegex.test(paramValue)) {
        setErrors(["El ID solo debe contener letras y números"]);
        return false;
      }
    }
    return true; // Si todo está bien, devolver true
  };
  // funciones que toman el type del select y el value del input
  const handleSelectChange = (e) => {
    setParamType(e.target.value);
  };

  const handleInputChange = (e) => {
    setParamValue(e.target.value);
  };
  // ************************************************************************
  // Funcion que realiza las solicitudes de pedidos por fecha, alias o id
  const fetchPedidos = async () => {
    if (!validateInput()) {
      return; // Si la validación falla, no realizar la solicitud
    }

    try {
      let res;
      if (paramType === "fecha") {
        const encodedText = paramValue.split("/").join("%2F");
        res = await pedirPedidosPorFechaRequest(encodedText);
        
      } else if (paramType === "alias") {
        res = await pedirPedidosPorAliasRequest(paramValue);
      
      } else if (paramType === "id") {
        res = await pedirPedidosPorIdRequest(paramValue);
       
      }
      setPedidos(res.data);
    } catch (error) {
      setErrors([error.response.data]);
    }
  };
  // ***************************************************************************************
  const {
    contenedor,
    presentaErrorBackend,
    selectInput,
    opcion,
    input,
    boton,
  } = styles;
  // ********************************************************************************************

  return (
    <div className={contenedor}>
      <h3>Buscar Pedidos por Alias, Fecha o Id</h3>
      {errors.length > 0 && (
        <div className={presentaErrorBackend}>{errors.join(", ")}</div>
      )}
      <div className={selectInput}>
        <select value={paramType} onChange={handleSelectChange}>
          <option className={opcion} value="Pedidos">
            Selecciona una opcion
          </option>
          <option className={opcion} value="fecha">
            Fecha
          </option>
          <option className={opcion} value="alias">
            Alias
          </option>
          <option className={opcion} value="id">
            ID
          </option>
        </select>

        <input
          className={input}
          type="text"
          placeholder={
            paramType === "fecha"
              ? `Ingresa ${paramType} dd/mm/aa`
              : `Ingresa ${paramType}`
          }
          value={paramValue}
          onChange={handleInputChange}
        />
      </div>
      <button className={boton} onClick={fetchPedidos}>
        Buscar
      </button>

      <div>
        <PresentacionPedidos pedidos={pedidos}></PresentacionPedidos>
      </div>
    </div>
  );
};
