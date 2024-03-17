import React from "react";
import { Form, Formik } from "formik";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "../formulario/Input";

import {
  actualizarProductoRequest,
  crearProductoRequest,
  listarunProductoRequest,
} from "../../api/productos.api";
import { useReserva } from "../../hooks/useReserva";
import { useProductos } from "../../context/ProductoProvider";

const VentasForm = ({ id_producto }) => {
  const { getProducto, updateProducto } = useProductos();
  const [file, setFile] = useState(null);
  const reserva = useReserva(1);
  const [producto, setProducto] = useState({
    id_producto: Date.now(),
    nombre_producto: "",
    descripcion: "",
    precio_venta: "",
    formato_entrega: "",
    locacion: "",
  });
  const [venta, setVenta] = useState({
    id_productoVendido: "",
    id_reserva: "",
    id_trabajador: "",
    descripcion: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducto = async () => {
      if (params.id_producto) {
        const producto = await listarunProductoRequest(params.id_producto);

        setProducto({
          id_producto: producto.id_producto,
          nombre_producto: producto.nombre_producto,
          descripcion: producto.descripcion,
          precio_venta: producto.precio_venta,
          formato_entrega: producto.formato_entrega,
          locacion: producto.locacion,
        });

        (e) => {
          setFile(e.target.files[0]);
        };
      }
      setVenta(reserva);
    };

    loadProducto();
  }, []);
  console.log(venta);
  const handleSubmit = async (values) => {
    try {
      if (params.id_producto) {
        await actualizarProductoRequest(params.id_producto, values);

        alert("Se ha actualizado el producto");
      } else {
        await crearProductoRequest(values);

        alert("Se ha creado el producto correctamente");
      }
      navigate("/productos");
    } catch (error) {
      console.log(error);
      alert("Error al actualizar producto  " + error);
    }
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-2xl lg:text-4xl">
        {params.id_producto ? "Editar Producto" : "Agregar producto"}
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={producto}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          //validationSchema={schema}
        >
          {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
            // FORMULARIO PARA RELLENAR CAMPOS
            <Form
              onSubmit={handleSubmit}
              className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto"
            >
              {
                /*muestra la imagen preview */ file && (
                  <img
                    className="w-40 h-40 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )
              }
              <Input
                label={"Nombre Producto"}
                name={"nombre_producto"}
                type={"text"}
                value={values.nombre_producto}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <label htmlFor="descripcion" className="block"></label>
              <textarea
                name="descripcion"
                rows="3"
                placeholder="Detalles del producto"
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.descripcion}
              ></textarea>
              <Input
                label={"Precio"}
                name={"precio_venta"}
                type={"text"}
                value={values.precio_venta}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                label={"Formato entrega"}
                name={"formato_entrega"}
                type={"text"}
                value={values.formato_entrega}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                label={"Locación"}
                name={"locacion"}
                type={"text"}
                value={values.locacion}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <label htmlFor="imagenPerfil" className="block"></label>
              <input
                name="ruta_image"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
              >
                {params.id_producto
                  ? "Aplicar cambios"
                  : isSubmitting
                    ? "Guardando..."
                    : "Agregar"}
              </button>
              <br />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VentasForm;
