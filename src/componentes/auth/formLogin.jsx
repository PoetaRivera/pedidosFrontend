/* eslint-disable react/prop-types */
import styles from "./formLogin.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../componenteContexto";
import { Logout } from "./logout";
import imagen1 from "../../imagenes/imagen1.png";


//-------------------------------------------------------------------------------------------
//Formulario para login clientes
export function FormLogin() {
  //------------------------------------------------------------------------------------------------


  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
 
  const { signin, user, errors: loginErrors } = useAuth();

 

  //funcion que login un cliente
  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
    reset();
  });
  //------------------------------------------------------------------------------------------
  const {
    imagen,
    contenedor,
    formulario,
    presentaErrorBackend,
    encabezado,
    title1,
    title2,
    title3,
    input,
    boton,
    label,
  } = styles;
  //----------------------------------------------------------------------------------------------------
  return (
    <div className={contenedor}>
      {/* Mostrar errores del backend si existen */}
      {loginErrors.length > 0 && (
        <div className={presentaErrorBackend}>{loginErrors.join(", ")}</div>
      )}

      <form className={formulario} onSubmit={onSubmit}>
        <div className={encabezado}>
          <h3 className={title1}>Inicia sesión</h3>
          <h4 className={title2}>
            <span style={{ color: "blue", fontSize: "25px" }}>☺️ </span>
            {`Bienvenido ${user?.alias}`}
            <span style={{ color: "blue", fontSize: "25px" }}> ☺️</span>
          </h4>
          <h5 className={title3}>Debes iniciar sesión para hacer un pedido</h5>
        </div>
        <label className={label} htmlFor="alias">
          Alias:
        </label>
        <input
          name="alias"
          placeholder="Introduce tu alias"
          className={input}
          type="text"
          autoComplete="on"
          required
          {...register("alias", { required: true })}
        />
        <label className={label} htmlFor="clave">
          Clave:
        </label>
        <input
          name="clave"
          placeholder="Introduce contraseña"
          className={input}
          type="password"
          autoComplete="on"
          required
          {...register("clave", { required: true })}
        />
        <button className={boton} type="submit">
          Login
        </button>
      </form>
      <Logout />

      <div>
        <h2>Imagen de la semana</h2>
        <img src={imagen1} alt="pupusa" className={imagen}></img>
      </div>
    </div>
  );
}
