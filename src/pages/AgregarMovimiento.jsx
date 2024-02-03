import React, { useState, useEffect } from "react";
import Select from "react-select";

import { Form, Formik } from "formik";
import { getProductosRequest, hacerMoviemientoRequest, ipServer } from "../api/productos.api";
import BotoneraEntrada_Salida from "../components/botoneraEntrada_Salida";
import MovimientoCard from "../components/MovimientoCard";
import * as Yup from "yup";



const Dropdown = (tipo) => {
  const [estadoEnviar, setEstadoEnviar] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [productos, setProductos] = useState([]);
  const [movimiento, setMovimiento] = useState({
    cantidad: "",
    producto: "",
    tipo: tipo.tipo,
  });

  useEffect(() => {
    const loadProducto = async () => {
      try {
        const response = await getProductosRequest();
       
      setProductos(response.data);
      } catch (error) {
        
      }
      
      
    };
    loadProducto();
    
  }, [estadoEnviar]);

  const options = productos.map((producto) => ({
    value: producto.id_producto,
    label: producto.nombre_producto,
    existencia : producto.existencia,
  }));

  
  
 const schemaSalida = Yup.object().shape({

    cantidad: Yup.number()
      .max(movimiento.existencia, "La cantidad no puede ser mayor que la existencia")
      .required("Este campo es requerido"),
  });

  const schema = Yup.object().shape({
  
    cantidad: Yup.number().required("Este campo es requerido"),
  });
 

  const handleSelectChange = (p) => {
  
    setSelectedOption(p);
    console.log(p);
    setMovimiento({
      ...movimiento,
      id_producto: p.value,
      producto: p.label,
      existencia : p.existencia,
      
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <BotoneraEntrada_Salida></BotoneraEntrada_Salida>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <div>
            <Formik
              initialValues={movimiento}
              enableReinitialize={true}
              validationSchema={
    
                (movimiento.tipo ==="Salida") ? schemaSalida : schema}
              onSubmit={async (values) => {
                try {
                  await hacerMoviemientoRequest(values);
                  setEstadoEnviar(new Date().getTime());
                 
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {({
                handleChange,

                errors,
                values,
                isSubmitting,
              }) => (
                <Form>
                  <div className="bg-neutral-200 mt-6">
                    <BotoneraEntrada_Salida></BotoneraEntrada_Salida>
                  <h1 className=" text-slate-900 text-xl mb-2 p-4">
                    {"Estas a punto de hacer un movimiento de " + tipo.tipo}
                  </h1>
                  <div className="p-4 ">
                    <Select
                      name="nombre_producto"
                      options={options}
                      value={selectedOption}
                      onChange={handleSelectChange}
                      isSearchable
                    />
                  </div>
                  <div className="text-slate-900 p-4">
                    <label className="p-2" htmlFor="cantidad">
                      Cantidad :
                    </label>
                    <input
                      className="text-black"
                      name="cantidad"
                      type="text"
                      onChange={handleChange}
                      value={values.cantidad}
                    />
                    {errors.cantidad && (
                      <span className="bg-red-500 p-1 m-1">
                        {errors.cantidad}
                      </span>
                    )}
                  </div>

                  <button
                  
                    type="submit"
                    disabled={isSubmitting}
                    className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
                  >
                    {isSubmitting ? "Guardando..." : "Agregar"}
                  </button>
                  </div>
                 
                </Form>
              )}
            </Formik>
            <div className="flex justify-center items-center mt-4">
              <div>
                <MovimientoCard key={estadoEnviar}></MovimientoCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;