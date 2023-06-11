import { useState, useEffect, button } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import EditModal from "../modales/EditModal";
import axios from "axios";
import { makeStyles } from "@mui/styles";
//import { makeStyles } from "@material-ui/core";
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
});

const ListaCliente = () => {
    const styles = useStyles();
    const [clientes, setClientes] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [search, setSearch] = useState("");

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
                    if (consolaSeleccionada._id == consola._id) {
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
            <button
                onClick={abrirCerrarModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent dark:hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
            >
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>
            <h3 className="mb-5 uppercase font-semibold">Editar cliente</h3>
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
            <div className=" text-right ">
                <Button className={styles.boton} onClick={peticionPut}>
                    Editar
                </Button>
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
            <div className=" flex justify-end mt-12 mr-10">
                <input
                    type="text"
                    className=" p-3 pl-10 text-base rounded-lg  bg-gray-500 placeholder-gray-400 text-white "
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
                                    <TableHead className="text-xl uppercase bg-gray-500 font-bold">
                                        <TableRow>
                                            <TableCell>Tipo Cedula</TableCell>
                                            <TableCell>Cedula</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Apellidos</TableCell>
                                            <TableCell>Telefono</TableCell>
                                            <TableCell>Correo</TableCell>
                                            <TableCell>Direccion</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clientes
                                            .filter((consola) =>
                                                consola.nombre
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )
                                            )
                                            .map((consola) => (
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
