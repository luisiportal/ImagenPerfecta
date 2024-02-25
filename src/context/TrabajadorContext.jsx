import { createContext, useContext, useState } from "react";
import { trabajadoresDB } from "../db/trabajadores";


export const TrabajadorContext = createContext();

export const useTrabajadores = () => {
  const context = useContext(TrabajadorContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const TrabajadorContextProvider = ({ children }) => {
  const [trabajadores, setTrabajadores] = useState([]);

  async function loadTrabajadores() {
    setTrabajadores(trabajadoresDB);
  }

  const deleteTrabajador = async (id) => {
    try {
      setTrabajadores(
        trabajadores.filter((trabajador) => trabajador.id !== id)
      );
      alert("Se ha eliminado el trabajador correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TrabajadorContext.Provider
      value={{
        deleteTrabajador,
        loadTrabajadores,
        trabajadores,
      }}
    >
      {children}
    </TrabajadorContext.Provider>
  );
};
