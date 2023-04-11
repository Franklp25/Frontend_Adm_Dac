import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
//import Table from "../Table.jsx";
import EditModal from "../modales/EditModal";
import axios from "axios";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Modal,
    Button,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Inventario = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get("/productos")
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const columnas = [
        {
            title: "Código",
            field: "codigo",
        },
        {
            title: "Nombre",
            field: "nombre",
        },
        {
            title: "Precio",
            field: "precio",
        },
        {
            title: "Descripción",
            field: "descripcion",
        },
        {
            title: "Categoria",
            field: "categoria",
        },
    ];

    return (
        <>
            <Navbar />
            <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                Lista de Productos
            </h1>

            <div className="flex flex-col mx-4 mt-10">
                <div className="overflow-x-auto">
                    <div className=" w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Código</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Precio</TableCell>
                                            <TableCell>Descripción</TableCell>
                                            <TableCell>Categoria</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {productos.map((consola) => (
                                            <TableRow key={consola.id}>
                                                <TableCell>
                                                    {consola.codigo}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.nombre}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.precio}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.descripcion}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.categoria}
                                                </TableCell>
                                                <TableCell>
                                                    <EditIcon />
                                                    &nbsp;&nbsp;&nbsp;
                                                    <DeleteIcon />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Inventario;
