import axios from "./axios.js";

// crear reserva
export const crearReservaRequest = async (values) => {
  try {
    await axios.post(`/reservas`, values);
  } catch (error) {}
};

//listo
export const listarReservasRequest = async () => {
  try {
    const { data } = await axios.get(`/reservas`);
    return data;
  } catch (error) {}
};

export const listarunReservaRequest = async (id_reserva) => {
  try {
    const { data } = await axios.get(`/reservas/${id_reserva}`);

    return data;
  } catch (error) {}
};
