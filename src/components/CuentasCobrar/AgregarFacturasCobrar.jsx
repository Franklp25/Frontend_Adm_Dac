import { useState, useEffect, button } from "react";
import Navbar from "../Navbar";
import clienteAxios from "../../config/clienteAxios";
import EditModal from "../modales/EditModal";
import axios from "axios";
import moment from "moment/moment";
import AddDeleteTableRows from "./table/AddDeleteTableRows.jsx";

const AgregarFacturasCobrar = () => {
    const [fechaEmision, setFechaEmision] = useState("");
    const [diasCredito, setDiasCredito] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [rowsData, setRowsData] = useState([]);
    useEffect(() => {
        setFechaVencimiento(moment(moment(fechaEmision).add(diasCredito, "days"), "x").format("MM/DD/YYYY"));
        console.log(moment(moment(fechaEmision).add(diasCredito, "days"), "x").format("MM/DD/YYYY"))
    }, [fechaEmision,diasCredito]);
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
                    />
                </div>
            </div>

            <AddDeleteTableRows rowsData={rowsData} setRowsData={setRowsData} />
        </>
    );
};

export default AgregarFacturasCobrar;
