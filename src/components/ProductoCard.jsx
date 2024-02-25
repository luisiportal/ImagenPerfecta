import { useProductos } from "../context/ProductoProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import UbicacionSVG from "./SVG/UbicacionSVG.jsx";
import EntregaSVG from "./SVG/EntregaSVG.jsx";

function ProductoCard({ producto }) {
  const [showBotones, setShowBotones] = useState(false);

  const { deleteProducto } = useProductos();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowBotones(true);
  };

  const handleMouseLeave = () => {
    setShowBotones(false);
  };

  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200  shadow rounded overflow-hidden p-2 hover:bg-huellas_color transition-all duration-500 ease-in-out cursor-pointer `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={"/new"}>
        <button className="fixed  md:hidden bottom-5 right-8 bg-huellas_color hover:bg-slate-700 text-white font-extrabold py-10 px-10 rounded-full h-8 w-8 text-4xl flex justify-center items-center">
          +
        </button>
      </Link>
      <section className="flex flex-col h-72 text-slate-800 m-2">
        <div className="flex justify-between font-bold pb-3">
          <h2>{producto.nombre_producto}</h2>
          <h2 className="text-2xl">{producto.precio_venta} cup</h2>
        </div>

        <p className="text-justify flex-grow">{producto.descripcion}</p>

        <section className="">
          <div className="flex gap-1">
            <UbicacionSVG /> <h2>{producto.locacion}</h2>
          </div>
          <div className="flex gap-1">
            <EntregaSVG /> <h2>{producto.formato_entrega}</h2>
          </div>
        </section>
      </section>

      <div className="transition-all duration-500 ease-in-out">
        {showBotones && (
          <div
            className={`${
              showBotones ? "visible" : "invisible"
            } flex gap-x-1 transition-all duration-500 ease-in-out`}
          >
            <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-huellas_color transition-all duration-500 ease-in-out">
              <button onClick={() => deleteProducto(producto.id_producto)}>
                Eliminar
              </button>
            </div>
            <div className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-huellas_color transition-all duration-500 ease-in-out">
              <button onClick={() => navigate(`edit/${producto.id_producto}`)}>
                Editar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductoCard;
