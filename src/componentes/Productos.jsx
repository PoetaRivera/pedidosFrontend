/* eslint-disable react/prop-types */

import "./producto.css";
//import { obtenerHora } from "../funciones/obtenerHora.js";

// Componente utilizado en paginahacerpedidos
export function Productos({
  idProducto,
  descripcionProducto,
  precioProducto,
  nombreProducto,
  cantidad,
  misProductos,
  setMisProductos,
}) {
  // tener presente que misProductos es una copia de productos que es lo que hay en la base de datos
  // actualiza y agrega cantidad al producto en el cual ha habido un cambio en valor, según el cliente lo cambie
  function guardeCantidad(e) {
    const miCantidad = e.target.value;
    const miId = e.target.dataset.id;
    const misProductosCopia = misProductos.map((producto) => {
      if (producto.id === miId) {
        return {
          ...producto,
          cantidad: miCantidad,
        };
      }
      return producto;
    });
    setMisProductos(misProductosCopia);
  }



  return (
    <div className="principal-producto">
      <div className="encabezado">
        <span style={{ display: "none" }} className="col enc">
          id:
        </span>
        <span className="col enc">Descripción:</span>
        <span className="col enc">Precio:</span>
        <span className="col enc">Nombre:</span>
        <span className="col enc">Cantidad:</span>
      </div>

      <div className="producto">
        <span style={{ display: "none" }} className="col pro">
          {idProducto}
        </span>
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
            // desaparece el cero sin necesidad de borrarlo
            if (e.target.value === "0") e.target.value = "";
          }}
          onBlur={(e) => {
            // recoloca el cero si queda vacio
            if (e.target.value === "") e.target.value = "0";
          }}
          placeholder="Ingrese cantidad"
          defaultValue={cantidad}
        ></input>
      </div>
    </div>
  );
}
