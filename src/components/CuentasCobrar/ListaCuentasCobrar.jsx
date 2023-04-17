import { useState, useEffect, button } from "react";
import Navbar from "../Navbar";
import clienteAxios from "../../config/clienteAxios";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
    iconos: {
        cursor: "pointer",
    },
    inputMaterial: {
        padding: "15px",
        width: "100%",
        marginTop: theme.spacing(1),
    },
}));

const ListaCuentasPagar = () => {
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

            <div className="flex flex-col mx-4 mt-10">
                <div className="overflow-x-auto">
                    <div className=" w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead>
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
                                                key={consola.id}
                                                onClick={() =>
                                                    navigate(
                                                        `/facturasCliente/${consola._id}`
                                                    )
                                                }
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
                                                    <EditIcon
                                                        className={
                                                            styles.iconos
                                                        }
                                                    />
                                                    &nbsp;&nbsp;&nbsp;
                                                    <DeleteIcon
                                                        className={
                                                            styles.iconos
                                                        }
                                                    />
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

export default ListaCuentasPagar;
