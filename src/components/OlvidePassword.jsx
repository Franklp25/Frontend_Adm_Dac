import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios.jsx";
import Alerta from "./Alerta.jsx";
import logo from "../assets/images/Logotipo_Bio&Gen.png";

const OlvidePassword = () => {
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "") {
            setAlerta({
                msg: "Correo obligatorio",
                error: true,
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post(
                `/usuarios/olvidar-password`,
                { email }
            );
            setAlerta({
                msg: data.msg,
                error: false,
            });
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
                        <h1 className=" text-2xl text-center font-bold leading-tight tracking-tight md:text-2xl text-blue">
                            Recupera tu contraseña
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="uppercase text-gray-600 block   text-xs font-bold pb-2"
                                >
                                    Correo electronico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Correo"
                                    required=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-blue bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Enviar correo
                            </button>
                            {msg && <Alerta alerta={alerta} />}
                        </form>
                        {/* <Link
                            className="block text-center my-5 uppercase text-sm"
                            to="/"
                        >
                            Inicia Sesión
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OlvidePassword;
