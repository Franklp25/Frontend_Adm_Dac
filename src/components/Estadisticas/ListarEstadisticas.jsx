import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";

function ListarEstadisticas() {
    const [detalles, setDetalles] = useState([]);
    const [datos, setDatos] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get("/detalle_factura/")
            .then((response) => {
                setDetalles(response.data);
                setDatos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const sumaVentas = datos.reduce((suma, dato) => suma + dato.ventas, 0);
    const sortedDatos = [...datos].sort((a, b) => b.ventas - a.ventas);
    const porcentajeMaximo = 100 / sumaVentas;

    const filteredData = sortedDatos.filter((dato) =>
        dato.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center md:mt-20 mx-4 md:mr-40">
                <div className="w-full md:w-1/2 p-8 text-center">
                    <h1 className="ml-4 md:ml-20 text-2xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-sky-400 to-emerald-600 text-transparent bg-clip-text">
                            DAC Bio&Gen
                        </span>
                    </h1>
                    <p className="mt-4 text-lg lg:text-xl font-normal text-gray-500 dark:text-gray-400">
                        Bienvenido al Sistema Administrador
                    </p>
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-green-700 mb-3 text-center">
                        Estadísticas de ventas
                    </h2>
                    <div className="flex justify-center mt-4 md:mt-0 mb-2">
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            className="w-full md:w-1/2 px-3 py-1 rounded-full border-2 border-gray-400"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <div className="overflow-x-auto mt-4">
                        <div className="border-8 border-gray-300 rounded-lg shadow overflow-hidden">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="hidden md:table-cell px-4 py-2">
                                            #
                                        </th>
                                        <th className="px-4 py-2">Producto</th>
                                        <th className="px-4 py-2">Ventas</th>
                                        <th className="px-4 py-2">% Ventas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((dato, index) => (
                                        <tr
                                            key={dato.nombre}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-gray-100"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <td className="hidden md:table-cell border px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {dato.nombre}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {dato.ventas}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <div className="flex items-center">
                                                    <div className="bg-gray-300 h-4 flex-grow rounded-lg overflow-hidden">
                                                        <div
                                                            className="h-full bg-green-600 text-center text-xs text-white font-bold"
                                                            style={{
                                                                width: `${(
                                                                    dato.ventas *
                                                                    porcentajeMaximo
                                                                ).toFixed(2)}%`,
                                                            }}
                                                        >
                                                            {`${(
                                                                dato.ventas *
                                                                porcentajeMaximo
                                                            ).toFixed(2)}%`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarEstadisticas;
