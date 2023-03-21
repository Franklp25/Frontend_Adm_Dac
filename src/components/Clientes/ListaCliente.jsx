import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Alerta from "../Alerta";
import clienteAxios from "../../config/clienteAxios";
import Table from "../Table.jsx";
import EditModal from "../modales/EditModal";

const ListaCliente = () => {
    // let client = {};

    const [clients, setClients] = useState([]);

    // const [tipoCedula, setTipoCedula] = useState("");
    // const [cedula, setCedula] = useState("");
    // const [nombre, setNombre] = useState("");
    // const [apellidos, setApellidos] = useState("");
    // const [telefono, setTelefono] = useState("");
    // const [email, setEmail] = useState("");
    // const [direccion, setDireccion] = useState("");

    // const [showEditModal, setShowEditModal] = useState(false);
    // const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await clienteAxios.get("/clientes");

                setClients(response.data);
            } catch (error) {
                // Swal.fire({
                //     position: "center",
                //     icon: "error",
                //     title: "¡Ocurrió un problema, por favor inténtelo de nuevo!",
                //     showConfirmButton: false,
                //     timer: 2000,
                // }).then(() => {
                //     window.location.reload();
                // });
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // const handleEdit = (event) => {
    //     setShowEditModal(false);
    //     event.preventDefault();
    //     let usuario = {
    //         _id: id,
    //         nombre: nombre,
    //         cedula: cedula,
    //         correo: correo,
    //         contrasena: contrasena,
    //         rol: rol,
    //     };
    //     let message =
    //         "Lo sentimos, ocurrió un problema durante el proceso, por favor inténtelo de nuevo";
    //     let icon = "error";
    //     axios
    //         .post(`/aqua-system/user/update/${id}`, usuario)
    //         .then((res) => {
    //             if (res.data.data !== "") {
    //                 message = res.data.data;
    //                 icon = "success";
    //             }
    //             if (res.status === 200) {
    //                 message = "¡Usuario actualizado exitosamente!";
    //                 icon = "success";
    //             } else if (res.status === 400) {
    //                 message =
    //                     "¡Error, ya existe un usuario con ese número de cédula!";
    //             }
    //             Swal.fire({
    //                 position: "center",
    //                 icon: icon,
    //                 title: message,
    //                 showConfirmButton: false,
    //                 timer: 2000,
    //             }).then(() => {
    //                 window.location.reload();
    //             });
    //         })
    //         .catch((err) => {
    //             if (err.response) {
    //                 if (err.response.status === 200) {
    //                     message = "¡Usuario actualizado exitosamente!";
    //                     icon = "success";
    //                 } else if (err.response.status === 400) {
    //                     message =
    //                         "¡Error, ya existe un usuario con ese número de cédula!";
    //                     icon = "error";
    //                 }
    //             }
    //             Swal.fire({
    //                 position: "center",
    //                 icon: icon,
    //                 title: message,
    //                 showConfirmButton: false,
    //                 timer: 2000,
    //             }).then(() => {
    //                 window.location.reload();
    //             });
    //         });
    // };
    // const editForm = (
    //     <>
    //         <form className="w-full" onSubmit={handleEdit}>
    //             <div className="  w-full mb-6">
    //                 <label className="inline-block mb-2">Cédula:</label>
    //                 <input
    //                     className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
    //                     id="cedula"
    //                     name="cedula"
    //                     value={cedula}
    //                     required
    //                 />

    //                 <label className="inline-block my-2">
    //                     Nombre completo:
    //                 </label>
    //                 <input
    //                     className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
    //                     id="nombre"
    //                     name="nombre"
    //                     value={nombre}
    //                     onChange={(e) => {
    //                         setNombre(e.target.value);
    //                     }}
    //                     required
    //                 />
    //                 <label className="inline-block my-2">
    //                     Correo electrónico:
    //                 </label>
    //                 <input
    //                     className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
    //                     id="correo"
    //                     name="correo"
    //                     value={correo}
    //                     onChange={(e) => {
    //                         setCorreo(e.target.value);
    //                     }}
    //                     required
    //                 />
    //                 <label className="inline-block my-2">Contraseña:</label>
    //                 <input
    //                     id="contrasena"
    //                     type="password"
    //                     name="contrasena"
    //                     className="shadow border rounded w-full py-2 px-1 text-black"
    //                     value={contrasena}
    //                     required
    //                 />

    //                 <label className="inline-block my-2">Rol:</label>
    //                 <select
    //                     id="rol"
    //                     className="shadow border rounded w-full py-2 px-1 text-black"
    //                     name="rol"
    //                     value={rol}
    //                     onChange={(e) => {
    //                         setRol(e.target.value);
    //                     }}
    //                     required
    //                 >
    //                     <option disabled value="">
    //                         Seleccione el rol que tendrá el usuario dentro del
    //                         sistema...
    //                     </option>
    //                     <option value="usuario">Usuario</option>
    //                     <option value="administrador">Administrador</option>
    //                 </select>
    //             </div>
    //             <div className="h-auto flex items-center justify-start ">
    //                 <button
    //                     className="shrink mr-5 px-3 py-2.5 bg-yellow-500 text-white font-bold  leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    //                     type="submit"
    //                 >
    //                     Editar
    //                 </button>
    //                 <button
    //                     className="shrink  px-3 py-2.5 bg-red-600 text-white font-bold  leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    //                     type="button"
    //                     onClick={() => setShowEditModal(false)}
    //                 >
    //                     Cancelar
    //                 </button>
    //             </div>
    //         </form>
    //     </>
    // );

    // const handleShowEdit = (cell) => {
    //     setShowEditModal(true);
    //     client = cell?.row?.original;
    //     setCedula(client.cedula);
    //     setNombre(client.nombre);
    //     setApellidos(client.apellidos);
    //     setTelefono(client.telefono);
    //     setEmail(client.email);
    //     setDireccion(client.direccion);
    // };

    const columns = [
        {
            Header: "Tipo Cedula",
            accessor: "tipoCedula",
        },
        {
            Header: "Cedula",
            accessor: "cedula",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Apellidos",
            accessor: "apellidos",
        },
        {
            Header: "Telefono",
            accessor: "telefono",
        },
        {
            Header: "Correo",
            accessor: "email",
        },
        {
            Header: "Dirreccion",
            accessor: "direccion",
        },
        {
            Header: "Editar",
            accessor: "editar",
            Cell: (props) => (
                <button
                    type="button"
                    title="Editar usuario"
                    className="text-yellow-500 hover:text-yellow-700 text-xl ml-4"
                    onClick={() => handleShowEdit(props)}
                >
                    {/* <FontAwesomeIcon
                        className="hover:cursor-pointer"
                        icon={icon({ name: "user-pen", style: "solid" })}
                    /> */}
                    Editar
                </button>
            ),
        },
        {
            Header: "Eliminar",
            accessor: "eliminar",
            Cell: (props) => (
                <button
                    type="button"
                    title="Eliminar usuario"
                    className="text-red-500 hover:text-red-800 text-xl ml-4"
                    // onClick={() => handleShowDelete(props)}
                >
                    {/* <FontAwesomeIcon
                        className="hover:cursor-pointer"
                        icon={icon({ name: "trash", style: "solid" })}
                    /> */}
                    Eliminar
                </button>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            {/* {showEditModal ? (
                <EditModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    form={editForm}
                />
            ) : null} */}
            <Table columns={columns} data={clients} />
        </>
    );
};

export default ListaCliente;
