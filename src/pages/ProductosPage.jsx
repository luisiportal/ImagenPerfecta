import { useEffect } from "react";
import ProductoCard from "../components/ProductoCard";
import { useProductos } from "../context/ProductoProvider";
import { Link } from "react-router-dom";

const ProductosPage = () => {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
    console.log(productos);
  }, []);

  function renderMain() {
    
    if (productos.length === 0) return <h1>No hay productos</h1>;
    return productos.map((producto) => (
      <ProductoCard producto={producto} key={producto.id_producto} />
    ));
    
  }
  return (
    <div>
      <h1 className=" px-2 pb-2 text-3xl text-slate-700 font-bold">
        Productos
      </h1>
      <Link to={"/productos/new"}>
        <button className="bg-huellas_color font-bold text-white rounded-full px-5 py-1 align-middle">
          Agregar Producto
        </button>
      </Link>

      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 mt-8 ">
        {renderMain()};
      </div>
    </div>
  );
};

export default ProductosPage;
