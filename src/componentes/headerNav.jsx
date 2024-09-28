import { Link } from "react-router-dom";
import styles from "./headerNav.module.css";
import { useAuth } from "../componenteContexto";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//---------------------------------------------------------------------------------
export function HeaderNav() {
  const { user } = useAuth();
  const [miRol, setMiRol] = useState("");
  const location = useLocation();
  const ruta = location.pathname; // url actual

  useEffect(() => {
    user && setMiRol(user.rol);
  }, [user]);

  const renderLink = (path, text) =>
    ruta !== path && (
      <Link className={link} to={path}>
        {text}
      </Link>
    );

  const { link, contenedor, header, title1 } = styles;
  return (
    <div className={contenedor}>
      <p className={title1}>Navega a...</p>
      <div className={header}>
        {renderLink("/", "Login")}
        {user && miRol === "admin" && renderLink("/admin", "Admin")}
        {user && renderLink("/hacerpedido", "Pedir")}
      </div>
    </div>
  );
}
