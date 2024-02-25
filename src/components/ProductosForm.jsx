import { Form, Formik } from "formik";
import { useProductos } from "../context/ProductoProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "./formulario/Input";

const schema = Yup.object().shape({
  nombre_producto: Yup.string().required("Nombre producto requerido"),
  precio_venta: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Precio Requerido"),
});

const ProductoForm = () => {
  const { createProducto, getProducto, updateProducto } = useProductos();
  const [file, setFile] = useState(null);
  const [producto, setProducto] = useState({
    id_producto : Date.now(),
    nombre_producto: "",
    descripcion: "",
    precio_venta: "",
    formato_entrega: "",
    locacion: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
  
    try {
      if (params.id_producto) {
        await updateProducto(params.id_producto, values);

        alert("Se ha actualizado el producto");

        
      } else {
        await createProducto(values);
        alert("Se ha creado el producto correctamente");
      
      }
    } catch (error) {
      console.log(error);
      alert("Error al actualizar producto  " + error);
    }
  };

  useEffect(() => {
    const loadProducto = async () => {
      if (params.id_producto) {
        const producto = await getProducto(params.id_producto);
        console.log(producto);
        setProducto({
          nombre_producto: producto.nombre_producto,
          descripcion: producto.descripcion,
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

export default ProductoForm;
