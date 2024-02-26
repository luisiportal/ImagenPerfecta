import React from "react";
import Navbar from "./Navbar";

const BarraMovil = ({abrirHamburguesa,perfil,logout}) => {
  return (
   
      <div
        className={`fixed mt-8 lg:hidden ${
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
   
  );
};

export default BarraMovil;
