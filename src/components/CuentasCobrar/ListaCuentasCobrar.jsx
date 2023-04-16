import { useState, useEffect, button } from "react";
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

const ListaCuentasPagar = () => {
    const styles = useStyles();
    const [clientes, setClientes] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        nombre: "",
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

    const obtenertotalDeuda = (idCliente) =>{
      let total=0;
      facturas.forEach(factura=>{
        if(factura.cliente==idCliente){
          total=factura.subtotal+factura.iva;
        }
        
      })
      return total;
    }


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
                                            <TableCell>Nombre de Cliente</TableCell>
                                            <TableCell>Cedula</TableCell>
                                            <TableCell>Total de deuda</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clientes.map((consola) => (
                                            <TableRow key={consola.id} onClick={()=>console.log(consola.nombre)}>
                                                <TableCell>
                                                    {(consola.nombre+" "+consola.apellidos)}
                                                </TableCell>
                                                <TableCell>
                                                    {consola.cedula}
                                                </TableCell>
                                                <TableCell>
                                                    {obtenertotalDeuda(consola._id)}
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
