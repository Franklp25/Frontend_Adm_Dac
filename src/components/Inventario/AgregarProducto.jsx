import { useState } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta.jsx";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";

const AgregarProducto = () => {
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [alerta, setAlerta] = useState({});

    return (
        <>
            <div>AgregarProducto</div>;
        </>
    );
};

export default AgregarProducto;
