import {
  usuariosRequest,
  borrarUsuarioRequest,
  editarUsuarioRequest,
} from "../../api/auth";
import { useEffect, useState } from "react";
import styles from "./pedirUsuarios.module.css";
import { useForm } from "react-hook-form";

// Solicita todos los pedidos sin productos
export const PedirUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editarUsuarioId, setEditarUsuarioId] = useState(null);
  const [control, setControl] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      alias: "",
      movil: "",
      rol: "",
    },
  });

  useEffect(() => {
    // Realiza la solicitud al montar el componente
    const fetchUsuarios = async () => {
      try {
        const response = await usuariosRequest();
        // La respuesta se espera en response.data.pedidos
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setMensaje("Hubo un error al buscar usuarios"); // Mensaje de error
      }
    };

    fetchUsuarios();
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

  // Elimina un usuario
  const eliminarUsuario = async (id) => {
    try {
      await borrarUsuarioRequest(id);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id !== id)
      );
      setMensaje("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al borrar usuario:", error);
    }
  };

  // Modifica un usuario
  const onSubmit = handleSubmit(async (datos) => {
    const misDatos = { ...datos, id: editarUsuarioId };

    try {
      await editarUsuarioRequest(misDatos); // Hacer la solicitud de edición

      // Actualiza el estado de los usuarios localmente
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === editarUsuarioId ? { ...usuario, ...misDatos } : usuario
        )
      );

      setMensaje("Usuario editado con éxito"); // Mostrar mensaje de éxito
      reset(); // Reiniciar el formulario
      setEditarUsuarioId(null); // Ocultar el formulario después de editar (si es necesario)
    } catch (error) {
      console.error("Error al editar el usuario:", error); // Manejo de errores
      setMensaje("Hubo un error al editar el usuario"); // Mensaje de error
    }
  });

  // funcion para mostrar el formulario de edicion
  const edita = (id) => {
    if (control === 0) {
      setControl(1);
      setEditarUsuarioId(id); // Activa la edición para un producto específico
    } else {
      setEditarUsuarioId(null);
      setControl(0);
    }
    reset();
  };

  const {
    presentaErrorBackend,
    rolSelect,
    label,
    select,
    rol,
    error,
    input,
    formulario,
    contenedor,
    contenedorBotones,
    usuariosForm,
    misUsuarios,
    titulo2,
    boton,
  } = styles;

  return (
    <div className={contenedor}>
      <h3>Lista de todos los usuarios</h3>
      {mensaje !== "" && <div className={presentaErrorBackend}>{mensaje}</div>}
      <ul className={usuariosForm}>
        {usuarios.map((usuario, index) => (
          <li className={misUsuarios} key={usuario.id}>
            <h3 className={titulo2}>Usuario {index + 1}</h3>
            <div className={contenedorBotones}>
              <button
                onClick={() => {
                  eliminarUsuario(usuario.id);
                }}
                className={boton}
              >
                Borrar
              </button>
              <button
                onClick={() => {
                  edita(usuario.id);
                }}
                className={boton}
              >
                {editarUsuarioId === usuario.id ? "Cancelar" : "Editar"}
              </button>
            </div>
            <p>id: {usuario.id}</p>
            <p>alias: {usuario.alias}</p>
            <p>movil: {usuario.movil}</p>
            <p>rol: {usuario.rol}</p>

            {editarUsuarioId === usuario.id && (
              <form className={formulario} onSubmit={onSubmit}>
                <label className={label} htmlFor="alias">
                  Alias:
                </label>
                <input
                  name="alias"
                  className={input}
                  type="text"
                  placeholder={"Introduce nuevo alias o el mismo"}
                  required
                  {...register("alias", {
                    required: { value: true, message: "Alias es requerido" },
                    minLength: { value: 4, message: "Mínimo 4 caracteres" },
                    maxLength: { value: 20, message: "Máximo 20 caracteres" },
                  })}
                ></input>
                {errors.alias && (
                  <p className={error}>⛔{errors.alias.message}⛔</p>
                )}

                <label className={label} htmlFor="movil">
                  Movil:
                </label>
                <input
                  name="movil"
                  className={input}
                  type="tel"
                  placeholder={"Introduce nuevo movil o el mismo"}
                  required
                  {...register("movil", {
                    required: {
                      value: true,
                      message: "movil es requerido",
                    },
                    pattern: {
                      value: /^[1-9]\d{7}$/,
                      message: "Solo y exactamente 8 dígitos",
                    },
                  })}
                ></input>
                {errors.movil && (
                  <p className={error}>⛔{errors.movil.message}⛔</p>
                )}
                <label className={label} htmlFor="rol">
                  Rol:
                </label>
                <select
                  className={select}
                  name="rol"
                  type="text"
                  required
                  {...register("rol", { require: true })}
                >
                  <option className={rolSelect} value="" disabled selected>
                    Selecciona un nuevo rol o el mismo
                  </option>
                  <option className={rol} value="usuario">
                    Usuario
                  </option>
                  <option className={rol} value="admin">
                    Administrador
                  </option>
                </select>
                {errors.rol && (
                  <p className={error}>⛔{errors.rol.message}⛔</p>
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
