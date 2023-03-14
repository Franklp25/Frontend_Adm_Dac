import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
    const { auth, loading } = useAuth();

    if (loading) return "Cargando..";

    return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RutaProtegida;
