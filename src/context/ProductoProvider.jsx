import { useContext, useState } from "react";

import { ProductoContext } from "./ProductoContext";
import { productosDB } from "../db/productos";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const ProductoContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const loadProductos = async () => {
    setProductos(useLocalStorage("productosDB",productosDB));
  };

  const deleteProducto = async (id_producto) => {
    try {
      setProductos(
        productos.filter((producto) => producto.id_producto !== id_producto)
      );
      alert("Se ha eliminado el producto correctamente");
    } catch (error) {
      console.error(error);
    }
  };
  const createProducto = async (values) => {
    const elementosAnteriores =
      JSON.parse(localStorage.getItem("productosDB")) || [];
    elementosAnteriores.push(values); // No es necesario convertirlo a JSON aquí
    localStorage.setItem("productosDB", JSON.stringify(elementosAnteriores));
  };

  const getProducto = async (id_producto) => {
    try {
      const response = productos.filter(
        (producto) => producto.id_producto == id_producto
      );

      return response[0];
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id_producto, values) => {
    try {
      const indice = productos.findIndex(
        (producto) => producto.id_producto == id_producto
      );
      productos[indice] = values;
      localStorage.setItem("productosDB", JSON.stringify(productos));
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
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
