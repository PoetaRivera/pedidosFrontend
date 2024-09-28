/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../componenteContexto.jsx";

export const ProtejeAdmin = ()=> {
  const { user } = useAuth();

  if (!user || user.rol !== "admin") {
    return <Navigate to="/login" />;
  }

  return (<Outlet/>);
};