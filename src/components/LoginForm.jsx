import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../api/trabajador";
import MostrarError from "./validacionForm/mostrarError";

const Login = () => {
  const { isAuthenticated, errors, login,setPerfil } = useAuth();
  const [credencial_invalida, setCredencial_invalida] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <h1 className=" text-3xl text-huellas_color font-bold mx-auto p-5 grid place-items-center">
        Acceso Trabajadores
      </h1>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Campo requerido")
            .max(20, "Credencial incorrecta"),
          password: Yup.string()
            .required("Campo requerido")
            .max(20, "Credencial incorrecta")
            .matches(/^[a-zA-Z0-9-. ]*$/, "Solo se permiten letras y números"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const id_usuarioAutenticado = loginRequest(values);
            console.log(id_usuarioAutenticado);
            login(id_usuarioAutenticado);
            

  
          } catch (error) {}
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="w-80 grid grid-cols-1 gap-2  p-4 min-h-80 m-auto mt-16 shadow-xl  text-gray-900 bg-neutral-200">
              <label className="text-gray-900" htmlFor="username">
                Usuario :
              </label>
              <Field
                className=" border-b-huellas_color"
                type="text"
                name="username"
              />
              <MostrarError campo={"username"} errors={errors} />
              <label className="text-gray-900" htmlFor="password">
                Contraseña :
              </label>
              <Field
                className=" border-b-huellas_color"
                type="password"
                name="password"
              />
              <MostrarError campo={"password"} errors={errors} />

              {credencial_invalida && (
                <span className="bg-red-500 p-1 m-1 rounded">
                  {credencial_invalida}
                </span>
              )}
              <button
                className="w-full bg-huellas_color text-2md text-white font-semibold block p-2 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Iniciar sesión
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center items-center mt-52">
        <img
          className="w-52  "
          src="../images/huellas_letras.png"
          alt="Logo Huellas Redondo"
        />
      </div>
    </div>
  );
};

export default Login;
