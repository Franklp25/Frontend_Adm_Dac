function TableRows({ rowsData, deleteTableRows, productos,productoSeleccionado, handleChange }) {
    return rowsData.map((data, index) => {
        const { producto, precio, cantidad } = data;
        return (
            <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                <td className="p-2">
                    <select
                        value={producto}
                        onChange={(evnt) => handleChange(index, evnt)}
                        name="producto"
                        className="px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map((prod) => (
                            <option key={prod.id} value={prod.nombre}>
                                {prod.nombre}
                            </option>
                        ))}
                    </select>
                </td>
                <td className="p-2">
                    <input
                        type="number"
                        value={precio}
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
