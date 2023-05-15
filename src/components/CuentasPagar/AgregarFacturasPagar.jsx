import { useState, useEffect } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";

import Navbar from "../Navbar";
import Alerta from "../Alerta.jsx";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import moment from "moment/moment";

const AgregaFacturasPagar = () => {
    const params = useParams();

    const [numFacturaPagar, setNumFacturaPagar] = useState("");
    const [fechaEmision, setFechaEmision] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [diasCredito, setDiasCredito] = useState("");
    const [total, setTotal] = useState("");

    const [proveedor, setProveedor] = useState("");

    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get(`/proveedor/${params.id}`)
            .then((response) => {
                setProveedor(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([numFacturaPagar, fechaEmision, diasCredito, total].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }
        setAlerta({});

        //crear la factura en API

        try {
            const { data } = await clienteAxios.post("/facturas-pagar", {
                numFacturaPagar,
                proveedor,
                fechaEmision,
                diasCredito,
                fechaVencimiento,
                total,
            });

            setNumFacturaPagar("");
            setProveedor("");
            setFechaEmision("");
            setDiasCredito("");
            setFechaVencimiento("");
            setTotal("");
            Swal.fire({
                icon: "success",
                title: "Registro agregado correctamente",
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
    useEffect(() => {
        setFechaVencimiento(
            moment(moment(fechaEmision).add(diasCredito, "days"), "x").format(
                "MM/DD/YYYY"
            )
        );
    }, [fechaEmision, diasCredito]);
    const { msg } = alerta;
    return (
        <>
            <Navbar />

            <h1 className=" text-gray-600 text-center  p-5 font-bold text-2xl ">
                Agregar facturas a pagar
            </h1>

            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8">
                    <div className="w-full rounded-2xl shadow-xl dark:border md:w-7/12 sm:w-2/3 xl:w-2/4 :2-3/">
                        <div className="p-6 ">
                            <form
                                className="space-y-4 grid grid-cols-1 gap-8 md:grid-cols-3"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="tipoCedula"
                                        className="mt-4 uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Numero de Factura
                                    </label>
                                    <input
                                        type="number"
                                        id="numFacturaPagar"
                                        placeholder="Digite el numero de factura a ingresar"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={numFacturaPagar}
                                        onChange={(e) =>
                                            setNumFacturaPagar(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="proveedor"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Proveedor
                                    </label>

                                    <input
                                        type="text"
                                        id="proveedor"
                                        // placeholder="Escriba cedula del cliente"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={
                                            proveedor.nombre +
                                            " " +
                                            proveedor.apellidos
                                        }
                                        onChange={(e) =>
                                            setProveedor(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="fechaEmision"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Fecha Emitida
                                    </label>

                                    <input
                                        type="date"
                                        id="fechaEmision"
                                        // placeholder="Escriba nombre del cliente"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={fechaEmision}
                                        onChange={(e) =>
                                            setFechaEmision(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="diasCredito"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Días de crédito
                                    </label>

                                    <input
                                        type="number"
                                        id="diasCredito"
                                        // placeholder="Escriba nombre del cliente"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={diasCredito}
                                        onChange={(e) =>
                                            setDiasCredito(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="fechaVencimiento"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Fecha de Vencimiento
                                    </label>

                                    <input
                                        type="text"
                                        id="fechaVencimiento"
                                        // placeholder="Escriba nombre del cliente"
                                        className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={fechaVencimiento}
                                        onChange={(e) =>
                                            setFechaVencimiento(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="total"
                                        className=" uppercase text-gray-600 block text-sm font-bold pb-2"
                                    >
                                        Total
                                    </label>

                                    <input
                                        type="number"
                                        id="total"
                                        placeholder="Digite el monto de la factura"
                                        className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        step="0.01" // permite valores decimales con dos lugares decimales (centavos)
                                        value={total}
                                        onChange={(e) =>
                                            setTotal(parseFloat(e.target.value))
                                        }
                                    />
                                    
                                </div>
                                <div className=" xl:col-span-3">
                                    <button
                                        type="submit"
                                        className=" transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 w-full uppercase text-blue  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Guardar Factura de proveedor
                                    </button>
                                </div>
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

export default AgregaFacturasPagar;
