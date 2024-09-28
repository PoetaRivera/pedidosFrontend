/* eslint-disable react/prop-types */

import "./producto.css";
//import { obtenerHora } from "../funciones/obtenerHora.js";

// Componente utilizado en paginahacerpedidos
export function Productos({
  idProducto,
  descripcionProducto,
  precioProducto,
  nombreProducto,
  misProductos,
  setMisProductos,
}) {
  // tener presente que misProductos es una copia de productos que es lo que hay en la base de datos
  // actualiza cantidad y hora de pedido, según el cliente lo cambie
  function guardeCantidad(e) {
    const miCantidad = e.target.value;
    const miId = e.target.dataset.id;
    const misProductosCopia = misProductos.map((ele) => {
      if (ele.id === miId) {
        return {
          ...ele,
          cantidad: miCantidad,
        };
      }
      return ele;
    });
    setMisProductos(misProductosCopia);
  }



  return (
    <div className="principal-producto">
      <div className="encabezado">
        <span className="col enc">id:</span>
        <span className="col enc">Descripción:</span>
        <span className="col enc">Precio:</span>
        <span className="col enc">Nombre:</span>
        <span className="col enc">Cantidad:</span>
      </div>

      <div className="producto">
        <span className="col pro">{idProducto}</span>
        <span className="col pro">{descripcionProducto}</span>
        <span className="col pro">{precioProducto}</span>
        <span className="col pro">{nombreProducto}</span>

        <input
          className="col pro input"
          onChange={guardeCantidad}
          data-id={idProducto}
          type="number"
          min={"0"}
          onFocus={(e) => {
            if (e.target.value === "0") e.target.value = "";
          }}
          onBlur={(e) => {
            if (e.target.value === "") e.target.value = "0";
          }}
          placeholder="Ingrese cantidad"
          defaultValue={"0"}
        ></input>
      </div>
    </div>
  );
}
