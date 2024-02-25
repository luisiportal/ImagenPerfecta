import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const BarraEscritorio = () => {
  return (
    <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
      <div className="flex -mr-4">
            {/*Logo */}

            <Link
              className="text-huellas_color hover:scale-110 transition-transform duration-200"
              to={"/"}
            >
              <img
                className="w-24 h-12"
                src={"../images/logo.png"}
                alt="Logo Imagen Perfecta"
              />
            </Link>
          </div>
          <div>
            <Navbar hidden={"hidden space-x-8"}></Navbar>
          </div>
    </div>
  );
};

export default BarraEscritorio;
