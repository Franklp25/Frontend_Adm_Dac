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
import { Menu, MenuItem } from "@mui/material";
//pdf
import jsPDF from "jspdf";
import "jspdf-autotable";

const useStyles = makeStyles({
    modal: {
        position: "relative",
        width: 600,
        height: 570,
        padding: 20,
        paddingBottom: 2,
        backgroundColor: "white",
        borderRadius: "0.5rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: " 0 25px 50px -12px rgb(0 0 0 / 0.25)",
    },
    iconos: {
        cursor: "pointer",
    },
    inputMaterial: {
        padding: "15px",
        width: "100%",
        marginBottom: "5px",
    },
    boton: {
        color: "white",
        backgroundColor: "green",
        "&:hover": {
            backgroundColor: "gray",
        },
    },
    btnPagosParciales: {
        backgroundColor: "blue",
    },
    btnAnular: {},
});

const FacturasCliente = () => {
    const params = useParams();
    // console.log(params);
    const styles = useStyles();
    const [facturas, setFacturas] = useState([]);
    const [cliente, setCliente] = useState("");
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    //const [userId, setUserId] = useState(match.params.id);
    const [montoTotal, setMontoTotal] = useState(0);
    const [filtro, setFiltro] = useState("todos"); // Estado para almacenar el filtro seleccionado ('todos', 'pendientes' o 'pagadas')
    const [facturasFiltradas, setFacturasFiltradas] = useState([]); // Estado para almacenar las facturas filtradas

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelected = (option) => {
        seleccionarConsola(consola, option);
        handleMenuClose();
    };

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

    //funcion para filtrar
    useEffect(() => {
        // Filtrar las facturas según el filtro seleccionado
        if (filtro === "todos") {
            setFacturasFiltradas(facturas);
        } else if (filtro === "pendientes") {
            setFacturasFiltradas(
                facturas.filter(
                    (factura) => !factura.estado && !factura.anulada
                )
            );
        } else if (filtro === "pagadas") {
            setFacturasFiltradas(
                facturas.filter((factura) => factura.estado && !factura.anulada)
            );
        }
    }, [facturas, filtro]);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
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

    const peticionDelete = async (eliminarID) => {
        await clienteAxios
            .delete(`/clientes/${eliminarID._id}`, consolaSeleccionada)
            .then((response) => {
                var dataNueva = facturas.filter((consola) => {
                    if (eliminarID._id === consola._id) {
                        return false;
                    }
                    return true;
                });
                setClientes(dataNueva);
            });
    };

    //Confirma mediante sweetAlert si se desea eliminar el elemento
    const confirmarDelete = async (consola) => {
        console.log("consola seleccionada" + consola._id);
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
                peticionDelete(consola);
            }
        });
    };

    const abrirCerrarModal = () => {
        setModalEditar(!modalEditar);
    };

    const seleccionarConsola = (consola, caso) => {
        setConsolaSeleccionada(consola);
        caso === "Editar" ? setModalEditar(true) : "";
        caso === "Eliminar" ? confirmarDelete(consola) : "";
    };
    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get(`/clientes/${params.id}`)
            .then((response) => {
                setCliente(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.setFont("times");
        let currentDate = new Date();
        let formattedDate =
            currentDate.getDate() +
            "-" +
            (currentDate.getMonth() + 1) +
            "-" +
            currentDate.getFullYear();

        //Texto de pdf
        const empresa = "Bio&Gen S.A";
        const nomCliente = `${cliente.nombre + " " + cliente.apellidos} `;
        const cedJuridica = "Ced: 3-101-753268";

        // Agregar imagen
        const imgData = "../../../public/Logotipo_Bio&Gen.png";
        doc.addImage(imgData, "JPEG", 10, 10, 48, 30);

        // Agregar título

        doc.setFontSize(14);
        doc.text(empresa, 83, 21);
        doc.text(cedJuridica, 83, 28);
        doc.text("Fecha: " + formattedDate, 83, 35);

        doc.setFontSize(16);
        doc.text("ESTADO DE CUENTA", 78, 68);
        doc.text(nomCliente, 89, 74);

        const datosTabla = facturasFiltradas.map((factura) => [
            factura.numFacturaCobrar,
            new Date(factura.fechaEmision).toLocaleDateString(),
            new Date(factura.fechaVencimiento).toLocaleDateString(),
            factura.iva.toLocaleString("es-US", {
                style: "currency",
                currency: "CRC",
            }),
            factura.subtotal.toLocaleString("es-US", {
                style: "currency",
                currency: "CRC",
            }),
            factura.iva + factura.subtotal,
            factura.estado ? "PAGADO" : "PENDIENTE",
        ]);

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
            body: datosTabla,
            margin: { top: 80 },
            styles: {
                lineColor: [44, 62, 80], // Color de línea más oscuro
                lineWidth: 0.75, // Líneas un poco más gruesas
                fontSize: 8, // Fuente más pequeña
                cellPadding: { top: 2, right: 5, bottom: 2, left: 5 }, // Aumenta el relleno de celdas para mejorar la legibilidad
                valign: "middle", // Alineación vertical en el medio
            },
            columnStyles: {
                0: { cellWidth: "wrap" }, // Ajusta automáticamente el ancho de la celda al contenido
                1: { cellWidth: "wrap" },
                2: { cellWidth: "wrap" },
                3: { cellWidth: "wrap" },
                4: { cellWidth: "wrap" },
                5: { cellWidth: "wrap" },
                6: { cellWidth: "wrap" },
            },
            headStyles: {
                fillColor: [24, 171, 58], // Color de fondo gris claro para la fila de encabezado
                textColor: [44, 62, 80], // Color de texto oscuro para la fila de encabezado
                fontStyle: "bold", // Fuente en negrita para la fila de encabezado
            },
            theme: "striped", // Utiliza el tema "striped" para alternar el color de fondo de las filas
        });

        doc.text(
            `Monto Total: ${montoTotal.toLocaleString("es-US", {
                style: "currency",
                currency: "CRC",
            })}`,
            68,
            doc.autoTable.previous.finalY + 10
        );

        doc.setFontSize(12);
        doc.text(
            "Estimado cliente, le remitimos la información de nuestras cuentas bancarias.",
            37,
            doc.autoTable.previous.finalY + 30
        );

        // Descargar archivo PDF
        const pdfOutput = doc.output("blob");
        const url = URL.createObjectURL(pdfOutput);
        window.open(url, "_blank");
    };

    //montoTotal
    useEffect(() => {
        const totalMonto = facturasFiltradas.reduce((total, factura) => {
            if (!factura.anulada) {
                return total + factura.iva + factura.subtotal;
            } else {
                return total;
            }
        }, 0);
        setMontoTotal(totalMonto);
    }, [facturasFiltradas]);

    // Función para agregar una nueva fila a la lista de pagos parciales
    const agregarFila = () => {
        const nuevoPagoParcial = { fecha: "", monto: "" };
        setConsolaSeleccionada((prevState) => ({
            ...prevState,
            pagoParciales: [...prevState.pagoParciales, nuevoPagoParcial],
        }));
    };

    // Función para eliminar una fila de la lista de pagos parciales
    const eliminarFila = (index) => {
        setConsolaSeleccionada((prevState) => {
            const nuevosPagosParciales = prevState.pagoParciales.filter(
                (_, i) => i !== index
            );
            return { ...prevState, pagoParciales: nuevosPagosParciales };
        });
    };

    const anularFactura = async (facturaId) => {
        console.log("entro aqui: " + facturaId);
        try {
            await clienteAxios.put(`/facturas/${facturaId}`, {
                anulada: true,
            });
            setFacturas(
                facturas.map((factura) => {
                    if (factura._id === facturaId) {
                        factura.anulada = true;
                    }
                    return factura;
                })
            );
            Swal.fire({
                icon: "success",
                title: "¡Factura anulada correctamente!",
                text: "La factura ha sido anulada en el sistema.",
                showConfirmButton: false,
                timer: 5500,
                timerProgressBar: true,
                toast: true,
                position: "top-end",
                background: "#f8f9fa",
                iconColor: "#198754",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const bodyEditar = (
        <div className={styles.modal}>
            <button
                onClick={abrirCerrarModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent dark:hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
            >
                <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
            <h3 className="mb-5 uppercase font-semibold">
                Agregar pagos parciales
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <TextField
                    name="numFacturaCobrar"
                    className={styles.inputMaterial}
                    label="Número de factura a cobrar"
                    onChange={handleChange}
                    value={
                        consolaSeleccionada &&
                        consolaSeleccionada.numFacturaCobrar
                    }
                    InputProps={{ readOnly: true, notched: false }}
                />

                <TextField
                    name="fechaEmision"
                    className={styles.inputMaterial}
                    label="Fecha de emisión"
                    onChange={handleChange}
                    value={new Date(
                        consolaSeleccionada.fechaVencimiento
                    ).toLocaleDateString()}
                    InputProps={{ readOnly: true, notched: false }}
                />

                <TextField
                    name="diasCredito"
                    className={styles.inputMaterial}
                    label="Días de crédito"
                    onChange={handleChange}
                    value={
                        consolaSeleccionada && consolaSeleccionada.diasCredito
                    }
                    InputProps={{ readOnly: true, notched: false }}
                />
            </div>
            {consolaSeleccionada && consolaSeleccionada.pagoParciales && (
                <div className="my-4">
                    <h4 className="mb-2 font-semibold">Pagos parciales</h4>
                    <div className="max-h-48 overflow-y-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {consolaSeleccionada.pagoParciales.map(
                                    (pago, index) => (
                                        <tr key={index}>
                                            <td>
                                                <TextField
                                                    name={`pagoParciales[${index}].fecha`}
                                                    className={
                                                        styles.inputMaterial
                                                    }
                                                    value={pago.fecha}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        notched: false,
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    name={`pagoParciales[${index}].monto`}
                                                    className={
                                                        styles.inputMaterial
                                                    }
                                                    value={pago.monto}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        notched: false,
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    className={
                                                        styles.botonEliminar
                                                    }
                                                    onClick={() =>
                                                        eliminarFila(index)
                                                    }
                                                >
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Button
                        className={styles.botonAgregar}
                        onClick={agregarFila}
                    >
                        Agregar fila
                    </Button>
                    <Button className={styles.boton} onClick={peticionPut}>
                        Editar
                    </Button>
                </div>
            )}
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="flex justify-between p-2">
                <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                    Facturas por Cliente
                </h1>
                <div className="m-2 sm:m-5">
                    <Link
                        to={`/agregarFacturasCobrar/${params.id}`}
                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 p-2 text-white bg-green-600 hover:bg-green-800 rounded-md text-lg font-semibold block text-center"
                    >
                        Agregar Factura Cliente
                    </Link>
                </div>
            </div>
            <div className=" ml-10">
                <Button variant="contained" onClick={exportarPDF}>
                    Exportar a PDF
                </Button>
            </div>
            <div className="flex justify-start m-10 ">
                <label className="mr-2">Filtrar:</label>
                <select value={filtro} onChange={handleFiltroChange}>
                    <option value="todos">Todos</option>
                    <option value="pendientes">Pendientes</option>
                    <option value="pagadas">Pagadas</option>
                </select>
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
                                                N°Factura
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Fecha de Emision
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Fecha de Vencimiento
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                IVA
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Subtotal
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Total
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Estado
                                            </TableCell>
                                            <TableCell
                                                style={{ color: "white" }}
                                            >
                                                Opciónes
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {facturasFiltradas.map((consola) => (
                                            <TableRow key={consola._id}>
                                                <TableCell>
                                                    {consola.numFacturaCobrar ||
                                                        "N.A"}
                                                </TableCell>
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
                                                    {consola.iva.toLocaleString(
                                                        "es-US",
                                                        {
                                                            style: "currency",
                                                            currency: "CRC",
                                                        }
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.subtotal.toLocaleString(
                                                        "es-US",
                                                        {
                                                            style: "currency",
                                                            currency: "CRC",
                                                        }
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {(
                                                        consola.iva +
                                                        consola.subtotal
                                                    ).toLocaleString("es-US", {
                                                        style: "currency",
                                                        currency: "CRC",
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.anulada ? (
                                                        <Button
                                                            variant="contained"
                                                            style={{
                                                                backgroundColor:
                                                                    "gray",
                                                            }}
                                                        >
                                                            Anulada
                                                        </Button>
                                                    ) : consola.estado ? (
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
                                                    <Button
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor:
                                                                "#16A34A",
                                                            color: "white",
                                                            borderRadius: "4px",
                                                            boxShadow:
                                                                "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                                            margin: "0.25rem",
                                                            width: "2.5rem",
                                                            height: "2.5rem",
                                                        }}
                                                        onClick={handleMenuOpen}
                                                    >
                                                        Más
                                                    </Button>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={
                                                            handleMenuClose
                                                        }
                                                        getContentAnchorEl={
                                                            null
                                                        }
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "right",
                                                        }}
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "right",
                                                        }}
                                                    >
                                                        <MenuItem
                                                            onClick={() =>
                                                                seleccionarConsola(
                                                                    consola,
                                                                    "Editar"
                                                                )
                                                            }
                                                        >
                                                            Pago Parcial
                                                        </MenuItem>
                                                        <MenuItem
                                                            onClick={() =>
                                                                anularFactura(
                                                                    consola._id
                                                                )
                                                            }
                                                        >
                                                            Anular
                                                        </MenuItem>
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell
                                                className={styles.total}
                                                colSpan={5}
                                            >
                                                Total
                                            </TableCell>
                                            <TableCell className={styles.total}>
                                                {montoTotal.toLocaleString(
                                                    "es-US",
                                                    {
                                                        style: "currency",
                                                        currency: "CRC",
                                                    }
                                                )}
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {
                                <Modal
                                    open={modalEditar}
                                    onClose={abrirCerrarModal}
                                >
                                    {bodyEditar}
                                </Modal>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FacturasCliente;
