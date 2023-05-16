import { useState, useEffect } from "react";
import clienteAxios from "../../../config/clienteAxios";
import TableRows from "./TableRows";

function AddDeleteTableRows({ rowsData, setRowsData }) {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const tarifas = [1, 13];
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    const addTableRows = () => {
        const rowsInput = {
            producto: "",
            precioUnitario: "",
            unidadMedida: "",
            cantidad: "",
            tarifa: "",
        };
        setRowsData([...rowsData, rowsInput]);
    };
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    };

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        const newValues = [...rowsData];
        const selectedProduct = productos.find((prod) => prod._id === value);
        //setRowsData(rowsInput);

        //console.log(name + " valor: " + value);

        newValues[index] = {
            ...newValues[index],
            [name]: value,
            precioUnitario: selectedProduct
                ? selectedProduct.precio
                : newValues[index].precioUnitario,
            unidadMedida: selectedProduct
                ? selectedProduct.unidadMedida
                : newValues[index].unidadMedida,
        };
        setRowsData(newValues);

        //console.log(rowsData);
    };

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get("/productos")
            .then((response) => {
                setProductos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //Este useffect actualizara el total y el subtotal
    useEffect(() => {
        if (rowsData.length > 0) {
            let subTotalAux = 0;
            setSubTotal(0);
            rowsData.forEach((row) => {
                if (Number(row.precioUnitario)) {
                    subTotalAux +=
                        Number(row.precioUnitario) * Number(row.cantidad);
                }
            });
            setSubTotal(subTotalAux);

            let totalAux = 0;
            setTotal(0);
            rowsData.forEach((row) => {
                if (Number(row.precioUnitario)) {
                    totalAux +=
                        Number(row.precioUnitario) * Number(row.cantidad) +
                        (Number(row.precioUnitario) *
                            Number(row.cantidad) *
                            Number(row.tarifa)) /
                            100;
                }
            });
            setTotal(totalAux);
        } else {
            setTotal(0);
            setSubTotal(0)
        }
    }, [rowsData]);

    //funcion que calcula el total de la tabla

    return (
        <div className="container mx-auto px-4 py-6 flex justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="col-span-8">
                    <div class="flex justify-center">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-4 py-2 text-center text-gray-600">
                                        Producto
                                    </th>
                                    <th className="px-4 py-2 text-center text-gray-600">
                                        Precio
                                    </th>
                                    <th className="px-4 py-2 text-center text-gray-600">
                                        Unidad de medida
                                    </th>
                                    <th className="px-4 py-2 text-center text-gray-600">
                                        Cantidad
                                    </th>
                                    <th className="px-4 py-2 text-center text-gray-600">
                                        Tarifa
                                    </th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRows
                                    rowsData={rowsData}
                                    deleteTableRows={deleteTableRows}
                                    handleChange={handleChange}
                                    productos={productos}
                                    productoSeleccionado={productoSeleccionado}
                                    tarifas={tarifas}
                                />
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <p className="text-xl font-bold">Subtotal: {subTotal}</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <p className="text-xl font-bold">Total: {total}</p>
                    </div>

                    <div className="mt-4 flex">
                        <div className="ml-auto">
                            <button
                                className="px-10 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                onClick={addTableRows}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-4"></div>
            </div>
        </div>
    );
}
export default AddDeleteTableRows;
//export const rowsData = rowsData;
