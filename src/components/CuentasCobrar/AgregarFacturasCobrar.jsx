import { useState, useEffect, button } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import EditModal from "../modales/EditModal";
import axios from "axios";
//import { makeStyles } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Modal,
    TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDeleteTableRows from "./table/AddDeleteTableRows.jsx";

const AgregarFacturasCobrar = () => {
    const [fechaEmision, setFechaEmision] = useState("");
    const [diasCredito, setDiasCredito] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    return (
        <>
            <Navbar />

            <div className="flex justify-between p-2">
                <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                    Agregar Factura Por Cliente
                </h1>
            </div>
            <div className="flex flex-row items-center justify-center px-6 py-8 space-x-4">
                <div>
                    <label
                        htmlFor="fechaEmision"
                        className="uppercase text-gray-600 block text-sm font-bold pb-2 text-center"
                    >
                        Fecha Emitida
                    </label>
                    <input
                        type="date"
                        id="fechaEmision"
                        className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 md:w-48 p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={fechaEmision}
                        onChange={(e) => setFechaEmision(e.target.value)}
                    />
                </div>
                <div>
                    <div>
                        <label
                            htmlFor="diasCredito"
                            className="uppercase text-gray-600 block text-sm font-bold pb-2 text-center"
                        >
                            Días de crédito
                        </label>

                        <input
                            type="number"
                            id="diasCredito"
                            // placeholder="Escriba nombre del cliente"
                            className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            value={diasCredito}
                            onChange={(e) => setDiasCredito(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="fechaVencimiento"
                        className="uppercase text-gray-600 block text-sm font-bold pb-2 text-center"
                    >
                        Fecha Vencimiento
                    </label>
                    <input
                        type="date"
                        id="fechaVencimiento"
                        className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 md:w-48 p-2.5 dark:bg-blue dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                    />
                </div>
            </div>

            <AddDeleteTableRows />
        </>
    );
};

export default AgregarFacturasCobrar;
