import React from "react";
import { reservasDB } from "../../db/reservas";
import { useState,useEffect } from "react";
import ListarReservasCard from "./ListarReservasCard";


const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {

    if (localStorage.getItem("reservasDB")) {
      setReservas(JSON.parse(localStorage.getItem("reservasDB")));
    } else {
      setReservas(
        localStorage.setItem("reservasDB", JSON.stringify(reservasDB))
      );
    }

  }, []);

  return (
    <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 pt-10">
      {reservas.map((reserva) => (
        <ListarReservasCard reserva={reserva} key={reserva.id_reserva} />
      ))}
    </div>
  );
};

export default ListarReservas;
