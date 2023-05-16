function TableRows({
    rowsData,
    deleteTableRows,
    productos,
    productoSeleccionado,
    tarifas,
    handleChange,
}) {
    return rowsData.map((data, index) => {
        const { producto, precioUnitario, cantidad, tarifa } = data;
        console.log(tarifas);
        return (
            <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                <td className="p-2">
                    <select
                        value={producto}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="producto"
                        className="px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((prod) => (
                            <option key={prod.id} value={prod._id}>
                                {prod.nombre}
                            </option>
                        ))}
                    </select>
                </td>
                <td className="p-2">
                    <input
                        type="number"
                        value={precioUnitario}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="precio"
                        className="px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </td>
                <td className="p-2">
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="cantidad"
                        className="px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </td>
                <td className="p-2 ">
                    <select
                        value={tarifa}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="tarifa"
                        className="px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        
                    >
                        <option value="">Seleccione una tarifa</option>
                        {tarifas.map((tar) => (
                            <option value={tar}>{tar + "%"}</option>
                        ))}
                    </select>
                </td>
                <td className="p-2">
                    <button
                        className="px-4 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        onClick={() => deleteTableRows(index)}
                    >
                        x
                    </button>
                </td>
            </tr>
        );
    });
}
export default TableRows;
