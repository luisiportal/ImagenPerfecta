import React from "react";
import { Route, Routes } from "react-router-dom";
import { TrabajadorContextProvider } from "../context/TrabajadorContext";
import AgregarTrabajador from "../pages/AgregarTrabajador";
import ListadoTrabajadores from "../pages/ListadoTrabajadores";
const TrabajadorRoutes = () => {
  return (
    <TrabajadorContextProvider>
      <Routes>
        <Route path="/new" element={<AgregarTrabajador />} />
        <Route
          path="/profile/edit/:id"
          element={<AgregarTrabajador />}
        />
        <Route path="/plantilla" element={<ListadoTrabajadores />} />
      </Routes>
    </TrabajadorContextProvider>
  );
};

export default TrabajadorRoutes;
