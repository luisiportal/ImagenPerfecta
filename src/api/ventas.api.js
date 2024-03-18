import axios from "./axios.js";



export const listarVentasRequest = async () => {
    try {
      const { data } = await axios.get(`/ventas`);
      return data;
    } catch (error) {}
  };