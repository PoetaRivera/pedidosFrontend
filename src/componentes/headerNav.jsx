import { Link, useLocation } from "react-router-dom";
import styles from "./headerNav.module.css";
import { useAuth } from "../componenteContexto";


//---------------------------------------------------------------------------------
export function HeaderNav() {
  const { user } = useAuth();
  const { pathname } = useLocation(); // url actual
  

  const renderLink = (path, text) =>
    pathname !== path && (
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
        {user?.rol === "admin" && renderLink("/admin", "Admin")}
        {user && renderLink("/hacerpedido", "Pedir")}
      </div>
    </div>
  );
}
