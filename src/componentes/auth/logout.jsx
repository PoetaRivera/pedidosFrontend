/* eslint-disable react/prop-types */
import { useAuth } from "../../componenteContexto";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./logout.module.css";
//------------------------------------------------------------------------------------------------------

export function Logout() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // -----------------------------------------------------------------------------------------------------
  const manejarLogout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      //setErrorMessage(["Error al cerrar sesión."]);
    }
  };

  const { boton } = styles;
  // -----------------------------------------------------------------------------------------------------
  return (
    <div>
      <button onClick={manejarLogout} className={boton}>
        Logout
      </button>
    </div>
  );
}
