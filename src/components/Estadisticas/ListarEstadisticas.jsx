import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";

function ListarEstadisticas() {
    const [detalles, setDetalles] = useState([]);
    const [datos, setDatos] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    useEffect(() => {
        clienteAxios
            .get("/detalle_factura/")
            .then((response) => {
                const uniqueData = Array.from(
                    new Set(response.data.map((dato) => dato.nombre))
                ).map((nombre) => {
                    return response.data.find((dato) => dato.nombre === nombre);
                });

                setDetalles(uniqueData);
                setDatos(uniqueData);
                console.log(uniqueData);
            })
            .catch((error) => {
                console.log("Error loading data:", error);
            });
    }, []);

    useEffect(() => {
        if (fechaInicio && fechaFin) {
            const params = {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
            };

            clienteAxios
                .get("/detalle_factura/", { params })
                .then((response) => {
                    const uniqueData = Array.from(
                        new Set(response.data.map((dato) => dato.nombre))
                    ).map((nombre) => {
                        return response.data.find(
                            (dato) => dato.nombre === nombre
                        );
                    });

                    setDetalles(uniqueData);
                    setDatos(uniqueData);
                    console.log(uniqueData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [fechaInicio, fechaFin]);

    const sumaVentas = datos.reduce((suma, dato) => suma + dato.ventas, 0);
    const sortedDatos = [...datos].sort((a, b) => b.ventas - a.ventas);
    const porcentajeMaximo = 100 / sumaVentas;

    const filteredData = sortedDatos
        .filter((dato) =>
            dato.nombre.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 5);

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
                    <div className="flex justify-center mt-9 md:mt-0 mb-2">
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            className="border-2 border-gray-400 rounded-full py-1 px-3 w-full md:w-1/2"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />

                        {/* Aquí es donde los componentes de entrada de fecha deben ir */}
                        <input
                            type="date"
                            className="border-2 border-gray-400 rounded-full py-1 px-3 w-full md:w-1/2"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />

                        <input
                            type="date"
                            className="border-2 border-gray-400 rounded-full py-1 px-3 w-full md:w-1/2"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </div>
                    <div className="overflow-x-auto mt-4">
                        <div className="shadow overflow-hidden rounded-lg border-gray-300  border-8">
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
                                                <div className="bg-gray-300 h-4 w-full rounded-lg overflow-hidden">
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
