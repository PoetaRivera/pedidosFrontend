/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { useAuth } from "../componenteContexto";
import { useEffect } from "react";
import { verificarRequest } from "../api/auth";
//------------------------------------------------------------------------------------------------------
export function Regresar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    //----------------------------------------------------------------------------------------------
   /* useEffect(() => {
        console.log(user)
     const verify  = async () => {
         const res = await verificarRequest()   
         console.log(res)
         }
      verify()
     }, [user]); */

   function regresar() {
     if (user && user.rol === "admin") {
       navigate("/admin");
     } else {
       navigate("/"); // Navega a la ruta de inicio si el usuario no está autenticado o no es administrador
     }
   }
  //--------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  return (
    <div>
      <button onClick={regresar} className="boton-form">
        Regresar
      </button>
    </div>
  );
}
