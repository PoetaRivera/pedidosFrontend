import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./pedidoaliasfechahora.module.css";
import { HoraNormalAMilitar } from "../../funciones/horaNormalAMilitar";
import { convertirFecha } from "../../funciones/convertirFecha";
import { pedirPedidosPorAliasFechaHoraRequest } from "../../api/auth";
import { PresentacionPedidos } from "./presentacionPedidos";
import { datePatternFecha, datePatternHora } from "../../constantes/constantes";
import { useAuth } from "../../componenteContexto";
// ***********************************************************************************************

// **********************************************************************************************

// **********************************************************************************************

export const PedidoAliasFechaHora = () => {
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
const { errors:pedidosErrors, setErrors} = useAuth();
const [pedidos, setPedidos] = useState([]);
 

  // ***************************************************************************************************
  const onSubmit = handleSubmit(async (datos) => {
    const { alias, fecha, hora } = datos;
    
    try {
      const response = await pedirPedidosPorAliasFechaHoraRequest(
        alias,
        convertirFecha(fecha),
        HoraNormalAMilitar(hora)
      );

      setPedidos(response.data);
      
    } catch (error) {
      setErrors([error.response.data]);
    }
  });

  const {
    presentaErrorBackend,
    contenedor,
    formulario,
    label,
    input,
    error,
    boton,
  } = styles;

  return (
    <div className={contenedor}>
      <h3>Buscar Pedidos por Alias, Fecha y Hora</h3>
      {pedidosErrors.length > 0 && (
        <div className={presentaErrorBackend}>{pedidosErrors.join(", ")}</div>
      )}
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

        <label className={label} htmlFor="hora">
          Hora (hh:MM am/pm):
        </label>
        <input
          name="hora"
          placeholder="Introduce hora"
          className={input}
          type="text"
          required
          {...register("hora", {
            required: "La hora es obligatoria",
            pattern: {
              value: datePatternHora,
              message: "La hora debe tener el formato correcto (hh:mm am/pm)",
            },
          })}
        />
        {errors.hora && <p className={error}>⛔{errors.hora.message}⛔</p>}

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
