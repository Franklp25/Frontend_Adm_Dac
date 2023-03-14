import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "./Alerta";
import logo from "../assets/images/Logotipo_Bio&Gen.png";
const NuevoPassword = () => {
    const [password, setPassword] = useState("");
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/usuarios/olvidar-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
            }
        };
        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: "La contreseña debe de ser minimo de 6 caracteres",
                error: true,
            });
            return;
        }
        try {
            const url = `/usuarios/olvidar-password/${token}`;

            const { data } = await clienteAxios.post(url, { password });
            setAlerta({
                msg: data.msg,
                error: false,
            });
            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };
    const { msg } = alerta;

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img className=" w-52 h-36 mr-2" src={logo} alt="logo" />
                </a>
                <div className="w-full rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-slate-300 dark:border-green-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className=" text-2xl text-center font-bold leading-tight tracking-tight md:text-2xl text-blue pb-5">
                            Restablece tu contraseña
                        </h1>

                        {msg && <Alerta alerta={alerta} />}
                        {tokenValido && (
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="password"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Nueva contraseña
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Escribe tu nueva contraseña"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-blue bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Restablecer
                                </button>
                            </form>
                        )}
                        {passwordModificado && (
                            <Link
                                className="block text-center my-5 uppercase text-sm"
                                to="/"
                            >
                                Inicia Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NuevoPassword;
