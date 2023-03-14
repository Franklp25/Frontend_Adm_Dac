import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";

const ListaCliente = () => {
    const [data, setData] = useState([]);

    useEffect(() => {}, []);

    return (
        <>
            <Navbar />
        </>
    );
};

export default ListaCliente;
