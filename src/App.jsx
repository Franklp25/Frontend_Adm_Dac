import {
    Protected,
    Home,
    Registrar,
    Login,
    OlvidePassword,
    NuevoPassword,
    ConfirmarCuenta,
    AgregarCliente,
    ListaCliente,
    AgregarProveedor,
    ListaProveedor,
    AgregarCuentasCobrar,
    ListaCuentasCobrar,
    FacturasCliente,
    AgregarCuentasPagar,
    ListaCuentasPagar,
    AgregarProducto,
    Inventario,
    Estadistica,
} from "./components";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="olvidar-password"
                            element={<OlvidePassword />}
                        />

                        <Route
                            path="olvidar-password/:token"
                            element={<NuevoPassword />}
                        />
                        <Route
                            path="confirmar/:id"
                            element={<ConfirmarCuenta />}
                        />
                    </Routes>
                    <Protected>
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route
                                path="agregarCliente"
                                element={<AgregarCliente />}
                            />
                            <Route
                                path="listaCliente"
                                element={<ListaCliente />}
                            />

                            {/* Proveedores */}
                            <Route
                                path="agregarProveedor"
                                element={<AgregarProveedor />}
                            />
                            <Route
                                path="listaProveedor"
                                element={<ListaProveedor />}
                            />

                            {/* Cuentas Por Cobrar */}
                            <Route
                                path="agregarCuentasCobrar"
                                element={<AgregarCuentasCobrar />}
                            />
                            <Route
                                path="listaCuentasCobrar"
                                element={<ListaCuentasCobrar />}
                            />
                            <Route
                                path="facturasCliente/:id"
                                element={<FacturasCliente/>}
                            />

                            {/* Cuentas Por Pagar */}
                            <Route
                                path="agregarCuentasPagar"
                                element={<AgregarCuentasPagar />}
                            />
                            <Route
                                path="listaCuentasPagar"
                                element={<ListaCuentasPagar />}
                            />

                            {/* Inventario */}
                            <Route
                                path="agregarProducto"
                                element={<AgregarProducto />}
                            />
                            <Route path="inventario" element={<Inventario />} />

                            {/* Estadiscticas */}
                            <Route
                                path="estadistica"
                                element={<Estadistica />}
                            />
                            <Route path="registrar" element={<Registrar />} />
                        </Routes>
                    </Protected>

                    {/* Public */}
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
