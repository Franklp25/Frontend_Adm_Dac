import { useState, useEffect, button } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";
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

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const useStyles = makeStyles({
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: "white",
        border: "2px solid #000",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
    },
    iconos: {
        cursor: "pointer",
    },
    inputMaterial: {
        padding: "15px",
        width: "100%",
        marginBottom: "5px",
    },
});

const ListaCuentasCobrar = () => {
    const styles = useStyles();
    const [clientes, setClientes] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [idCliente, setIDCliente] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get("/clientes")
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        clienteAxios
            .get("/facturas")
            .then((response) => {
                setFacturas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const obtenertotalDeuda = (idCliente) => {
        let total = 0;
        facturas.forEach((factura) => {
            if (factura.cliente == idCliente) {
                total += factura.subtotal + factura.iva;
            }
        });
        return total;
    };

    return (
        <>
            <Navbar />
            <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                Lista de Cuentas por Cobrar
            </h1>

            <div className="flex flex-col mx-4 mt-10 overflow-x-auto shadow-md sm:rounded-lg">
                <div className="overflow-x-auto w-full text-sm text-left">
                    <div className="w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead className="text-xl uppercase bg-gray-500 font-bold">
                                        <TableRow>
                                            <TableCell>
                                                Nombre de Cliente
                                            </TableCell>
                                            <TableCell>Cedula</TableCell>
                                            <TableCell>
                                                Total de deuda
                                            </TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clientes.map((consola) => (
                                            <TableRow
                                            // key={consola.id}
                                            // onClick={() =>
                                            //     navigate(
                                            //         `/facturasCliente/${consola._id}`
                                            //     )
                                            // }
                                            >
                                                <TableCell>
                                                    {consola.nombre +
                                                        " " +
                                                        consola.apellidos}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.cedula}
                                                </TableCell>
                                                <TableCell>
                                                    {obtenertotalDeuda(
                                                        consola._id
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        to={`/facturasCliente/${consola._id}`}
                                                    >
                                                        <RemoveRedEyeIcon
                                                            className={
                                                                styles.iconos
                                                            }
                                                        />
                                                    </Link>
                                                    {/* &nbsp;&nbsp;&nbsp; */}
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

export default ListaCuentasCobrar;
