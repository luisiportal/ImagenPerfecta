import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavbarComponent from "./components/NavbarComponent";
import Prueba from "./pages/Prueba";
import { AuthProvider } from "./context/AuthContext";
import Trabajador from "./pages/TrabajadorPage";
import PaginaInicio from "./pages/PaginaInicio";
import TrabajadorRoutes from "./routes/TrabajadorRoutes";
import ProductosRoutes from "./routes/ProductosRoutes";
import ClienteRoutes from "./routes/ClienteRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <div className="bg-white min-h-screen">
      <AuthProvider>
        <nav>
          <NavbarComponent />
        </nav>

        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/trabajador/login" element={<Trabajador />} />
            <Route path="*" element={<NotFound />} />
            <Route path="prueba" element={<Prueba></Prueba>} />
            <Route path="/cliente/*" element={<ClienteRoutes />} />
           
           

           
            <Route element={<ProtectedRoutes></ProtectedRoutes>}>
              <Route path="/productos/*" element={<ProductosRoutes />} />
              <Route path="/trabajador/*" element={<TrabajadorRoutes />} />
            </Route>

          
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
};

export default App;
