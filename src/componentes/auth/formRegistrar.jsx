import styles from "./formRegistrar.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../componenteContexto";

//-------------------------------------------------------------------------------------------
//Formulario para registrar clientes
export function FormRegistrar() {
  //------------------------------------------------------------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      alias: "",
      movil: "",
      clave: "",
      confirmarClave: "",
      rol: "usuario", // Valor por defecto
    },
  });

  const { signup, errors: registerErrors, setErrors } = useAuth();

  //funcion que registra usuario
  const onSubmit = handleSubmit(async (datos) => {
    try {
      await signup(datos);
      reset();
      //setMensaje("Usuario registrado con exito");
    } catch (error) {
      setErrors([error.response.data]);
    }
  });

  // Función para mostrar errores de validacion del formulario
  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <p className={error}>⛔ {errors[fieldName].message} ⛔</p>
    ) : null;
  };

  const {
    formulario,
    presentaErrorBackend,
    contenedor,
    label,
    title1,
    input,
    error,
    boton,
    select,
    rol,
  } = styles;

  //----------------------------------------------------------------------------------------------------
  return (
    <div className={contenedor}>
      {registerErrors.length > 0 && (
        <div className={presentaErrorBackend}>{registerErrors.join(", ")}</div>
      )}

      <form className={formulario} onSubmit={onSubmit}>
        <h3 className={title1}>Registrar</h3>

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
            required: { value: true, message: "Alias es requerido" },
            minLength: { value: 4, message: "Mínimo 4 caracteres" },
            maxLength: { value: 30, message: "Máximo 20 caracteres" },
          })}
        />
        {renderError("alias")}

        <label className={label} htmlFor="movil">
          Movil:
        </label>
        <input
          name="movil"
          placeholder="Introduce tu movil"
          className={input}
          type="text"
          required
          {...register("movil", {
            required: { value: true, message: "Movil es requerido" },
            pattern: { value: /^\d{8}$/, message: "Deben ser 8 digitos" },
          })}
        />
        {renderError("movil")}

        <label className={label} htmlFor="clave">
          Clave:
        </label>
        <input
          name="clave"
          placeholder="Introduce contraseña"
          className={input}
          type="password"
          required
          {...register("clave", {
            required: { value: true, message: "Clave es requerida" },
            pattern: {
              value: /^(?=.*\d.*\d)[A-Za-z\d]{6,}$/,
              message: "Mínimo 6 caracteres que incluya al menos 2 números",
            },
            maxLength: { value: 25, message: "Máximo 25 caracteres" },
          })}
        />
        {renderError("clave")}

        <label className={label} htmlFor="Confirmar-clave">
          Confirmar clave:
        </label>
        <input
          name="confirmarClave"
          placeholder="Confirma contraseña"
          className={input}
          type="password"
          required
          {...register("confirmarClave", {
            required: { value: true, message: "Confirmar clave es requerido" },
            validate: (value) => {
              return value === getValues("clave")
                ? true
                : "Las claves no coinciden";
            },
          })}
        />
        {renderError("confirmarClave")}

        <label className={label} htmlFor="rol">
          Rol:
        </label>
        <select
          className={select}
          name="rol"
          {...register("rol", { require: true })}
        >
          <option className={rol} value="usuario">
            Usuario
          </option>
          <option className={rol} value="admin">
            Administrador
          </option>
        </select>

        <button className={boton} type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
}
