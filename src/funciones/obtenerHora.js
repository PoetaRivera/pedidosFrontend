//Obtiene la hora del pedido
export const obtenerHora = () => {
  const tiempo = new Date();
  const hours = tiempo.getHours();
  const minutes = tiempo.getMinutes();
  let tiempoPedido = `${hours}:${minutes}`;
  return tiempoPedido;
};
