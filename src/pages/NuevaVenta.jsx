import { useProductos } from "../context/ProductoProvider.jsx";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Formik } from "formik";

const NuevaVenta = () => {
  const { productos, loadProductos } = useProductos();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadProductos();
    ;
  }, []);

  const options = productos.map((producto) => ({
    value: producto.id_producto,
    label: producto.nombre_producto,
    existencia: producto.existencia,
  }));

  function addToCart(product) {
    console.log(productos)
    setCart([...cart, product]);
  }

  return (
    <div>
      <h1>Productos</h1>
      <ul className="flex">
        {productos.map((producto) => (
          <li key={producto.id_producto}>
            <li >{producto.precio_venta}</li>
            <img className="w-12" src={`../images/productos/${producto.ruta_image}`} alt={producto.nombre_producto} />
            
            <button onClick={() => addToCart(producto.nombre_producto)}>
              {producto.nombre_producto}
            </button>
          </li>
        ))}
      </ul>
      <h1>Carrito2</h1>
      <ul>
        {cart.map((product, index) => (
          
          <li key={index}>{product}</li>
          
          
        ))}
      </ul>
    </div>
  );
};

export default NuevaVenta;
