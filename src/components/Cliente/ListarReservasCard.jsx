import React from "react";
const ListarReservasCard = ({ reserva }) => {
  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200  shadow rounded overflow-hidden p-2`}
    >
      <main>
        <article className="px-3 text-left text-slate-700 font-semibold block">
          <h4>Cliente : {`${reserva.nombre_cliente} ${reserva.apellidos}`}</h4>

          <h5>CI:{reserva.ci}</h5>
          <h5>Telefono: {reserva.telefono}</h5>
          <h5>Fecha Sesion : {reserva.fecha_sesion}</h5>
        </article>
      </main>
    </div>
  );
};
export default ListarReservasCard;
