import { Route, Routes } from "react-router-dom";
import ProductosPage from "./pages/ProductosPage";
import ProductosForm from "./pages/ProductosForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { ProductoContextProvider } from "./context/ProductoProvider";
import Movimientos from "./pages/MovimientosPage";

import AgregarMovimiento from "./pages/AgregarMovimiento";
import Prueba from "./pages/Prueba";
import TipoCambio from "./pages/TipoCambioPage";
import TipoCambioForm from "./components/TipoCambioForm";
import Login from "./components/LoginForm";
import AgregarTrabajador from "./pages/AgregarTrabajador";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Trabajador from "./pages/TrabajadorPage";
import ListadoTrabajadores from "./pages/ListadoTrabajadores";
import NuevaVenta from "./pages/NuevaVenta";

const App = () => {
  return (
    <div className="bg-white min-h-screen">
      <div>
        <ProductoContextProvider>
          <AuthProvider>
            <Navbar />
            <div className="container mx-auto">
              <Routes>
                <Route
                  path="/trabajador/login"
                  element={<Trabajador></Trabajador>}
                />

                <Route element={<ProtectedRoutes></ProtectedRoutes>}>
                  <Route path="/new" element={<ProductosForm />} />
                  <Route
                    path="/trabajador/new"
                    element={<AgregarTrabajador />}
                  />
                  <Route
                    path="/trabajador/profile/edit/:id"
                    element={<AgregarTrabajador />}
                  />
                  <Route
                    path="/venta/new"
                    element={<NuevaVenta></NuevaVenta>}
                  />
                  <Route
                    path="/trabajador/plantilla"
                    element={<ListadoTrabajadores />}
                  />
                  <Route path="movimientos" element={<Movimientos />} />
                  <Route path="/" element={<ProductosPage />} />

                  <Route
                    path="/edit/:id_producto"
                    element={<ProductosForm />}
                  />
                  <Route path="*" element={<NotFound />} />
                  <Route path="prueba" element={<Prueba></Prueba>} />

                  <Route
                    path="movimientos/entrada"
                    element={
                      <AgregarMovimiento tipo={"Entrada"} key={"entrada"} />
                    }
                  />
                  <Route
                    path="movimientos/salida"
                    element={
                      <AgregarMovimiento tipo={"Salida"} key={"salida"} />
                    }
                  />
                  <Route path="cambio" element={<TipoCambio></TipoCambio>} />
                  <Route
                    path="cambio/new"
                    element={<TipoCambio></TipoCambio>}
                  />
                  <Route
                    path="cambio/edit/:id"
                    element={<TipoCambioForm></TipoCambioForm>}
                  />
                </Route>
              </Routes>
            </div>
          </AuthProvider>
        </ProductoContextProvider>
      </div>
    </div>
  );
};

export default App;
