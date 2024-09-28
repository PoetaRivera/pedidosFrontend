import {
  productosRequest,
  borrarProductoRequest,
  editarProductosRequest,
} from "../../api/auth";
import { useEffect, useState } from "react";
import styles from "./pedirProductos.module.css";
import { useForm } from "react-hook-form";

// ********************************************************************************************
// Solicita todos los productos
export const PedirProductos = () => {
  const [productos, setProductos] = useState([]);
  const [editarProductoId, setEditarProductoId] = useState(null);
  const [control, setControl] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      descripcion: "",
      nombre: "",
      precio: 0,
    },
  });

  useEffect(() => {
    // Realiza pedido de productos para mostraarlos
    const fetchProductos = async () => {
      try {
        const response = await productosRequest();
        // La respuesta se espera en response.data.pedidos
        setProductos(response.data);
      } catch (error) {
        console.error("Error al buscar productos:", error); // Manejo de errores
        setMensaje("Hubo un error al buscar productos"); // Mensaje de error
      }
    };

    fetchProductos();
  }, []);

  // Muestra los mensajes superiores durante un tiempo
  useEffect(() => {
    if (mensaje !== "") {
      const timer = setTimeout(() => {
        setMensaje("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  // elimina un producto
  const eliminarProducto = async (id) => {
    try {
      await borrarProductoRequest(id);
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id)
      );
      setMensaje("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al borrar producto:", error);
    }
  };
  
  // Modifica un producto
  const onSubmit = handleSubmit(async (datos) => {
    datos.precio = parseFloat(datos.precio);
    const misDatos = { ...datos, id: editarProductoId };

    try {
      await editarProductosRequest(misDatos); // Hacer la solicitud de edición

      // Actualiza el estado de productos localmente
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id === editarProductoId
            ? { ...producto, ...misDatos }
            : producto
        )
      );

      setMensaje("Producto editado con éxito"); // Mostrar mensaje de éxito
      reset(); // Reiniciar el formulario
      setEditarProductoId(null); // Ocultar el formulario después de editar (si es necesario)
    } catch (error) {
      console.error("Error al editar el producto:", error); // Manejo de errores
      setMensaje("Hubo un error al editar el producto"); // Mensaje de error
    }
  });

  // funcion para mostrar el formulario de edicion
  const edita = (id) => {
    if (control === 0) {
      setControl(1);
      setEditarProductoId(id); // Activa la edición para un producto específico
    } else {
      setEditarProductoId(null);
      setControl(0);
    }
    reset();
  };

  const {
    presentaErrorBackend,
    error,
    input,
    formulario,
    contenedor,
    contenedorBotones,
    productosForm,
    misProductos,
    titulo2,
    boton,
  } = styles;
  // **************************************************************************************************
  return (
    <div className={contenedor}>
      <h3>Lista de todos los Productos</h3>
      {mensaje !== "" && <div className={presentaErrorBackend}>{mensaje}</div>}
      <ul className={productosForm}>
        {productos.map((producto, index) => (
          <li className={misProductos} key={producto.id}>
            <h3 className={titulo2}>Producto {index + 1}</h3>
            <div className={contenedorBotones}>
              <button
                onClick={() => {
                  eliminarProducto(producto.id);
                }}
                className={boton}
              >
                Borrar
              </button>
              <button
                onClick={() => {
                  edita(producto.id);
                }}
                className={boton}
              >
                {editarProductoId === producto.id ? "Cancelar" : "Editar"}
              </button>
            </div>
            <p>id: {producto.id}</p>
            <p>descripcion: {producto.descripcion}</p>
            <p>nombre: {producto.nombre}</p>
            <p>precio: {producto.precio}</p>

            {editarProductoId === producto.id && (
              <form className={formulario} onSubmit={onSubmit}>
                <input
                  name="descripcion"
                  className={input}
                  type="text"
                  placeholder={producto.descripcion}
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
                ></input>
                {errors.descripcion && (
                  <p className={error}>⛔{errors.descripcion.message}⛔</p>
                )}
                <input
                  name="nombre"
                  className={input}
                  type="text"
                  placeholder={producto.nombre}
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
                ></input>
                {errors.nombre && (
                  <p className={error}>⛔{errors.nombre.message}⛔</p>
                )}
                <input
                  name="precio"
                  className={input}
                  type="text"
                  placeholder={producto.precio}
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
                {errors.precio && (
                  <p className={error}>⛔{errors.precio.message}⛔</p>
                )}
                <button className={boton} type="submit">
                  Enviar
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
