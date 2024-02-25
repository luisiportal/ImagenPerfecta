
// crear reserva
export const crearReserva = async (values) => {
    const elementosAnteriores = JSON.parse(localStorage.getItem("reservasDB")) || [];

   
    const reservaJson = JSON.stringify(values);
    
    elementosAnteriores.push(reservaJson);
    localStorage.setItem("reservasDB", JSON.stringify(elementosAnteriores));
  };

  export const loadReservas = async () => {
    const elementosAnteriores = JSON.parse(localStorage.getItem("reservasDB")) || [];

    
    const reservaJson = JSON.stringify(values);
    
    elementosAnteriores.push(reservaJson);
    localStorage.setItem("reservasDB", JSON.stringify(elementosAnteriores));
  };

