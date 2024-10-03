import axios from "axios";
// export const API = "http://localhost:4000/api";
 export const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api";

axios.defaults.withCredentials = true;

// ********************************************************************************************
// Seccion Usuarios
// ********************************************************************************************
// Registra Usuario
export const registerRequest = (user) => axios.post(`${API}/register`, user);
// Inicio de Sesion (Login)
export const loginRequest = (user) => axios.post(`${API}/login`, user);
// Termina Sesion (Logout)
export const logoutRequest = () => axios.post(`${API}/logout`);
// Verifica usuario
export const verificarRequest = (user) => axios.post(`${API}/verificar`, user);
export const usuariosRequest = () => axios.get(`${API}/pedirusuarios`);
export const editarUsuarioRequest = (datos) =>
  axios.put(`${API}/editarusuario/${datos.id}`, datos);
export const borrarUsuarioRequest = (id) =>
  axios.delete(`${API}/borrarusuario/${id}`);
// **********************************************************************************************
// Seccion Pedidos
// **********************************************************************************************
// Agrega un pedido
export const agregarPedidoRequest = (pedido) =>
  axios.post(`${API}/agregarPedido`, pedido);
//---------------------------------------------------------------------------------------------
// Solicita todos los pedidos pero sin productos
export const pedirPedidosRequest = () => axios.get(`${API}/pedirpedidos`);
//---------------------------------------------------------------------------------------------
// Solicita todos los pedidos incluyendo el detalle de productos
export const pedirPedidosProductosRequest = () =>
  axios.get(`${API}/pedirpedidosproductos`);
//---------------------------------------------------------------------------------------------
// Solicita todos los pedidos de una fecha dada incluyendo el detalle de productos
export const pedirPedidosPorFechaRequest = (fecha) =>
  axios.get(`${API}/pedirpedidosFecha/${fecha}`);
//---------------------------------------------------------------------------------------------
// Solicita todos los pedidos de un alias dado incluyendo el detalle de productos
export const pedirPedidosPorAliasRequest = (alias) =>
  axios.get(`${API}/pedirpedidosalias/${alias}`);
//---------------------------------------------------------------------------------------------
// Solicita todos los pedidos de un id dado incluyendo el detalle de productos
export const pedirPedidosPorIdRequest = (id) =>
  axios.get(`${API}/pedirpedidosid/${id}`);
//---------------------------------------------------------------------------------------------
// Solicita todos los pedidos de un alias y fecha dados, incluyendo el detalle de productos
export const pedirPedidosPorAliasFechaRequest = (alias, fecha) =>
  axios.get(`${API}/pedirpedidosaliasfecha/${alias}/${fecha}`);
//---------------------------------------------------------------------------------------------
// Solicita todos los pedidos de un alias, fecha y hora dados incluyendo el detalle de productos
export const pedirPedidosPorAliasFechaHoraRequest = (alias, fecha, hora) =>
  axios.get(`${API}/pedirpedidoaliasfechahora/${alias}/${fecha}/${hora}`);
//---------------------------------------------------------------------------------------------
// Borrar un pedido por id
export const borraPedidoId = (id) => axios.delete(`${API}/borrarpedido/${id}`);
//---------------------------------------------------------------------------------------------
// **********************************************************************************************
// Seccion Productos**********
// **********************************************************************************************

export const productosRequest = () => axios.get(`${API}/pedirproductos`);
export const agregarProductosRequest = (datos) =>
  axios.post(`${API}/crearproducto`, datos);
export const editarProductosRequest = (datos) =>
  axios.put(`${API}/editarproducto/${datos.id}`, datos);
export const borrarProductoRequest = (id) =>
  axios.delete(`${API}/borrarproducto/${id}`);
