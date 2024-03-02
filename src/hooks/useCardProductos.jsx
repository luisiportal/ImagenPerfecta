import { useProductos } from "../context/ProductoProvider";
import ProductoCard from "../components/ProductoCard";
import { useEffect } from "react";
export function useCardProductos() {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  return productos;
}
