import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./pedidosaliasfecha.module.css";
import { pedirPedidosPorAliasFechaRequest } from "../../api/auth";
import { convertirFecha } from "../../funciones/convertirFecha";
import { PresentacionPedidos } from "./presentacionPedidos";
import { datePatternFecha } from "../../constantes/constantes";
import { useAuth } from "../../componenteContexto";
// ************************************************************************************




export const PedidosAliasFecha = () => {
  const { errors: registerErrors, setErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      alias: "",
      fecha: "",
    },
  });

  const [pedidos, setPedidos] = useState([]);
 
  // *******************************************************************************************
  const onSubmit = handleSubmit(async (datos) => {
    const { alias, fecha } = datos;
    try {
      const response = await pedirPedidosPorAliasFechaRequest(
        alias,
        convertirFecha(fecha)
      );
      setPedidos(response.data);
      console.log(response.data);
    } catch (error) {
     setErrors([error.response.data]);
    }
  });

  const {
    contenedor,
    formulario,
    label,
    input,
    error,
    boton,
    presentaErrorBackend
  } = styles;

  return (
    <div className={contenedor}>
      {registerErrors.length > 0 && (
        <div className={presentaErrorBackend}>{registerErrors.join(", ")}</div>
      )}
      <h3>Buscar Pedidos por Alias y Fecha</h3>
      <form className={formulario} onSubmit={onSubmit}>
        <label className={label} htmlFor="alias">
          Alias:
        </label>
        <input
          name="alias"
          placeholder="Introduce tu alias"
          className={input}
          type="text"
          required
          {...register("alias", {
            required: "Alias es requerido",
          })}
        />

        <label className={label} htmlFor="fecha">
          Fecha (dd/mm/aa):
        </label>
        <input
          name="fecha"
          placeholder="Introduce fecha"
          className={input}
          type="text"
          required
          {...register("fecha", {
            required: "La fecha es obligatoria",
            pattern: {
              value: datePatternFecha,
              message: "La fecha debe tener el formato correcto (dd/mm/yy)",
            },
          })}
        />
        {errors.fecha && <p className={error}>⛔{errors.fecha.message}⛔</p>}

        <br />
        <button className={boton} type="submit">
          Buscar
        </button>
      </form>

      <div>
        <PresentacionPedidos pedidos={pedidos}></PresentacionPedidos>
      </div>
    </div>
  );
};
