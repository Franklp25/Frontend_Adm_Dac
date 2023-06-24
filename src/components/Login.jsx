import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "./Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import logo from "../assets/images/Logotipo_Bio&Gen.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post("/usuarios/login", {
                email,
                password,
            });
            setAlerta({});
            localStorage.setItem("token", data.token);
            setAuth(data);
            window.location = "/home";
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
                    <img className=" w-53 h-36 mr-2" src={logo} alt="logo" />
                </a>
                <div className="w-full rounded-2xl shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-300 border-green-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className=" text-2xl text-center font-bold leading-tight tracking-tight md:text-2xl text-blue">
                            Inicio Sesión
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                ></label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Usuario"
                                    required=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                ></label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-blue focus:ring-3 focus:ring-primary-300 "
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="dark:text-blue font-bold"
                                        >
                                            Recordar
                                        </label>
                                    </div>
                                </div>
                                <Link
                                    to="./olvidar-password"
                                    className="text-sm  text-blue font-bold hover:underline text-primary-500"
                                >
                                    ¿Olvidó la contraseña?
                                </Link>
                            </div> */}
                            <button
                                type="submit"
                                className="w-full text-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Iniciar
                            </button>
                            {msg && <Alerta alerta={alerta} />}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
