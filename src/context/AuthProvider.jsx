import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

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
            } catch (error) {
                setAuth({});
                console.log(error.message); // Agrega registro de errores
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
