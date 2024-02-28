import { useEffect, useState } from "react";
import TrabajadorCard from "./TrabajadorCard";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { Link } from "react-router-dom";
const ListadoTrabajadores = () => {
  const { trabajadores, loadTrabajadores } = useTrabajadores();

  useEffect(() => {
    loadTrabajadores();
  }, []);

  return (
    <>
      <h1 className=" px-2 pb-2 text-3xl text-slate-700 font-bold">
        Trabajadores
      </h1>
      <Link to={"/trabajador/new"}>
        <button className="bg-huellas_color font-bold text-white rounded-full px-5 py-1 align-middle">
          Agregar Trabajador
        </button>
      </Link>
      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 pt-10">
        {trabajadores.map((trabajador) => (
          <TrabajadorCard
            trabajador={trabajador}
            key={trabajador.id_trabajador}
          />
        ))}
      </div>
    </>
  );
};

export default ListadoTrabajadores;
