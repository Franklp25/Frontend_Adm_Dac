import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import Table from "../Table.jsx";
import EditModal from "../modales/EditModal";
import axios from "axios";
import MaterialTable from 'material-table';

const Inventario = () => {

    const [productos, setProductos] = useState([]);

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

    const columnas=[
        {
            title:'Código',
            field:'codigo'
        },
        {
            title:'Nombre',
            field:'nombre'
        },
        {
            title:'Precio',
            field:'precio'
        },
        {
            title:'Descripción',
            field:'descripcion'
        },
        {
            title:'Categoria',
            field:'categoria'
        },
    ]

    

    return (
        <>
            <Navbar />
            <MaterialTable
                columns={columnas}
                data={productos}
            />
        </>
    );
};

export default Inventario;
