import styles from "./agregarProducto.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../componenteContexto";
import { agregarProductosRequest } from "../../api/auth";
import { useState, useEffect } from "react";  
//-------------------------------------------------------------------------------------------
//Formulario para registrar clientes
export function AgregarProducto() {
  //------------------------------------------------------------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      descripcion: "",
      nombre: "",
      precio: 0,
    },
  });

  const { errors:productoErrors, setErrors } = useAuth();
  const [mensaje, setMensaje] = useState("");

  // Muestra los mensajes superiores durante un tiempo
  useEffect(() => {
    if (mensaje !== "") {
      const timer = setTimeout(() => {
        setMensaje("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  //funcion que agrega un producto
  const onSubmit = handleSubmit(async (datos) => {
    datos.precio = parseFloat(datos.precio);
    try {
     const res = await agregarProductosRequest(datos);
      setErrors(res.data); // Mostrar mensaje de éxito
      reset(); // Reiniciar el formulario
    } catch (error) {
      setErrors(error.response.data); // Manejo de errores
      //setMensaje("Hubo un error al agregar el producto"); // Mensaje de error
    }
  });

  const {
    formulario,
    presentaErrorBackend,
    contenedor,
    label,
    title1,
    input,
    error,
    boton,
  } = styles;

  //----------------------------------------------------------------------------------------------------
  return (
    <div className={contenedor}>
      <form className={formulario} onSubmit={onSubmit}>
        <h3 className={title1}>Agregar Producto</h3>
        {productoErrors.length > 0 && (
          <div className={presentaErrorBackend}>{productoErrors.join(", ")}</div>
        )}
        <label className={label} htmlFor="descripcion">
          Descripcion:
        </label>
        <input
          name="descripcion"
          placeholder="Introduce la descripción"
          className={input}
          type="text"
          autoComplete="on"
          required
          {...register("descripcion", {
            required: {
              value: true,
              message: "Descripción es requerida",
            },
            maxLength: {
              value: 250,
              message: "Máximo 250 caracteres",
            },
          })}
        />
        {errors.descripcion && (
          <p className={error}>⛔{errors.descripcion.message}⛔</p>
        )}

        <label className={label} htmlFor="nombre">
          Nombre:
        </label>
        <input
          name="nombre"
          placeholder="Introduce el nombre"
          className={input}
          type="text"
          autoComplete="on"
          required
          {...register("nombre", {
            required: {
              value: true,
              message: "Nombre es requerido",
            },
            maxLength: {
              value: 50,
              message: "Máximo 50 caracteres",
            },
          })}
        />
        {errors.nombre && <p className={error}>⛔{errors.nombre.message}⛔</p>}

        <label className={label} htmlFor="precio">
          Precio:
        </label>
        <input
          name="precio"
          className={input}
          type="text"
          autoComplete="on"
          required
          {...register("precio", {
            required: {
              value: true,
              message: "Precio es requerido",
            },
            pattern: {
              value: /^\d{1,2}(\.\d{1,2})?$/,
              message: "Solo digitos y, como maximo, un punto",
            },
            maxLength: {
              value: 5,
              message: "maximo 0-99 y 2 decimales ",
            },
          })}
        ></input>
        {errors.precio && <p className={error}>⛔{errors.precio.message}⛔</p>}

        <button className={boton} type="submit">
          Agregar
        </button>
      </form>
    </div>
  );
}
