import Edit_ElimBTN from "../LandingPage/Edit_ElimBTN.jsx";

function VentaCard({ venta }) {
  return (
    <div className={`bg-white shadow`}>
      <section className="flex flex-col text-he_card">
        <div className="bg-he_card text-white h-24 flex items-center ">
          <div className="flex-1 relative">
            <div className=" bg-huellas_color atravezado absolute z-50 right-0 h-72">
              <h3 className="rotar-36 rotate-45 pl-6 ml-2 relative top-4 ">
                FOTOBOOK
              </h3>
            </div>
            <h2 className="font-bold flex justify-center text-2xl">
              {venta.nombre_producto}
            </h2>
            <h4 className="flex justify-center font-semibold">20 Fotos</h4>
          </div>
        </div>

        <div className="flex flex-col text-2xl">
          <h2 className="flex justify-center text-7xl font-bold p-5">
            ${venta.precio_venta}
          </h2>
          <h4 className="flex justify-center -mt-4">CUP</h4>
          <h4 className="flex justify-center p-5 ">Ampliacion 20x24</h4>
          <h4 className="flex justify-center p-5 ">Llavero</h4>
          <p className=" flex flex-col grow p-5 text-base text-justify">
            {venta.descripcion}
          </p>
        
        </div>
      </section>
      <Edit_ElimBTN id_venta={venta.id_venta} />
    </div>
  );
}

export default VentaCard;
