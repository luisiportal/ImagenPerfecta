import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { cargarPerfilRequest } from "../api/trabajador";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState({
    username: "",
    nombre: "",
    apellidos: "",
    movil: "",
    puesto: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function checkLogin() {
      if (!localStorage.getItem("autenticadp", "soloPruebasSinBackend")) {
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

  const login = (id_usuarioAutenticado) => {
    localStorage.setItem("autenticadp", id_usuarioAutenticado);
   setUser(id_usuarioAutenticado);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem("autenticadp", "soloPruebasSinBackend");
    setIsAuthenticated(false);
  };
  const cargarPerfil = () => {

    const response = cargarPerfilRequest(user);
 setPerfil(response);
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
