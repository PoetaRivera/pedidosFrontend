 export function obtenerFecha() {
   const fechaActual = new Date();

   // Obtenemos el día, el mes y el año
   const dia = fechaActual.getDate();
   const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son base 0 (enero = 0, febrero = 1, etc.)
   const anio = fechaActual.getFullYear() % 100; // Tomamos solo los últimos dos dígitos del año

   // Creamos una cadena con el formato deseado
   const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
     .toString()
     .padStart(2, "0")}/${anio.toString().padStart(2, "0")}`;

   return fechaFormateada;
 }
