import axios from "./axios.js";

//productos
export let ipServer = "192.168.1.1";

export const getProductosRequest = async () => await axios.get(`/Productos`);

export const createProductoRequest = async (formData) =>
  await axios.post(`/Productos`, formData);

export const deleteProductoRequest = async (id_producto) =>
  await axios.delete(`/Productos/${id_producto}`);

export const getProductoRequest = async (id_producto) =>
  await axios.get(`/Productos/${id_producto}`);

export const updateProductoRequest = async (id_producto, formData) =>
  await axios.put(`/Productos/${id_producto}`, formData);

//movimientos

export const hacerMoviemientoRequest = async (values) =>
  await axios.put(`/Movimientos/new`, values);

export const getTodosMovimientosRequest = async () =>
  await axios.get("/Movimientos");

//moneda
export const getTodasMonedaRequest = async () => await axios.get(`/cambio/`);

export const get1MonedaRequest = async (id) => await axios.get(`/cambio/${id}`);

export const crearMonedaRequest = async (values) =>
  await axios.post(`/cambio/new`, values);

export const updateMoneda = async (id, values) =>
  await axios.put(`/cambio/${id}`, values);

// usuarios
export const registerRequest = async (formData) =>
  await axios.post(`/api/trabajador/register`, formData);

//login
export const loginRequest = async (values) =>
  await axios.post(`/api/trabajador/login/`, values);

//logout

export const logoutRequest = async () =>
  await axios.post(`/api/trabajador/logout`);

//perfil
export const cargarPerfilRequest = async (id) =>
  await axios.get(`/api/trabajador/profile/${id}`);

// plantilla trabajadores
export const cargarPlantillaTrabajadores = async () =>
  await axios.get(`api/trabajador/plantilla`);

export const perfilRequest = async (values) =>
  await axios.post(`/api/trabajador/profile`, values);

// actualizar trabajador
export const updateTrabajadorRequest = async (id, formData) =>
  await axios.put(`/api/trabajador/profile/${id}`, formData);

export const deleteTrabajadorRequest = async (id) =>
  await axios.delete(`/api/trabajador/profile/${id}`);

//verificar token

export const verifyTokenRequest = () => axios.get(`api/auth/verify`);
