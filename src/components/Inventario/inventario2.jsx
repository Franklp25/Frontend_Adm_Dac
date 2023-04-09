import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import Table from "../Table.jsx";
import EditModal from "../modales/EditModal";
import axios from "axios";

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

    const handleEliminar = (id) => {
        // Hacer la petición DELETE al servidor utilizando axios
        clienteAxios
            .delete(`/productos/${id}`)
            .then((response) => {
                // Actualizar el estado de la tabla sin el elemento eliminado
                setProductos(productos.filter((dato) => dato._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
          <Navbar />
            <div className="container mt-4">
                <h1>Tabla de Datos</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((dato, index) => (
                            <tr key={index}>
                                <td>{dato.codigo}</td>
                                <td>{dato.nombre}</td>
                                <td>{dato.precio}</td>
                                <td>{dato.descripcion}</td>
                                <td>{dato.categoria}</td>
                                <td>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleEditar(dato._id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                        onClick={() => handleEliminar(dato._id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Inventario;
