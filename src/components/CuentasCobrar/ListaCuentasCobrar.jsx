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
import Button from "@mui/material/Button";

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
    const [search, setSearch] = useState("");

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

    const obtenertotalDeudaFormateado = (idCliente) => {
        let total = 0;
        let totalPagos = 0;

        facturas.forEach((factura) => {
            if (factura.cliente === idCliente && !factura.anulada) {
                total += factura.subtotal + factura.iva;
            }

            if (factura.cliente === idCliente && factura.pagoParciales) {
                factura.pagoParciales.forEach((pago) => {
                    totalPagos += Number(pago.monto);
                });
            }
        });

        total -= totalPagos;

        const formattedTotal = total.toLocaleString("es-US", {
            style: "currency",
            currency: "CRC",
        });

        return formattedTotal;
    };

    return (
        <>
            <Navbar />

            <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                Lista de Cuentas por Cobrar
            </h1>
            <div className=" flex justify-end mr-10">
                <input
                    type="text"
                    className=" p-3 pl-10 text-base rounded-lg  bg-gray-500 placeholder-gray-300 text-white "
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex flex-col mx-4 mt-10 overflow-x-auto shadow-md sm:rounded-lg mb-20">
                <div className="overflow-x-auto w-full text-sm text-left">
                    <div className="w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead className="text-xl uppercase bg-gray-600 font-bold">
                                        <TableRow>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Nombre de Cliente
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Cedula
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Total de deuda
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Acciones
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clientes
                                            .filter((cliente) =>
                                                cliente.nombre
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )
                                            )
                                            .map((cliente) => (
                                                <TableRow>
                                                    <TableCell>
                                                        {cliente.nombre +
                                                            " " +
                                                            cliente.apellidos}
                                                    </TableCell>
                                                    <TableCell>
                                                        {cliente.cedula}
                                                    </TableCell>
                                                    <TableCell>
                                                        {obtenertotalDeudaFormateado(
                                                            cliente._id
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link
                                                            to={`/facturasCliente/${cliente._id}`}
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#16A34A",
                                                                    color: "white",
                                                                    borderRadius:
                                                                        "4px",
                                                                    boxShadow:
                                                                        "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                                                    margin: "0.25rem",
                                                                    width: "6.5rem",
                                                                    height: "2.5rem",
                                                                }}
                                                            >
                                                               Facturas
                                                            </Button>
                                                        </Link>
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
