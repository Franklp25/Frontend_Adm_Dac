import { fromJSON } from "postcss";

export { default as Protected } from "./Protected.jsx";
export { default as NotLoggedIn } from "./NotLoggedIn.jsx";

export { default as Home } from "./Home.jsx";
export { default as Registrar } from "./Registrar.jsx";
export { default as Login } from "./Login.jsx";
export { default as Navbar } from "./Navbar.jsx";
export { default as OlvidePassword } from "./OlvidePassword.jsx";
export { default as NuevoPassword } from "./NuevoPassword.jsx";
export { default as ConfirmarCuenta } from "./ConfirmarCuenta.jsx";

//Clientes
export { default as AgregarCliente } from "./Clientes/AgregarCliente.jsx";
export { default as ListaCliente } from "./Clientes/ListaCliente.jsx";

//Proveedores
export { default as AgregarProveedor } from "./Proveedores/AgregarProveedor.jsx";
export { default as ListaProveedor } from "./Proveedores/ListaProveedor.jsx";

//cuentas por cobrar
export { default as AgregarFacturasCobrar } from "./CuentasCobrar/AgregarFacturasCobrar.jsx";
export { default as ListaCuentasCobrar } from "./CuentasCobrar/ListaCuentasCobrar.jsx";
export { default as FacturasCliente } from "./CuentasCobrar/FacturasCliente.jsx";

//cuentas por pagar
export { default as AgregaFacturasPagar } from "./CuentasPagar/AgregarFacturasPagar.jsx";
export { default as FacturasProveedor } from "./CuentasPagar/FacturasProveedor.jsx";
export { default as ListaCuentasPagar } from "./CuentasPagar/ListaCuentasPagar.jsx";

//Inventario
export { default as AgregarProducto } from "./Inventario/AgregarProducto.jsx";
export { default as Inventario } from "./Inventario/Inventario.jsx";

//Estadistica
export { default as Estadistica } from "./Estadisctica/Estadistica.jsx";
