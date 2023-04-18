import { useState, useEffect, button } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
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
import EditIcon from "@mui/icons-material/Edit";
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

const ListaCuentasPagar = () => {
    const styles = useStyles();
    const [proveedor, setProveedor] = useState([]);
    const [facturasPagar, setFacturasPagar] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get("/proveedor")
            .then((response) => {
                setProveedor(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        clienteAxios
            .get("/facturas-pagar")
            .then((response) => {
                setFacturasPagar(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const obtenertotalDeuda = (idProveedor) => {
        let total = 0;
        console.log(facturasPagar);
        facturasPagar.forEach((factura) => {
            if (factura.proveedor == idProveedor) {
                total += factura.total;
            }
        });
        return total;
    };

    return (
        <>
            <Navbar />
            <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                Lista de Cuentas por Pagar
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
                                                Nombre de Proveedor
                                            </TableCell>
                                            <TableCell>Cedula</TableCell>
                                            <TableCell>
                                                Total de deuda
                                            </TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {proveedor.map((consola) => (
                                            <TableRow
                                            // key={consola.id}
                                            // onClick={() =>
                                            //     navigate(
                                            //         `/facturasProveedor/${consola._id}`
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
                                                        to={`/facturasProveedor/${consola._id}`}
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

export default ListaCuentasPagar;
