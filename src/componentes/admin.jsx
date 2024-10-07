import { useAuth } from "../componenteContexto";

import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// -------------------------------------------------------------------------------------------

export const Admin = () => {
  const { user } = useAuth();
  const [aliasUser, setAliasUser] = useState("");

  useEffect(() => {
    user && setAliasUser(user.alias);
  }, [user]);

  const renderLink = (path, text) => (
    <Link className={opcion} to={path}>
      {text}
    </Link>
  );

  const { superContenedor, contenedor, select, title1, opcion, saludo } =
    styles;

  return (
    <div className={superContenedor}>
      <h3 className={saludo}>Buen día, {aliasUser}!</h3>
      <div className={contenedor}>
        
        <div className={select}>
          <h2 className={title1}>Productos</h2>
          {renderLink(
            "/productos",
            " Ver Productos/Borrar o editar."
          )}
          {renderLink("/agregarproducto", " Agregar un Producto")}
        </div>

        <div className={select}>
          <h2 className={title1}>Usuarios</h2>

          {renderLink(
            "/pedirusuarios",
            " Ver usuarios/Borrar o editar"
          )}
          {renderLink("/registrarusuarios", "Registrar Usuarios.")}
        </div>
      
        <div className={select}>
          <h2 className={title1}>Pedidos</h2>
          {renderLink("/pedidos", " Solicitar Pedidos")}
          {renderLink("/pedidosproductos", "Solicitar pedidos con productos")}
          {renderLink("/pedidosconsultas", "pedidos por alias/fecha/id")}
          {renderLink(
            "/pedidosaliasfecha",
            " Solicitar pedidos por alias y fecha"
          )}
          {renderLink(
            "/pedidoaliasfechahora",
            "Solicitar pedido por alias, fecha y hora"
          )}
        </div>
        
      </div>
    </div>
  );
};
