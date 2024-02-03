import { useEffect, useState } from "react";
import TrabajadorCard from "../components/TrabajadorCard";
import { useProductos } from "../context/ProductoProvider";

const ListadoTrabajadores = () => {
  const { trabajadores,loadTrabajadores } = useProductos();

  useEffect(() => {
    loadTrabajadores();
  }, []);

  return (
    <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 pt-10">
      {trabajadores.map((trabajador) => (
        <TrabajadorCard trabajador={trabajador} key={trabajador.id} />
      ))}
    </div>
  );
};

export default ListadoTrabajadores;
