import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios.jsx";
import Alerta from "./Alerta.jsx";
import logo from "../assets/images/Logotipo_Bio&Gen.png";
const ConfirmarCuenta = () => {
    const [alerta, setAlerta] = useState({});
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${id}`;
                const { data } = await clienteAxios.get(url);

                setAlerta({
                    msg: data.msg,
                    error: false,
                });
                setCuentaConfirmada(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
            }
        };
        confirmarCuenta();
    }, []);

    const { msg } = alerta;

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-20 text-2xl font-semibold text-gray-900 dark:text-white pb-16 pt-12 "
                >
                    <img className=" w-52 h-36 mr-2" src={logo} alt="logo" />
                </a>

                <h1 className="text-blue font-black text-3xl uppercase mb-72">
                    Confirme su usuario
                    <div>{msg && <Alerta alerta={alerta} />}</div>
                    {cuentaConfirmada && (
                        <Link
                            className="block text-center my-5 uppercase text-sm"
                            to="/"
                        >
                            Inicia Sesión
                        </Link>
                    )}
                </h1>
            </div>
        </section>
    );
};

export default ConfirmarCuenta;
