import React from 'react'
import { useAuth } from "../context/AuthContext";
import PerfilTrabajador from '../components/PerfilTrabajador';
import Login from '../components/LoginForm';
import { useEffect } from 'react';
const Trabajador = () => {
    const { isAuthenticated,setIsAuthenticated, errors,login } = useAuth();
    useEffect(() => {
      
    }, [isAuthenticated]);


  return (

    <div>

      {(isAuthenticated)? <PerfilTrabajador ></PerfilTrabajador> : <Login></Login> }
  
      

    </div>
  )
}

export default Trabajador
