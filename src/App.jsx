import "./App.css";

import { AuthProvider } from "./componenteContexto.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./componentes/auth/auth.jsx";
import { FormLogin } from "./componentes/auth/formLogin.jsx";
import { PaginaHacerPedidos } from "./componentes/paginaHacerPedidos.jsx";
import { Admin } from "./componentes/admin.jsx";
import { ProtejeAdmin } from "./componentes/protejeAdmin.jsx";

import {PedirUsuarios } from "./componentes/auth/pedirUsuarios.jsx"
//----------------------------------------------------------------------------
import { PedirPedidos } from "./componentes/pedidos/pedirPedidos.jsx";
import { PedidosProductos } from "./componentes/pedidos/pedidosProductos.jsx";
import { PedirPedidosConsultas } from "./componentes/pedidos/pedirPedidosConsultas.jsx";
import { PedidosAliasFecha } from "./componentes/pedidos/pedidosaliasfecha.jsx";
import { PedidoAliasFechaHora } from "./componentes/pedidos/pedidoaliasfechahora.jsx";
// -------------------------------------------------------------------------------
import { PedirProductos } from "./componentes/productos/pedirProductos.jsx";
import {AgregarProducto} from "./componentes/productos/agregarProducto.jsx";


import { NoEncontrado } from "./componentes/noencontrado.jsx";
import { HeaderNav } from "./componentes/headerNav.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderNav className="header" />
        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/hacerpedido" element={<PaginaHacerPedidos />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/registrarusuarios" element={<Auth />} />
          <Route path="/pedirusuarios" element={<PedirUsuarios />} />

          <Route path="/pedidos" element={<PedirPedidos />} />
          <Route path="/pedidosproductos" element={<PedidosProductos />} />
          <Route path="/pedidosconsultas" element={<PedirPedidosConsultas />} />

          <Route path="/pedidosaliasfecha" element={<PedidosAliasFecha />} />
          <Route
            path="/pedidoaliasfechahora"
            element={<PedidoAliasFechaHora />}
          />
          <Route path="/productos" element={<PedirProductos />} />
          <Route path="/agregarproducto" element={<AgregarProducto />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
