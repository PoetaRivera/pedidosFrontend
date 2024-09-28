export function HoraNormalAMilitar(horaAmPm) {
  // Parseamos la hora y el período (am/pm)
  const [hora, periodo] = horaAmPm.split(" ");
  const [horas, minutos] = hora.split(":");

  // Convertimos las horas a formato militar
  let horasMilitar = parseInt(horas, 10);
  if (periodo.toLowerCase() === "pm" && horasMilitar !== 12) {
    horasMilitar += 12;
  } else if (periodo.toLowerCase() === "am" && horasMilitar === 12) {
    horasMilitar = 0;
  }

  // Formateamos la hora en formato militar
  const horaMilitar = `${horasMilitar}:${minutos}`;

  return horaMilitar;
}
