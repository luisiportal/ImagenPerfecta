import { useState, useEffect } from "react";
import { getTodasMonedaRequest } from "../api/productos.api";
import { useNavigate } from "react-router-dom";

const TipoCambioCard = () => {
  const [monedas, setMonedas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMonedas = async () => {
      try {
        const response = await getTodasMonedaRequest();
        setMonedas(response.data);
      } catch (error) {}
    };

    loadMonedas();
  }, []);

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4 mt-8">
      {monedas.map((moneda) => (
        <header key={moneda.id} className="flex p-4">
          <div className="px-3 text-left shadow-xl rounded-md">
            <h2 className="text-xl font-bold ">Moneda: {moneda.moneda}</h2>
            <h3 className="text-lg">Precio: {moneda.precio}</h3>
          </div>
          <button
            className="bg-huellas_color px-2 py-1 font-bold text-zinc-1000 rounded-md"
            onClick={() => navigate(`edit/${moneda.id}`)}
          >
            Editar
          </button>
        </header>
      ))}
    </div>
  );
};

export default TipoCambioCard;