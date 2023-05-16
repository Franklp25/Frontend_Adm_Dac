import { useState, useEffect, button } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
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
        position: "relative",
        width: 600,
        height: 530,
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
const Inventario = () => {
    const styles = useStyles();
    const [productos, setProductos] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        nombre: "",
        cantidad:"",
        precio: "",
        descripcion: "",
        categoria: "",
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
            .get("/productos")
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const peticionPut = async () => {
        await clienteAxios
            .put(`/productos/${consolaSeleccionada._id}`, consolaSeleccionada)
            .then((response) => {
                var dataNueva = productos;
                dataNueva.map((consola) => {
                    if (consolaSeleccionada._id == consola._id) {
                        consola.nombre = consolaSeleccionada.nombre;
                        consola.cantidad = consolaSeleccionada.cantidad;
                        consola.precio = consolaSeleccionada.precio;
                        consola.descripcion = consolaSeleccionada.descripcion;
                    }
                });
                setProductos(dataNueva);
                abrirCerrarModal();
            });
    };

    const peticionDelete = async () => {
        await clienteAxios
            .delete(
                `/productos/${consolaSeleccionada._id}`,
                consolaSeleccionada
            )
            .then((response) => {
                var dataNueva = productos;
                setProductos(dataNueva);
            });
    };

    //Confirma mediante sweetAlert si se desea eliminar el elemento
    const confirmarDelete = async () => {
        Swal.fire({
            title: "¿Deseas eliminar este Producto?",
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
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                name="cantidad"
                className={styles.inputMaterial}
                label="Cantidad"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.cantidad}
                InputProps={{ notched: false }}
            />
            <TextField
                name="precio"
                className={styles.inputMaterial}
                label="Precio"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.precio}
                InputProps={{ notched: false }}
            />
            <TextField
                name="descripcion"
                className={styles.inputMaterial}
                label="Descripcion"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.descripcion}
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
                    Lista de Productos
                </h1>

                <div className="m-5">
                    <Link
                        to="/agregarProducto"
                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 p-2  text-white bg-green-600 hover:bg-green-800 rounded-md text-lg font-semibold"
                    >
                        Agregar Producto
                    </Link>
                </div>
            </div>

            <div className="flex flex-col mx-4 mt-10 overflow-x-auto shadow-md sm:rounded-lg">
                <div className="overflow-x-auto w-full text-sm text-left">
                    <div className="w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead className="text-xl uppercase bg-gray-500 font-bold">
                                        <TableRow>
                                            <TableCell>Código</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Unidad Medida</TableCell>
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell>Precio</TableCell>
                                            <TableCell>Descripción</TableCell>
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
                                                    {consola.unidadMedida}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.cantidad}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.precio}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.descripcion}
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

export default Inventario;
