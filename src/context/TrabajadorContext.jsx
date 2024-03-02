import { createContext, useContext, useState } from "react";
import { trabajadoresDB } from "../db/trabajadores";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const TrabajadorContext = createContext();

export const useTrabajadores = () => {
  const context = useContext(TrabajadorContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const TrabajadorContextProvider = ({ children }) => {
  const [trabajadores, setTrabajadores] = useState(trabajadoresDB);

  async function loadTrabajadores() {
    
  setTrabajadores(useLocalStorage("trabajadoresDB",trabajadoresDB))


  }

  const createTrabajador = (values) => {
    const elementosAnteriores =
      JSON.parse(localStorage.getItem("trabajadoresDB")) || [];
    elementosAnteriores.push(values); // No es necesario convertirlo a JSON aquí
    localStorage.setItem("trabajadoresDB", JSON.stringify(elementosAnteriores));
  };

  const getTrabajador = async (id_trabajador) => {
    try {
      const response = trabajadores.filter(
        (trabajador) => trabajador.id_trabajador == id_trabajador
      );

      return response[0];
    } catch (error) {
      console.error(error);
    }
  };

  const updateTrabajador = async (id_trabajador, values) => {   
    
    try {
      const indice = trabajadores.findIndex((trabajador) => trabajador.id_trabajador == id_trabajador);
      trabajadores[indice] = values;
      localStorage.setItem("trabajadoresDB", JSON.stringify(trabajadores));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrabajador = async (id_trabajador) => {
    try {
      setTrabajadores(
        trabajadores.filter((trabajador) => trabajador.id_trabajador !== id_trabajador)
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
        createTrabajador,
        getTrabajador,
        updateTrabajador,
      }}
    >
      {children}
    </TrabajadorContext.Provider>
  );
};
