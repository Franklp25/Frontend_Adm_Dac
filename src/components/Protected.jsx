import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import NotLoggedIn from "./NotLoggedIn";

export default function Protected({ children }) {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Puedes reemplazar esto por tu componente de carga.
    }

    return auth && auth.token ? children : <NotLoggedIn />;
}
