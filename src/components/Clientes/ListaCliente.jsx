import { useState, useEffect, button } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import EditModal from "../modales/EditModal";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
        marginTop: theme.spacing(1),
    },
}));

const ListaCliente = () => {
    const styles = useStyles();
    const [clientes, setClientes] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

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
            .get("/clientes")
            .then((response) => {
                setClientes(response.data);
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

    const bodyEditar = (
        <div className={styles.modal}>
            <h3 className="mb-2">Editar Cliente</h3>
            <TextField
                name="nombre"
                className={styles.inputMaterial}
                label="Nombre"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.nombre}
                InputProps={{ notched: false }}
            />
            <TextField
                name="apellidos"
                className={styles.inputMaterial}
                label="Apellidos"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.apellidos}
                InputProps={{ notched: false }}
            />
            <TextField
                name="telefono"
                className={styles.inputMaterial}
                label="Telefono"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.telefono}
                InputProps={{ notched: false }}
            />
            <TextField
                name="email"
                className={styles.inputMaterial}
                label="Email"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.email}
                InputProps={{ notched: false }}
            />
            <TextField
                name="direccion"
                className={styles.inputMaterial}
                label="Direccion"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.direccion}
                InputProps={{ notched: false }}
            />
            <br />
            <br />
            <div align="right">
                <Button color="primary" onClick={peticionPut}>
                    Editar
                </Button>
                <Button onClick={abrirCerrarModal}>Cancelar</Button>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="flex justify-between p-2">
                <h1 className=" text-gray-600 p-3 font-bold text-2xl">
                    Lista de clientes
                </h1>

                <div className="m-5">
                    <Link
                        to="/agregarCliente"
                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 p-2  text-white bg-green-600 hover:bg-green-800 rounded-md text-lg font-semibold"
                    >
                        Agregar cliente
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
                                            <TableCell>Tipo Cedula</TableCell>
                                            <TableCell>Cedula</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Apellidos</TableCell>
                                            <TableCell>Telefono</TableCell>
                                            <TableCell>Correo</TableCell>
                                            <TableCell>Direccion</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clientes.map((consola) => (
                                            <TableRow key={consola.id}>
                                                <TableCell>
                                                    {consola.tipoCedula}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.cedula}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.nombre}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.apellidos}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.telefono}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.email}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.direccion}
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

                            <Modal
                                open={modalEditar}
                                onClose={abrirCerrarModal}
                            >
                                {bodyEditar}
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListaCliente;
