import { createContext, useContext, useState } from "react";
import {
  getProductosRequest,
  deleteProductoRequest,
  createProductoRequest,
  getProductoRequest,
  updateProductoRequest,
  deleteTrabajadorRequest,
  cargarPlantillaTrabajadores,
} from "../api/productos.api";
import { ProductoContext } from "./ProductoContext";

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const ProductoContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);

  async function loadTrabajadores() {
    const response = await cargarPlantillaTrabajadores();
    setTrabajadores(response.data);
  }

  const deleteTrabajador = async (id) => {
    try {
      const response = await deleteTrabajadorRequest(id);
      setTrabajadores(
        trabajadores.filter((trabajador) => trabajador.id !== id)
      );
      alert("Se ha eliminado el trabajador correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  async function loadProductos() {
    const response = await getProductosRequest();
    setProductos(response.data);
  }

  const deleteProducto = async (id_producto) => {
    try {
      const response = await deleteProductoRequest(id_producto);
      setProductos(
        productos.filter((producto) => producto.id_producto !== id_producto)
      );
      alert("Se ha eliminado el producto correctamente");
    } catch (error) {
      console.error(error);
    }
  };
  const createProducto = async (formData) => {
    try {
      await createProductoRequest(formData);
      // setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getProducto = async (id_producto) => {
    try {
      const response = await getProductoRequest(id_producto);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id_producto, formData) => {
    try {
      const response = await updateProductoRequest(id_producto, formData);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loadProductos,
        createProducto,
        deleteProducto,
        getProducto,
        updateProducto,
        deleteTrabajador,
        loadTrabajadores,
        trabajadores,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};