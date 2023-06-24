import { useState } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta.jsx";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";

const AgregarProducto = () => {
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [unidadMedida, setUnidadMedida] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            [
                codigo,
                nombre,
                unidadMedida,
                cantidad,
                precio,
                descripcion,
            ].includes("")
        ) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }
        setAlerta({});

        //crear el usuario en API

        try {
            const { data } = await clienteAxios.post("/productos", {
                codigo,
                nombre,
                unidadMedida,
                cantidad,
                precio,
                descripcion,
            });

            setCodigo("");
            setNombre("");
            setUnidadMedida("");
            setCantidad("");
            setPrecio("");
            setDescripcion("");
            Swal.fire({
                icon: "success",
                title: "Producto agregado correctamente",
                // text: "Gracias por enviar el formulario",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: JSON.stringify(error.response.data.msg),
                // text: "Digite un nuevo número de cédula",
            });
        }
        //Mensaje mediante sweetAlert
    };
    const { msg } = alerta;
    return (
        <>
            <Navbar />

            <h1 className=" text-gray-600 text-center  p-5 font-bold text-2xl ">
                Agregar Producto
            </h1>

            <section className="px-4 py-8">
                <div className="flex flex-col items-center justify-center md:flex md:flex-col md:items-center md:justify-center px-6 py-8">
                    <div className="w-full  rounded-2xl shadow-xl border md:w-7/12 sm:w-2/3 xl:w-2/4 :2-3/">
                        <div className=" p-6 space-y-6 md:p-6 ">
                            <form
                                className="grid grid-cols-1 gap-4 md:grid md:grid-cols-3 md:gap-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="md:col-span-1">
                                    <label
                                        htmlFor="codigo"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Codigo
                                    </label>

                                    <input
                                        type="text"
                                        id="codigo"
                                        placeholder="Escriba nombre del producto"
                                        className="block w-full px-4 py-2 mt-1 md:border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 md:block md:w-full p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        required=""
                                        value={codigo}
                                        onChange={(e) => {
                                            // Chequear si el valor introducido es un número y si tiene menos de 7 caracteres
                                            if (
                                                !isNaN(e.target.value) &&
                                                e.target.value.length <= 15
                                            ) {
                                                setCodigo(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label
                                        htmlFor="nombre"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        id="nombre"
                                        placeholder="Escriba nombre del producto"
                                        className="block w-full px-4 py-2 mt-1 md:border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 md:block md:w-full p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        required=""
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label
                                        htmlFor="unidadMedida"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Unidad Medida
                                    </label>
                                    <select
                                        type="text"
                                        id="unidadMedida"
                                        value={unidadMedida}
                                        onChange={(e) =>
                                            setUnidadMedida(e.target.value)
                                        }
                                        className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option selected>
                                            Unidad de Medida
                                        </option>
                                        <option value="Kg">Kilogramo</option>
                                        <option value="Litros">Litros</option>
                                        <option value="Unidad">Unidad</option>
                                        <option value="Servicio">
                                            Servicio
                                        </option>
                                    </select>
                                </div>
                                <div className="md:col-span-1">
                                    <label
                                        htmlFor="cantidad"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Cantidad
                                    </label>

                                    <input
                                        type="number"
                                        id="cantidad"
                                        placeholder="Digite cantidad del producto"
                                        className="block w-full px-4 py-2 mt-1 md:border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 md:block md:w-full p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        required=""
                                        value={cantidad}
                                        onChange={(e) => {
                                            // Chequear si el valor introducido es un número y si tiene menos de 7 caracteres
                                            if (
                                                !isNaN(e.target.value) &&
                                                e.target.value.length <= 6
                                            ) {
                                                setCantidad(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                                <div className=" flex"></div>
                                <div className="md:col-span-1">
                                    <label
                                        htmlFor="precio"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Precio
                                    </label>

                                    <input
                                        type="text"
                                        id="precio"
                                        placeholder="Digite el precio"
                                        className="block w-full px-4 py-2 mt-1 md:border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 md:block md:w-full p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        required=""
                                        value={precio}
                                        onChange={(e) => {
                                            // Chequear si el valor introducido es un número y si tiene menos de 7 caracteres
                                            if (
                                                !isNaN(e.target.value) &&
                                                e.target.value.length <= 10
                                            ) {
                                                setPrecio(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <label
                                        htmlFor="descripcion"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Descripcion
                                    </label>
                                    <div className="flex justify-between gap-4">
                                        <input
                                            type="text"
                                            id="descripcion"
                                            placeholder="Descripción del producto"
                                            className=" block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none md:pr-80 md:border sm:text-sm md:rounded-lg focus:ring-primary-600 focus:border-primary-600 md:block md:w-full p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            required=""
                                            value={descripcion}
                                            onChange={(e) =>
                                                setDescripcion(e.target.value)
                                            }
                                        />
                                        <button
                                            type="submit"
                                            className=" max-[768px]:hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 w-full uppercase text-blue  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:bg-primary-700 focus:ring-primary-800 "
                                        >
                                            Guardar Producto
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className=" md:hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 w-full uppercase text-gray-100  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800 "
                                >
                                    Guardar Producto
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

export default AgregarProducto;
