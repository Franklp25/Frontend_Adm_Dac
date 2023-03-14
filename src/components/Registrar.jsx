import { useState } from "react";
import logo from "../assets/images/Logotipo_Bio&Gen.png";
import Alerta from "./Alerta.jsx";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: "La contraseña no coincide",
                error: true,
            });
            return;
        }

        if (password.length < 6) {
            setAlerta({
                msg: "Contraseña débil, agrega mínimo 6 caracteres",
                error: true,
            });
            return;
        }

        setAlerta({});

        //crear el usuario en API

        try {
            const { data } = await clienteAxios.post(`/usuarios`, {
                nombre,
                email,
                password,
            });

            setAlerta({
                msg: data.msg, //se trae los mensajes del backend
                error: false,
            });

            setNombre("");
            setEmail("");
            setPassword("");
            setRepetirPassword("");
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;

    return (
        <section className="bg-gray-50  p-20">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img className=" w-52 h-36 mr-2" src={logo} alt="logo" />
                </a>
                <div className="w-full  rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-slate-300 dark:border-green-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="nombre"
                                    className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                >
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Escribe tu nombre completo"
                                    className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                >
                                    Correo electronico
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Escribe tu correo electronico"
                                    className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                >
                                    Nueva contraseña
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Escribe tu contraseña"
                                    className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password2"
                                    className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                >
                                    Repetir contraseña
                                </label>

                                <input
                                    type="password"
                                    id="password2"
                                    placeholder="Repetir tu contraseña"
                                    className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={repetirPassword}
                                    onChange={(e) =>
                                        setRepetirPassword(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full uppercase text-blue bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Registrar usuario
                            </button>
                            {msg && <Alerta alerta={alerta} />}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registrar;
