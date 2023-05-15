import { useState } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";

const AgregarProveedor = () => {
    const [tipoCedula, setTipoCedula] = useState("");
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([tipoCedula, cedula, nombre, telefono, email].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }
        setAlerta({});

        //crear el usuario en API

        try {
            const { data } = await clienteAxios.post("/proveedor", {
                tipoCedula,
                cedula,
                nombre,
                apellidos,
                telefono,
                email,
                direccion,
            });

            setAlerta({
                msg: data.msg, //se trae los mensajes del backend
                error: false,
            });

            setTipoCedula("");
            setCedula("");
            setNombre("");
            setApellidos("");
            setTelefono("");
            setEmail("");
            setDireccion("");
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }

        //Mensaje mediante SweetAlert

        // Swal.fire({
        //     icon: "success",
        //     title: "Proveedor agregado correctamente",
        //     // text: "Gracias por enviar el formulario",
        // });
    };

    const { msg } = alerta;

    return (
        <>
            <Navbar />
            <h1 className=" text-gray-600 text-center  p-5 font-bold text-2xl pl-10 ">
                Agregar Proveedores
            </h1>

            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8">
                    <div className="w-full rounded-2xl shadow-xl dark:border md:w-7/12 sm:w-2/3 xl:w-2/4">
                        <div className="p-6 ">
                            <form
                                className="space-y-4 grid grid-cols-1 gap-8 md:grid-cols-2"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="tipoCedula"
                                        className=" mt-4 uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Tipo Cedula
                                    </label>

                                    <select
                                        type="text"
                                        id="tipoCedula"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={tipoCedula}
                                        onChange={(e) =>
                                            setTipoCedula(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Selecciona una opción
                                        </option>
                                        <option value="Fisica">Fisica</option>
                                        <option value="Cedula Juridica">
                                            Cedula Juridica
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="cedula"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Cedula
                                    </label>

                                    <input
                                        type="text"
                                        id="cedula"
                                        placeholder="Escriba cedula del proveedor"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={cedula}
                                        onChange={(e) =>
                                            setCedula(e.target.value)
                                        }
                                    />
                                </div>
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
                                        placeholder="Escriba nombre del proveedor"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="apellidos"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Apellidos
                                    </label>

                                    <input
                                        type="text"
                                        id="apellidos"
                                        placeholder="Escriba apellidos del proveedor"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={apellidos}
                                        onChange={(e) =>
                                            setApellidos(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="telefono"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Telefono
                                    </label>

                                    <input
                                        type="text"
                                        id="telefono"
                                        placeholder="Escriba numero de telefono"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={telefono}
                                        onChange={(e) =>
                                            setTelefono(e.target.value)
                                        }
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
                                        placeholder="Escriba correo electronico del proveedor"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className=" md:col-span-2">
                                    <label
                                        htmlFor="direccion"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Direccion
                                    </label>
                                    <div className="flex justify-between gap-4 ">
                                        <input
                                            type="text"
                                            id="direccion"
                                            placeholder="Escribe direccion"
                                            className="  border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            value={direccion}
                                            onChange={(e) =>
                                                setDireccion(e.target.value)
                                            }
                                        />
                                        <button
                                            type="submit"
                                            className="max-[768px]:hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 w-full uppercase text-blue  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            Guardar Proveedor
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="md:hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 w-full uppercase text-blue  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Guardar Proveedor
                                </button>
                            </form>
                            <div className=" m-2">
                                {msg && <Alerta alerta={alerta} />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AgregarProveedor;
