import React from "react";
import { useProductos } from "../context/ProductoProvider";
import { useEffect } from "react";
import ProductoCard from "../components/ProductoCard";

const Cliente = () => {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  return (
    <div>
      <section className="px-2 pb-2 text-slate-700"><h1 className=" text-3xl  font-bold">Clientes</h1>
      <p className="text-sm font-semibold">Reserve aqui</p></section>
      
      <section className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 pt-10">
    {productos.map((producto) => (
      <ProductoCard producto={producto} key={producto.id_producto} />
    ))}
  </section></div>
    
  );
};
export default Cliente;
