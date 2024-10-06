/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState, useContext, createContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from "./api/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de ComponenteContexto");
  }
  return context;
};
// ------------------------------------------------------------------------------------------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthen, setIsAuthen] = useState(false);
  const [errors, setErrors] = useState([]);

  let misProductosNuevos = [];
  // -----------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------
  //registrar un usuario
  const signup = async (datos) => {
    try {
      const res = await registerRequest(datos);
      console.log('respuesta:', res.data)
      setErrors([res.data]);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  // ---------------------------------------------------------------------------------------------
  // Iniciar sesión
  const signin = async (datos) => {
    try {
      const res = await loginRequest(datos);
      setUser(res.data);
      setErrors([res.data.message])
      setIsAuthen(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
       return setErrors(error.response.data);
      }
       setErrors([error.response.data.message]);
    }
  };
  // --------------------------------------------------------------------------------------------
  // Cerrar sesión
  const signout = async (datos) => {
    try {
      const res = await logoutRequest(datos);
     setErrors([res.data]);
      setUser(null);
      setIsAuthen(false);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  // ---------------------------------------------------------------------------------------------------
 // componente de espera
function CircularIndeterminate() {
  return (
    <Stack
      sx={{ color: "grey.500", justifyContent: "center", marginTop:"20px" }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
  );
}
// ----------------------------------------------------------------------------------------------
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        misProductosNuevos,
        signup,
        signin,
        signout,
        user,
        isAuthen,
        errors,
        setErrors,
        CircularIndeterminate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
