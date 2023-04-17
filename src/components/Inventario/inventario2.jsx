import { useState, useEffect,button } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
//import Table from "../Table.jsx";
import EditModal from "../modales/EditModal";
import axios from "axios";
import { makeStyles } from "@mui/material";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Modal,
    Button,
    TextField,
} from "@mui/material";
import Button from '@mui/material/Button';
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
        width: "100%",
    },
}));

const Inventario = () => {
    const styles = useStyles();
    const [productos, setProductos] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);

    const abrirModalEditar = () => {
        setModalEditar(true);
        console.log("Se abrio el modal");
    };

    const cerrarModalEditar = () => {
        setModalEditar(false);
        console.log("Hiciste clic en el botón");
    };

    function miFuncion() {
        console.log("Hiciste clic en el botón");
    }

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

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Editar Registro</h3>
            <TextField className={styles.inputMaterial} label="Nombre" />
            <TextField className={styles.inputMaterial} label="Precio" />
            <TextField className={styles.inputMaterial} label="Descripcion" />
            <TextField className={styles.inputMaterial} label="Categoria" />
            <br />
            <br />
            <div align="right">
                <Button color="primary">Editar</Button>
                <Button onclick={cerrarModalEditar}>Cancelar</Button>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                Lista de Productos
            </h1>
            <button variant="contained" onclick={miFuncion}>
                Editar
            </button>

            <div className="flex flex-col mx-4 mt-10">
                <div className="overflow-x-auto">
                    <div className=" w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Código</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Precio</TableCell>
                                            <TableCell>Descripción</TableCell>
                                            <TableCell>Categoria</TableCell>
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
                                                    {consola.precio}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.descripcion}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.categoria}
                                                </TableCell>
                                                <TableCell>
                                                    <EditIcon />
                                                    &nbsp;&nbsp;&nbsp;
                                                    <DeleteIcon />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Modal
                                open={true}
                                onClose={cerrarModalEditar}
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
