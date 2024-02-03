import { Form, Formik } from "formik";
import { useProductos } from "../context/ProductoProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const schema = Yup.object().shape({
  nombre_producto: Yup.string().required("Nombre producto requerido"),
  costo_unitario: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Costo Requerido"),
  precio_venta: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Precio Requerido"),
  categoria: Yup.string().default("Sin categoria"),
  existencia: Yup.number().default(0),
});

const ProductoForm = () => {
  const { createProducto, getProducto, updateProducto } = useProductos();
  const [file, setFile] = useState(null);
  const [producto, setProducto] = useState({
    nombre_producto: "",
    description_producto: "",
    costo_unitario: "",
    precio_venta: "",
    categoria: "Sin categoria",
    existencia: 0,
  });

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre_producto", values.nombre_producto);
    formData.append("description_producto", values.description_producto);
    formData.append("costo_unitario", values.costo_unitario);
    formData.append("precio_venta", values.precio_venta);
    formData.append("categoria", values.categoria);

    formData.append("stockMinimo", values.stockMinimo);
    formData.append("unidadMedida", values.unidadMedida || "pcs");

    if (file !== null) {
      formData.append("imagenPerfil", file);
    }

    try {
      if (params.id_producto) {
        await updateProducto(params.id_producto, formData);

        alert("Se ha actualizado el producto");

        navigate("/");
      } else {
        await createProducto(formData);
        alert("Se ha creado el producto correctamente");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Error al actualizar producto  " + error);
    }
    console.log(formData);
  };

  useEffect(() => {
    const loadProducto = async () => {
      if (params.id_producto) {
        const producto = await getProducto(params.id_producto);
        console.log(producto);
        setProducto({
          nombre_producto: producto.nombre_producto,
          description_producto: producto.description_producto,
          costo_unitario: producto.costo_unitario,
          precio_venta: producto.precio_venta,
          categoria: producto.categoria,
          stockMinimo: producto.stockMinimo,
          unidadMedida: producto.unidadMedida,
        });
        (e) => {
          setFile(e.target.files[0]);
        };
      }
    };
    loadProducto();
  }, []);

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="text-sm font-bold text-white">
        {params.id_producto ? "Editar Producto" : "Agregar producto"}
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={producto}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={schema}
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
              <label htmlFor="nombre" className="block">
                * Nombre:
              </label>
              <input
                type="text"
                name="nombre_producto"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.nombre_producto}
              />
              {errors.nombre_producto && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.nombre_producto}
                </span>
              )}

              <label htmlFor="description_producto" className="block"></label>
              <textarea
                name="description_producto"
                rows="3"
                placeholder="Breve descripcion"
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.description_producto}
              ></textarea>
              <div></div>
              <label htmlFor="costo" className="block">
                *Costo:
              </label>
              <input
                type="text"
                name="costo_unitario"
                placeholder=""
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.costo_unitario}
              />
              {errors.costo_unitario && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.costo_unitario}
                </span>
              )}
              <label htmlFor="precio_venta" className="block">
                Precio Venta:
              </label>
              <input
                type="text"
                name="precio_venta"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.precio_venta}
              />
              {errors.precio_venta && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.precio_venta}
                </span>
              )}
              <label htmlFor="unidadMedida" className="block">
                Unidad de Medida:
              </label>
              <input
                type="text"
                name="unidadMedida"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.unidadMedida || "pcs"}
              />

              <label htmlFor="stockMinimo" className="block">
                Cant mínima:
              </label>
              <input
                type="text"
                name="stockMinimo"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.stockMinimo || 0}
              />
              <label htmlFor="categoria" className="block">
                Elegir Categoría:
              </label>
              <select
                name="categoria"
                onChange={handleChange}
                value={values.categoria || ""}
                className="block my-2 rounded-sm"
              >
                <option value="Sin categoria">Sin categoria</option>
                <option value="Higiene">Higiene</option>
                <option value="Comida">Comida</option>
                <option value="Medicina">Medicina</option>
              </select>
              <label htmlFor="imagenPerfil" className="block"></label>
              <input
                name="imagenPerfil"
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

export default ProductoForm;