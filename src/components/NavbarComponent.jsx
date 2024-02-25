import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { useAuth } from "../context/AuthContext";
import { cargarPerfilRequest } from "../api/trabajador";
import BarraEscritorio from "./navbar/BarraEscritorio";

const NavbarComponent = () => {
  const [abrirHamburguesa, setabrirHamburguesa] = useState(false);
  const { logout, user } = useAuth();

  const [perfil, setPerfil] = useState({
    username: "",
    nombre: "",
    apellidos: "",
    movil: "",
    puesto: "",
  });

  const sidebarRef = useRef(null);
  const openButtonRef = useRef(null);

  useEffect(() => {
   
    function handleClickOutside(event) {
      if (sidebarRef != null) {
        if (sidebarRef.current.contains(event.target)) {
          setabrirHamburguesa(false);
        }
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          !openButtonRef.current.contains(event.target)
        ) {
          setabrirHamburguesa(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hamburguerClick = () => {
    setabrirHamburguesa(!abrirHamburguesa);
  };
  return (
    <section className="bg-slate-100">
      {/*barra escritorio*/}
      <div className="sticky w-full bg-white px-6 z-50 rounded shadow-xl">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
         <BarraEscritorio/>

          <div className="flex">
            {/* Boton hamburguesa*/}
            <div ref={openButtonRef}>
              {" "}
              <button
                onClick={hamburguerClick}
                className="mt-1 text-slate-700 border-black hover:bg-huellas_color hover:text-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 focus:ring-slate-200 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*menu hamburguesa movil y luego menu lateral */}
        <div ref={sidebarRef} className="lg:hidden">
          <div
            className={`fixed lg:hidden ${
              abrirHamburguesa ? `left-0` : `-left-80`
            }  h-full w-48 bg-white shadow-2xl transition-all duration-500 ease-in-out z-50`}
          >
            <Navbar hidden={""}> </Navbar>

            <div className="flex justify-center gap-2">
              {/*imagen de perfil movil*/}
              <button className="text-slate-500 hover:bg-huellas_color hover:text-black-300 p-1 rounded-full transition-colors focus:ring-2 focus:ring-slate-200">
                
                <img
                  className="h-12 w-12 rounded-full"
                  src={"../images/trabajadores/perfil/" + perfil.foto_perfil}
                  alt="perfil"
                />
              </button>
              
              <button
                onClick={logout}
                className="text-slate-700 hover:text-huellas_color p-1 rounded-full transition-colors focus:ring-2 rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarComponent;
