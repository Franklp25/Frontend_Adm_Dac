import { useState, useEffect,button } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
//import Table from "../Table.jsx";
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

    const [consolaSeleccionada,setConsolaSeleccionada]=useState({
        nombre:'',
        precio:'',
        descripcion:'',
        categoria:''
    })

    const handleChange=e=>{
        const{name,value}=e.target;
        setConsolaSeleccionada(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(consolaSeleccionada);
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

    const abrirCerrarModal = () => {
        setModalEditar(!modalEditar);
    };

    const seleccionarConsola=(consola,caso)=>{
        setConsolaSeleccionada(consola){
            (caso==='Editar')?modalEditar(true):''
        }
    }

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Editar Registro</h3>
            <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombre}/>
            <TextField name="precio" className={styles.inputMaterial} label="Precio" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.precio}/>
            <TextField name="descripcion" className={styles.inputMaterial} label="Descripcion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.descripcion}/>
            <TextField name="codigo" className={styles.inputMaterial} label="Categoria" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.codigo}/>
            <br />
            <br />
            <div align="right">
                <Button color="primary">Editar</Button>
                <Button onClick={abrirCerrarModal}>Cancelar</Button>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                Lista de Productos
            </h1>

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
                                                    <EditIcon className={styles.iconos} onClick={seleccionarConsola(consola,'Editar')}/>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <DeleteIcon className={styles.iconos}/>
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
