import { useState, useEffect, createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const { data } = await clienteAxios.get(
                    "/usuarios/perfil",
                    config
                );
                setAuth(data);
                navigate("/home");
            } catch (error) {
                setAuth({});
            }
            setLoading(false);
        };

        autenticarUsuario();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
