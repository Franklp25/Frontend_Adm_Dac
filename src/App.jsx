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
    AgregarFacturasCobrar,
    ListaCuentasCobrar,
    FacturasCliente,
    AgregaFacturasPagar,
    ListaCuentasPagar,
    FacturasProveedor,
    AgregarProducto,
    Inventario,
    ListarEstadisticas,
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
                            path="/olvidar-password"
                            element={<OlvidePassword />}
                        />
                        <Route
                            path="/olvidar-password/:token"
                            element={<NuevoPassword />}
                        />
                        <Route
                            path="/confirmar/:id"
                            element={<ConfirmarCuenta />}
                        />
                    </Routes>
                    <Protected>
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route
                                path="/agregarCliente"
                                element={<AgregarCliente />}
                            />
                            <Route
                                path="/listaCliente"
                                element={<ListaCliente />}
                            />

                            {/* Proveedores */}
                            <Route
                                path="/agregarProveedor"
                                element={<AgregarProveedor />}
                            />
                            <Route
                                path="/listaProveedor"
                                element={<ListaProveedor />}
                            />

                            {/* Cuentas Por Cobrar */}
                            <Route
                                path="/agregarFacturasCobrar/:id"
                                element={<AgregarFacturasCobrar />}
                            />
                            <Route
                                path="/listaCuentasCobrar"
                                element={<ListaCuentasCobrar />}
                            />
                            <Route
                                path="/facturasCliente/:id"
                                element={<FacturasCliente />}
                            />

                            {/* Cuentas Por Pagar */}
                            <Route
                                path="/agregarFacturasPagar/:id"
                                element={<AgregaFacturasPagar />}
                            />
                            <Route
                                path="/listaCuentasPagar"
                                element={<ListaCuentasPagar />}
                            />
                            <Route
                                path="/facturasProveedor/:id"
                                element={<FacturasProveedor />}
                            />

                            {/* Inventario */}
                            <Route
                                path="/agregarProducto"
                                element={<AgregarProducto />}
                            />
                            <Route
                                path="/inventario"
                                element={<Inventario />}
                            />

                            <Route path="/registrar" element={<Registrar />} />
                        </Routes>
                    </Protected>

                    {/* Public */}
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
