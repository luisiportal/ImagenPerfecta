import { useLocalStorage } from "../hooks/useLocalStorage";
import { reservasDB } from "../db/reservas";
// crear reserva
export const crearReserva = async (values) => {
  const elementosAnteriores = JSON.parse(localStorage.getItem("reservasDB")) || [];
  elementosAnteriores.push(values);
  localStorage.setItem("reservasDB", JSON.stringify(elementosAnteriores));
  
};

