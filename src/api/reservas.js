// crear reserva
export const crearReserva = async (values) => {
  const elementosAnteriores = JSON.parse(localStorage.getItem("reservasDB")) || [];
  console.log(elementosAnteriores);
  console.log(values);
  elementosAnteriores.push(values);
  localStorage.setItem("reservasDB", JSON.stringify(elementosAnteriores));
  
};

export const loadReservas = async () => {
  const elementosAnteriores =
    JSON.parse(localStorage.getItem("reservasDB")) || [];
};
