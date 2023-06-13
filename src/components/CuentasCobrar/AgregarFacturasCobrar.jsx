import { useState, useEffect, button } from "react";
import Navbar from "../Navbar";
import clienteAxios from "../../config/clienteAxios";
import { useParams } from "react-router-dom";
import EditModal from "../modales/EditModal";
import axios from "axios";
import moment from "moment/moment";
import AddDeleteTableRows from "./table/AddDeleteTableRows.jsx";

const AgregarFacturasCobrar = () => {
    const params = useParams();

    const [cliente, setCliente] = useState("");
    const [numFacturaCobrar, setNumFacturaCobrar] = useState("");
    const [fechaEmision, setFechaEmision] = useState("");
    const [diasCredito, setDiasCredito] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        // Obtener los datos desde el servidor utilizando axios
        clienteAxios
            .get(`/clientes/${params.id}`)
            .then((response) => {
                setCliente(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //Este useEffect nos permitira calcular la fecha de vencimiento de manera dinamica
    useEffect(() => {
        setFechaVencimiento(
            moment(moment(fechaEmision).add(diasCredito, "days"), "x").format(
                "MM/DD/YYYY"
            )
        );
        console.log(
            moment(moment(fechaEmision).add(diasCredito, "days"), "x").format(
                "MM/DD/YYYY"
            )
        );
    }, [fechaEmision, diasCredito]);

    //Verificara que ningun campo quede vacio para luego crear la factura
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            [
                numFacturaCobrar,
                fechaEmision,
                diasCredito,
                fechaVencimiento,
                rowsData,
            ].includes("")
        ) {
            console.log("hay campos vacios");
            return;
        }

        try {
            const { data } = await clienteAxios.post("/facturas", {
                numFacturaCobrar,
                fechaEmision,
                diasCredito,
                fechaVencimiento,
                cliente,
            });

            setNumFacturaCobrar("");
            setFechaEmision("");
            setDiasCredito("");
            setFechaVencimiento("");
            setRowsData([]);
            agregarDetalles(data._id);
            Swal.fire({
                icon: "success",
                title: "Factura agregada correctamente",
                // text: "Gracias por enviar el formulario",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: JSON.stringify(error.response.data.msg),
                // text: "Digite un nuevo número de cédula",
            });
            return;
        }
    };

    //Esta funcion agregara los productos en la lista a detalle factura
    async function agregarDetalles(factura) {
        try {
            for (const prod of rowsData) {
                prod.cantidad = Number(prod.cantidad);
                const { producto, precioUnitario, cantidad, tarifa } = prod;
                await clienteAxios.post("/detalle_factura", {
                    producto,
                    precioUnitario,
                    cantidad,
                    factura,
                    tarifa,
                });
                //await clilenteAxios.put(`/productos/${producto._id}`,)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // function agregarLinea(prod, factura) {
    //     const { producto, precioUnitario, cantidad } = prod;

    //     const { data } = clienteAxios.post("/detalle_factura", {
    //         producto,
    //         precioUnitario,
    //         cantidad,
    //         factura,
    //     });
    // }

    return (
        <>
            <Navbar />

            <div className="flex justify-between p-2">
                <h1 className=" text-gray-600 p-5 font-bold text-2xl pl-6 ">
                    Agregar Factura a nombre de {cliente.nombre}
                </h1>
            </div>
            <div className="w-5/6 border rounded-lg shadow-lg md:w-7/12 sm:w-2/3 xl:w-3/4 :2-3/ mx-auto">
                <div className="flex flex-wrap justify-center p-4">
                    <div className="text-center px-5 py-2">
                        <label
                            htmlFor="numFactura"
                            className="block uppercase text-gray-600 text-sm font-bold pb-2"
                        >
                            Numero de Factura
                        </label>
                        <input
                            type="text"
                            id="numFactura"
                            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-48 p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mx-auto"
                            required
                            value={numFacturaCobrar}
                            onChange={(e) => {
                                // Chequear si el valor introducido es un número y si tiene menos de 7 caracteres
                                if (
                                    !isNaN(e.target.value) &&
                                    e.target.value.length <= 6
                                ) {
                                    setNumFacturaCobrar(e.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className="text-center px-5 py-2">
                        <label
                            htmlFor="fechaEmision"
                            className="block uppercase text-gray-600 text-sm font-bold pb-2"
                        >
                            Fecha Emitida
                        </label>
                        <input
                            type="date"
                            id="fechaEmision"
                            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-48 p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mx-auto"
                            required=""
                            value={fechaEmision}
                            onChange={(e) => setFechaEmision(e.target.value)}
                        />
                    </div>
                    <div className="text-center px-5 py-2">
                        <label
                            htmlFor="diasCredito"
                            className="block uppercase text-gray-600 text-sm font-bold pb-2"
                        >
                            Días de crédito
                        </label>
                        <input
                            type="number"
                            id="diasCredito"
                            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-48 p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mx-auto"
                            required=""
                            value={diasCredito}
                            onChange={(e) => setDiasCredito(e.target.value)}
                        />
                    </div>
                    <div className="text-center px-5 py-2">
                        <label
                            htmlFor="fechaVencimiento"
                            className="block uppercase text-gray-600 text-sm font-bold pb-2"
                        >
                            Fecha Vencimiento
                        </label>
                        <input
                            type="text"
                            id="fechaVencimiento"
                            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-48 p-2.5 bg-blue border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mx-auto"
                            required=""
                            value={fechaVencimiento}
                            onChange={(e) =>
                                setFechaVencimiento(e.target.value)
                            }
                            readOnly
                        />
                    </div>
                </div>
            </div>

            <AddDeleteTableRows rowsData={rowsData} setRowsData={setRowsData} />
            <div className="mt-10 flex justify-center gap-4 ">
                <button
                    className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 w-full md:w-1/4 uppercase text-gray-200  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs md:text-sm px-4 md:px-5 py-2 text-center bg-green-700 hover:bg-primary-700 focus:ring-primary-800"
                    onClick={handleSubmit}
                >
                    Guardar Factura
                </button>
            </div>
        </>
    );
};

export default AgregarFacturasCobrar;
