import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AgregarSVG from "../components/SVG/AgregarSVG";
import { listarVentasRequest } from "../api/ventas.api";
import VentaCard from "../components/Ventas/VentaCard";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const loadVentas = async () => {
      try {
        const response = await listarVentasRequest();
        setVentas(response);
      } catch (error) {}
    };
    loadVentas();
  }, []);
  console.log(ventas);
  function renderMain() {
    if (ventas.length === 0) return <h1>No hay productos</h1>;
    return ventas.map((venta) => (
      <VentaCard venta={venta} key={venta.id_venta} />
    ));
  }
  return (
    <div>
      <section className="flex justify-center">
        <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
          Ventas
        </h1>
        <Link to={"/productos/new"}>
          <button className="text-slate-500 font-bold w-16 h-16 flex justify-center items-center">
            <AgregarSVG />
          </button>
        </Link>
      </section>

      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 mt-8  px-3 bg-sect_gray">
        {renderMain()}
      </div>
    </div>
  );
};

export default Ventas;
