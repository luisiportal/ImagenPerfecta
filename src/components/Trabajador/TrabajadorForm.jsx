import { Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../formulario/Input";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { schemaTrabajadores } from "../validacionForm/schemaTrabajadores";

const TrabajadorForm = () => {
  const { createTrabajador,getTrabajador,updateTrabajador} = useTrabajadores();
  const params = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [perfil, setPerfil] = useState({
    id_trabajador: Date.now(),
    username: "",
    password: "",
    nombre: "",
    apellidos: "",
    ci: "",
    telefono: "",
    puesto: "",
    direccion: "",
    salario: "",
  });
  useEffect(() => {
    const loadTrabajador = async () => {
      if (params.id) {
        const trabajador = await getTrabajador(params.id);
        setPerfil({
          id_trabajador:trabajador.id_trabajador,
          username: trabajador.username,
          password: "trabajador.data.password",
          nombre: trabajador.nombre,
          apellidos: trabajador.apellidos,
          telefono: trabajador.telefono,
          puesto: trabajador.puesto,
          direccion: trabajador.direccion,
          salario: trabajador.salario,
        });
        (e) => {
          setFile(e.target.files[0]);
        };
      }
    };
    loadTrabajador();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (params.id) {
        await updateTrabajador(params.id, values);

        alert("Se han actualizado los datos");

        navigate("/trabajador/plantilla");
      } else {
        await createTrabajador(values);

        alert("Se ha agregado un nuevo trabajador correctamente");
        navigate("/trabajador/plantilla");
      }
    } catch (error) {
      alert("Error al actualizar perfil  " + error);
    }
  };

  return (
    <div>
      <h1>Agregar Trabajador</h1>
      <Formik
        initialValues={perfil}
        enableReinitialize={true}
        validationSchema={schemaTrabajadores}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
          <Form className="bg-neutral-200 max-w-md p-4 mx-auto rounded">
            {
              /*muestra la imagen preview */ file && (
                <img
                  className="w-40 h-40 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              )
            }
            <div className="bg-neutral-200 grid sm:grid-cols-1 gap-2 xl:grid-cols-1 p-4 min-h-80 max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 shadow-xl rounded text-gray-900">
              <Input
                name={"username"}
                label={"Usuario"}
                type={"text"}
                value={values.username}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <Input
                name={"password"}
                label={"Contraseña"}
                type={"password"}
                value={values.password}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <Input
                name={"nombre"}
                label={"Nombre"}
                type={"text"}
                value={values.nombre}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"apellidos"}
                label={"Apellidos"}
                type={"text"}
                value={values.apellidos}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"ci"}
                label={"Carne Identidad"}
                type={"text"}
                value={values.ci}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"telefono"}
                label={"Teléfono"}
                type={"text"}
                value={values.telefono}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"puesto"}
                label={"Puesto"}
                type={"text"}
                value={values.puesto}
                handleChange={handleChange}
                errors={errors}
              ></Input>
                <Input
                name={"salario"}
                label={"Salario"}
                type={"number"}
                value={values.salario}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                name={"direccion"}
                label={"Dirección"}
                type={"text"}
                value={values.direccion}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <label htmlFor="imagenPerfil" className="block"></label>
              <input
                name="imagenPerfil"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <button
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
                type="submit"
                disabled={isSubmitting}
              >
                Aceptar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TrabajadorForm;
