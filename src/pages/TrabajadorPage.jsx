import React from "react";
import { useAuth } from "../context/AuthContext";
import PerfilTrabajador from "../components/PerfilTrabajador";
import Login from "../components/LoginForm";
import { useEffect } from "react";
const Trabajador = () => {
  const { isAuthenticated, setIsAuthenticated, errors, login } = useAuth();
  useEffect(() => {}, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <PerfilTrabajador></PerfilTrabajador>
      ) : (
        <Login></Login>
      )}
    </>
  );
};

export default Trabajador;
