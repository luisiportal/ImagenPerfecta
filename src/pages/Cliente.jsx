import React from "react";
import { useProductos } from "../context/ProductoProvider";
import { useEffect } from "react";
import ProductoCard from "../components/ProductoCard";

const Cliente = () => {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    if (productos.length === 0) return <h1>No hay productos</h1>;
    return productos.map((producto) => (
      <ProductoCard producto={producto} key={producto.id_producto} />
    ));
  }

  return (
    <div>
      {window.location.pathname === "/cliente" && (
        <section className="px-2 pb-2 text-slate-700">
          <h1 className=" text-3xl  font-bold">Clientes</h1>
          <p className="text-sm font-semibold">Reserve aqui</p>
        </section>
      )}
      <section className="grid sm:grid-cols-1 gap-5 xl:grid-cols-3 pt-5 mx-2 lg:mx-48">
        {renderMain()}
      </section>
    </div>
  );
};
export default Cliente;
