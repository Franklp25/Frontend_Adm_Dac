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
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const FacturasCliente = () => {
    const params = useParams();
    // console.log(params);
    const styles = useStyles();
    const [facturas, setFacturas] = useState([]);
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

    const cambiarEstadoFactura = async (facturaId, nuevoEstado) => {
        try {
            await clienteAxios.put(`/facturas/${facturaId}`, {
                estado: nuevoEstado,
            });
            setFacturas(
                facturas.map((factura) => {
                    if (factura._id === facturaId) {
                        factura.estado = nuevoEstado;
                    }
                    return factura;
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get(`/facturas/cliente/${params.id}`)
            .then((response) => {
                setFacturas(response.data);
                //console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const peticionPut = async () => {
        await clienteAxios
            .put(`/clientes/${consolaSeleccionada._id}`, consolaSeleccionada)
            .then((response) => {
                var dataNueva = clientes;
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
                setClientes(dataNueva);
                abrirCerrarModal();
            });
    };

    const peticionDelete = async () => {
        await clienteAxios
            .delete(`/clientes/${consolaSeleccionada._id}`, consolaSeleccionada)
            .then((response) => {
                var dataNueva = clientes;
                setClientes(dataNueva);
            });
    };

    //Confirma mediante sweetAlert si se desea eliminar el elemento
    const confirmarDelete = async () => {
        Swal.fire({
            title: "¿Deseas eliminar este Cliente?",
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
    const exportarPDF = () => {
        const doc = new jsPDF();

        //Texto de pdf
        const empresa = "Bio&Gen S.A";
        const cliente = `Estado de cuenta de `;
        const cedJuridica = "Ced: 3-101-753268";

        // Agregar título

        doc.setFontSize(16);
        doc.text(empresa, 80, 20);
        doc.text(cedJuridica, 80, 30);
        doc.text(cliente, 80, 40);

        // Agregar imagen
        // const imgData = "ruta_de_tu_imagen.jpg";
        // doc.addImage(imgData, "JPEG", 15, 40, 180, 180);
        // Agregar tabla
        doc.autoTable({
            head: [
                [
                    "N°Factura",
                    "Fecha de Emision",
                    "Fecha de Vencimiento",
                    "IVA",
                    "Subtotal",
                    "Total",
                    "Estado",
                ],
            ],
            body: facturas.map((factura) => [
                factura.id,
                new Date(factura.fechaEmision).toLocaleDateString(),
                new Date(factura.fechaVencimiento).toLocaleDateString(),
                factura.iva,
                factura.subtotal,
                factura.iva + factura.subtotal,
                factura.estado,
            ]),
            margin: { top: 80 },
        });

        // Descargar archivo PDF
        const pdfOutput = doc.output("blob");
        const url = URL.createObjectURL(pdfOutput);
        window.open(url, "_blank");
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-between p-2">
                <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                    Facturas por Cliente
                </h1>
                <div className="m-5">
                    <Link
                        to={`/agregarFacturasCobrar/${params.id}`}
                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 p-2  text-white bg-green-600 hover:bg-green-800 rounded-md text-lg font-semibold"
                    >
                        Agregar Factura Proveedor
                    </Link>
                </div>
            </div>
            <div className=" ml-10">
                <Button variant="contained" onClick={exportarPDF}>
                    Exportar a PDF
                </Button>
            </div>

            <div className="flex flex-col mx-4 mt-10 overflow-x-auto shadow-md sm:rounded-lg">
                <div className="overflow-x-auto w-full text-sm text-left">
                    <div className="w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead className="text-xl uppercase bg-gray-500 font-bold">
                                        <TableRow>
                                            <TableCell>N°Factura</TableCell>
                                            <TableCell>
                                                Fecha de Emision
                                            </TableCell>
                                            <TableCell>
                                                Fecha de Vencimiento
                                            </TableCell>
                                            <TableCell>IVA</TableCell>
                                            <TableCell>Subtotal</TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {facturas.map((consola) => (
                                            <TableRow key={consola.id}>
                                                <TableCell>{"N.A"}</TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        consola.fechaEmision
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        consola.fechaVencimiento
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.iva}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.subtotal}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.iva +
                                                        consola.subtotal}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.estado ? (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() =>
                                                                cambiarEstadoFactura(
                                                                    consola._id,
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Pagado
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() =>
                                                                cambiarEstadoFactura(
                                                                    consola._id,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            Pendiente
                                                        </Button>
                                                    )}
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

export default FacturasCliente;
