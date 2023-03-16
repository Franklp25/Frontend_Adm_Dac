import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import Table from "../Table.jsx";

const ListaCliente = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: "/api/clientes",
                });

                setClients(data.data);
            } catch (error) {
                // Swal.fire({
                //     position: "center",
                //     icon: "error",
                //     title: "¡Ocurrió un problema, por favor inténtelo de nuevo!",
                //     showConfirmButton: false,
                //     timer: 2000,
                // }).then(() => {
                //     window.location.reload();
                // });
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const columns = [
        {
            Header: "Tipo Cedula",
            accessor: "tipoCedula",
        },
        {
            Header: "Cedula",
            accessor: "cedula",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Apellidos",
            accessor: "apellidos",
        },
        {
            Header: "Telefono",
            accessor: "telefono",
        },
        {
            Header: "Correo",
            accessor: "email",
        },
        {
            Header: "Dirreccion",
            accessor: "direccion",
        },
    ];

    return (
        <>
            {/* <Navbar /> */}
            <Table columns={columns} data={clients} />
        </>
    );
};

export default ListaCliente;
