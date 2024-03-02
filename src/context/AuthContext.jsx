import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { cargarPerfilRequest } from "../api/trabajador";
import { usuariosDB } from "../db/usuarios";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState({
    id: 1,
    nombre: "Luis Ernesto",
    apellidos: "Rodriguez",
    ci: "920151569",
    movil: "58155198",
    puesto: "Mantenimiento",
    direccion: "Calle 6 #11 Reparto Versalles",
    salario: 31000,
    foto_perfil: "jorgeRepartidor.jpg",
    id_usuario: 1,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function checkLogin() {
      if (!localStorage.getItem("user", user)) {
        setIsAuthenticated(false);
        return setUser(null);
      } else {
        setIsAuthenticated(true);
      }
    }
    checkLogin();
  }, []);

  const signup = async (formData) => {
    try {
      await registerRequest(formData);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const login = (values) => {
    const usuarioIngresado = values.username;
    const contrasenaIngresada = values.password;

    // Busca el usuario en usuariosDB
    const usuarioEncontrado = usuariosDB.find(
      (user) => user.username === usuarioIngresado
    );

    if (usuarioEncontrado) {
      if (usuarioEncontrado.password === contrasenaIngresada) {
        console.log("Inicio de sesión exitoso");
        setIsAuthenticated(true);
      } else {
        console.log("Contraseña incorrecta");
      }
    } else {
      console.log("Usuario no encontrado");
    }
  };

  const logout = async () => {
    localStorage.removeItem("user", user);
    setIsAuthenticated(false);
  };
  const cargarPerfil = () => {
    setPerfil({
      id: 1,
      nombre: "Luis Ernesto",
      apellidos: "Rodriguez",
      ci: "920151569",
      movil: "58155198",
      puesto: "Mantenimiento",
      direccion: "Calle 6 #11 Reparto Versalles",
      salario: 31000,
      foto_perfil: "jorgeRepartidor.jpg",
      id_usuario: 1,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        logout,
        errors,
        login,
        loading,
        setIsAuthenticated,
        cargarPerfil,
        perfil,
        setPerfil,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
