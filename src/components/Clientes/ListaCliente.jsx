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
                const response = await clienteAxios.get("/clientes");

                setClients(response.data);
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
        {
            Header: "Editar",
            accessor: "editar",
            Cell: (props) => (
                <button
                    type="button"
                    title="Editar usuario"
                    className="text-yellow-500 hover:text-yellow-700 text-xl ml-4"
                    onClick={() => handleShowEdit(props)}
                >
                    {/* <FontAwesomeIcon
                        className="hover:cursor-pointer"
                        icon={icon({ name: "user-pen", style: "solid" })}
                    /> */}
                    Editar
                </button>
            ),
        },
        {
            Header: "Eliminar",
            accessor: "eliminar",
            Cell: (props) => (
                <button
                    type="button"
                    title="Eliminar usuario"
                    className="text-red-500 hover:text-red-800 text-xl ml-4"
                    onClick={() => handleShowDelete(props)}
                >
                    {/* <FontAwesomeIcon
                        className="hover:cursor-pointer"
                        icon={icon({ name: "trash", style: "solid" })}
                    /> */}
                    Eliminar
                </button>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <Table columns={columns} data={clients} />
        </>
    );
};

export default ListaCliente;
