import { useState, useEffect, button } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import clienteAxios from "../../config/clienteAxios";
import EditModal from "../modales/EditModal";
import axios from "axios";
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

const useStyles = makeStyles({
    modal: {
        position: "absolute",
        width: 400,
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px",
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
    },
});

const FacturasProveedor = () => {
    const params = useParams();
    const styles = useStyles();
    const [facturasProveedor, setFacturasProveedor] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    //const [userId, setUserId] = useState(match.params.id);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        tipoCedula: "",
        cedula: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        direccion: "",
        _id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsolaSeleccionada((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get(`/facturas-pagar/proveedor/${params.id}`)
            .then((response) => {
                setFacturasProveedor(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const peticionPut = async () => {
        await clienteAxios
            .put(`/proveedor/${consolaSeleccionada._id}`, consolaSeleccionada)
            .then((response) => {
                var dataNueva = proveedor;
                dataNueva.map((consola) => {
                    if (consolaSeleccionada._id === consola._id) {
                        consola.tipoCedula = consolaSeleccionada.tipoCedula;
                        consola.cedula = consolaSeleccionada.cedula;
                        consola.nombre = consolaSeleccionada.nombre;
                        consola.apellidos = consolaSeleccionada.apellidos;
                        consola.telefono = consolaSeleccionada.telefono;
                        consola.email = consolaSeleccionada.email;
                        consola.direccion = consolaSeleccionada.direccion;
                    }
                });
                setProveedor(dataNueva);
                abrirCerrarModal();
            });
    };

    const peticionDelete = async () => {
        await clienteAxios
            .delete(
                `/proveedor/${consolaSeleccionada._id}`,
                consolaSeleccionada
            )
            .then((response) => {
                var dataNueva = proveedor;
                setProveedor(dataNueva);
            });
    };

    //Confirma mediante sweetAlert si se desea eliminar el elemento
    const confirmarDelete = async () => {
        Swal.fire({
            title: "¿Deseas eliminar este proveedor?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                peticionDelete();
            }
        });
    };

    const abrirCerrarModal = () => {
        setModalEditar(!modalEditar);
    };

    const seleccionarConsola = (consola, caso) => {
        setConsolaSeleccionada(consola);
        caso === "Editar" ? setModalEditar(true) : "";
        caso === "Eliminar" ? confirmarDelete() : "";
    };
    return (
        <>
            <Navbar />
            <div className="flex justify-between p-2">
                <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                    Facturas por Proveedor
                </h1>
                <div className="m-5">
                    <Link
                        to="/agregarFacturasPagar"
                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 p-2  text-white bg-green-600 hover:bg-green-800 rounded-md text-lg font-semibold"
                    >
                        Agregar Factura Proveedor
                    </Link>
                </div>
            </div>

            <div className="flex flex-col mx-4 mt-10">
                <div className="overflow-x-auto">
                    <div className=" w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>N°Factura</TableCell>
                                            <TableCell>
                                                Fecha de Emision
                                            </TableCell>
                                            <TableCell>Crédito</TableCell>
                                            <TableCell>
                                                Fecha de Vencimiento
                                            </TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {facturasProveedor.map((consola) => (
                                            <TableRow key={consola.id}>
                                                <TableCell>
                                                    {consola.numFacturaPagar}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        consola.fechaEmision
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.diasCredito}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        consola.fechaVencimiento
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.total}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.estado}
                                                </TableCell>

                                                <TableCell>
                                                    <EditIcon
                                                        className={
                                                            styles.iconos
                                                        }
                                                        onClick={() =>
                                                            seleccionarConsola(
                                                                consola,
                                                                "Editar"
                                                            )
                                                        }
                                                    />
                                                    &nbsp;&nbsp;&nbsp;
                                                    <DeleteIcon
                                                        className={
                                                            styles.iconos
                                                        }
                                                        onClick={() =>
                                                            seleccionarConsola(
                                                                consola,
                                                                "Eliminar"
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* <Modal
                                open={modalEditar}
                                onClose={abrirCerrarModal}
                            >
                                {bodyEditar}
                            </Modal> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FacturasProveedor;
