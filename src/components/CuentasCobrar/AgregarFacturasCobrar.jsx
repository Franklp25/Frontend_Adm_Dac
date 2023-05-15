import { useState, useEffect, button } from "react";
import Navbar from "../Navbar";
import clienteAxios from "../../config/clienteAxios";
import EditModal from "../modales/EditModal";
import axios from "axios";
import moment from "moment/moment";
import AddDeleteTableRows from "./table/AddDeleteTableRows.jsx";

const AgregarFacturasCobrar = () => {
    const [numFacturaCobrar, setNumFacturaCobrar] = useState("");
    const [fechaEmision, setFechaEmision] = useState("");
    const [diasCredito, setDiasCredito] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [rowsData, setRowsData] = useState([]);

    //Este useEffecto nos permitira calcular la fecha de vencimiento de manera dinamica
    useEffect(() => {
        setFechaVencimiento(
            moment(moment(fechaEmision).add(diasCredito, "days"), "x").format(
                "MM/DD/YYYY"
            )
        );
        console.log(
            moment(moment(fechaEmision).add(diasCredito, "days"), "x").format(
                "MM/DD/YYYY"
            )
        );
    }, [fechaEmision, diasCredito]);

    //Verificara que ningun campo quede vacio para luego crear la factura
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            [
                numFacturaCobrar,
                fechaEmision,
                diasCredito,
                fechaVencimiento,
                rowsData,
            ].includes("")
        ) {
            console.log("hay campos vacios");
            return;
        }
        console.log("Se presiono el boton");

        try {
            const { data } = await clienteAxios.post("/clientes", {
                tipoCedula,
                cedula,
                nombre,
                apellidos,
                telefono,
                email,
                direccion,
            });

            setNumFacturaCobrar("");
            setFechaEmision("");
            setDiasCredito("");
            setFechaVencimiento("");
            setRowsData([]);
            Swal.fire({
                icon: "success",
                title: "Cliente agregado correctamente",
                // text: "Gracias por enviar el formulario",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: JSON.stringify(error.response.data.msg),
                // text: "Digite un nuevo número de cédula",
            });
        }
    };
    return (
        <>
            <Navbar />

            <div className="flex justify-between p-2">
                <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                    Agregar Factura Por Cliente
                </h1>
            </div>
            <div className="flex items-center justify-center px-6 py-8 space-x-4">
                <div className="text-center">
                    <label
                        htmlFor="numFactura"
                        className="block uppercase text-gray-600 text-sm font-bold pb-2"
                    >
                        Numero de Factura
                    </label>
                    <input
                        type="number"
                        id="numFactura"
                        className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 md:w-48 p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={numFacturaCobrar}
                        onChange={(e) => setNumFacturaCobrar(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <label
                        htmlFor="fechaEmision"
                        className="block uppercase text-gray-600 text-sm font-bold pb-2"
                    >
                        Fecha Emitida
                    </label>
                    <input
                        type="date"
                        id="fechaEmision"
                        className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 md:w-48 p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={fechaEmision}
                        onChange={(e) => setFechaEmision(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <label
                        htmlFor="diasCredito"
                        className="block uppercase text-gray-600 text-sm font-bold pb-2"
                    >
                        Días de crédito
                    </label>
                    <input
                        type="number"
                        id="diasCredito"
                        className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 md:w-48 p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={diasCredito}
                        onChange={(e) => setDiasCredito(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <label
                        htmlFor="fechaVencimiento"
                        className="block uppercase text-gray-600 text-sm font-bold pb-2"
                    >
                        Fecha Vencimiento
                    </label>
                    <input
                        type="text"
                        id="fechaVencimiento"
                        className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 md:w-48 p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                        readOnly
                    />
                </div>
            </div>

            <AddDeleteTableRows rowsData={rowsData} setRowsData={setRowsData} />
            <div className="mt-10 flex justify-center">
                <button
                    className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 w-full md:w-1/4 uppercase text-gray-200 bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs md:text-sm px-4 md:px-5 py-2 text-center dark:bg-green-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSubmit}
                >
                    Guardar Cliente
                </button>
            </div>
        </>
    );
};

export default AgregarFacturasCobrar;
