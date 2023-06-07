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
            setDatos(response.data)
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

  const sumaVentas = datos.reduce((suma, dato) => suma + dato.ventas, 0);
  const sortedDatos = [...datos].sort((a, b) => b.ventas - a.ventas);
  const porcentajeMaximo = 100 / sumaVentas;

  const filteredData = sortedDatos
    .filter((dato) =>
      dato.nombre.toLowerCase().includes(searchValue.toLowerCase())
    )
 

  return (
    <>
     
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-full md:w-1/2 p-8 text-center">
          <h1 className="text-5xl font-bold">
            Sistema Administrador <br /> DAC-BIO&GEN
          </h1>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-3 text-center">Estadísticas de ventas</h2>
          <div className="flex justify-center mt-9 md:mt-0 mb-2">
            <input
              type="text"
              placeholder="Buscar producto"
              className="border-2 border-gray-400 rounded-full py-1 px-3 w-full md:w-1/2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto mt-4">
            <div className="shadow overflow-hidden rounded-lg border-gray-300  border-8">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="hidden md:table-cell px-4 py-2">#</th>
                    <th className="px-4 py-2">Producto</th>
                    <th className="px-4 py-2">Ventas</th>
                    <th className="px-4 py-2">% Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((dato, index) => (
                  <tr key={dato.nombre} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="hidden md:table-cell border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{dato.nombre}</td>
                  <td className="border px-4 py-2">{dato.ventas}</td>
                  <td className="border px-4 py-2">
                    <div className="bg-gray-300 h-4 w-full rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-green-600 text-center text-xs text-white font-bold"
                        style={{ width: `${(dato.ventas * porcentajeMaximo).toFixed(2)}%` }}
                        >
                        {`${(dato.ventas * porcentajeMaximo).toFixed(2)}%`}                      
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
  };
  
  export default ListarEstadisticas;
  
