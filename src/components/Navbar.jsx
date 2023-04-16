import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

// import DropdownClientes from "./Clientes/DropdownClientes";
// import DropdownProveedores from "./Proveedores/DropdownProveedores";

import Dropdown from "./Dropdown";

import logo from "../assets/images/Logotipo_Bio&Gen.png";

export default function Navbar() {
    const ref = React.createRef();

    const [click, setClick] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const [flag, setFlag] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const displayDropdownMenu = () => {
        if (!flag) setDropdown(true);
        else setDropdown(false);

        setFlag(!flag);
    };

    const onMouseEnter = () => {
        setDropdown(true);
    };

    const onMouseLeave = () => {
        setDropdown(false);
    };

    function closeSession() {
        localStorage.removeItem("token");
        window.location = "/";
    }

    //cliente---------------------------------------------------------------------------------------------
    const [dropdownClients, setDropdownClients] = useState(false);
    const [flagClients, setFlagClients] = useState(false);

    const onMouseEnterClients = () => {
        setDropdownClients(true);

        console.log(itemsClients);
    };

    const onMouseLeaveClients = () => {
        setDropdownClients(false);
    };

    const displayDropdownMenuClients = () => {
        if (!flagClients) setDropdownClients(true);
        else setDropdownClients(false);

        setFlagClients(!flagClients);
    };
    const itemsClients = [
        {
            title: "Agregar cliente",
            path: "/agregarCliente",
            cName: "dropdown-link",
        },
        {
            title: "Lista cliente",
            path: "/listaCliente",
            cName: "dropdown-link",
        },
    ];

    //proveedor -------------------------------------------------------------------------------------------
    const [dropdownProvider, setDropdownProvider] = useState(false);
    const [flagProvider, setFlagProvider] = useState(false);

    const onMouseEnterProvider = () => {
        setDropdownProvider(true);
    };

    const onMouseLeaveProvider = () => {
        setDropdownProvider(false);
    };

    const displayDropdownMenuProvider = () => {
        if (!flagProvider) setDropdownProvider(true);
        else setDropdownProvider(false);

        setFlagProvider(!flagProvider);
    };
    const itemsProveedor = [
        {
            title: "Agregar proveedor",
            path: "/agregarProveedor",
            cName: "dropdown-link",
        },
        {
            title: "Lista proveedor",
            path: "/listaProveedor",
            cName: "dropdown-link",
        },
    ];

    //Cuentas por Cobrar -------------------------------------------------------------------------------------------
    const [dropdownCobrar, setDropdownCobrar] = useState(false);
    const [flagCobrar, setFlagCobrar] = useState(false);

    const onMouseEnterCobrar = () => {
        setDropdownCobrar(true);
    };

    const onMouseLeaveCobrar = () => {
        setDropdownCobrar(false);
    };

    const displayDropdownMenuCobrar = () => {
        if (!flagCobrar) setDropdownCobrar(true);
        else setDropdownCobrar(false);

        setFlagCobrar(!flagCobrar);
    };
    const itemsCobrar = [
        {
            title: "Agregar cuentas por cobrar",
            path: "/agregarCuentasCobrar",
            cName: "dropdown-link",
        },
        {
            title: "Lista cuentas por cobrar",
            path: "/listaCuentasCobrar",
            cName: "dropdown-link",
        },
    ];

    //Cuentas por Pagar -------------------------------------------------------------------------------------------
    const [dropdownPagar, setDropdownPagar] = useState(false);
    const [flagPagar, setFlagPagar] = useState(false);

    const onMouseEnterPagar = () => {
        setDropdownPagar(true);
    };

    const onMouseLeavePagar = () => {
        setDropdownPagar(false);
    };

    const displayDropdownMenuPagar = () => {
        if (!flagPagar) setDropdownPagar(true);
        else setDropdownPagar(false);

        setFlagPagar(!flagPagar);
    };
    const itemsPagar = [
        {
            title: "Agregar cuentas por pagar",
            path: "/agregarCuentasPagar",
            cName: "dropdown-link",
        },
        {
            title: "Lista cuentas por pagar",
            path: "/listaCuentasPagar",
            cName: "dropdown-link",
        },
    ];

    //Inventario -------------------------------------------------------------------------------------------
    const [dropdownInventario, setDropdownInventario] = useState(false);
    const [flagInventario, setFlagInventario] = useState(false);

    const onMouseEnterInventario = () => {
        setDropdownInventario(true);
    };

    const onMouseLeaveInventario = () => {
        setDropdownInventario(false);
    };

    const displayDropdownMenuInventario = () => {
        if (!flagInventario) setDropdownInventario(true);
        else setDropdownInventario(false);

        setFlagInventario(!flagInventario);
    };
    const itemsInventario = [
        {
            title: "Inventario",
            path: "/inventario",
            cName: "dropdown-link",
        },
    ];

    //Estadistica -------------------------------------------------------------------------------------------
    const [dropdownEstadistica, setDropdownEstadistica] = useState(false);
    const [flagEstadistica, setFlagEstadistica] = useState(false);

    const onMouseEnterEstadistica = () => {
        setDropdownEstadistica(true);
    };

    const onMouseLeaveEstadistica = () => {
        setDropdownEstadistica(false);
    };

    const displayDropdownMenuEstadistica = () => {
        if (!flagEstadistica) setDropdownEstadistica(true);
        else setDropdownEstadistica(false);

        setFlagEstadistica(!flagEstadistica);
    };
    const itemsEstadistica = [
        {
            title: "Estadistica",
            path: "/estadistica",
            cName: "dropdown-link",
        },
    ];

    return (
        <>
            <nav className=" bg-white">
                <div className="max-w-screen px-5 sm:px-6 lg:px-8 border-solid border-b-2 border-gray-300 ">
                    <div className="flex items-center justify-between h-20 ">
                        <div className="flex-shrink-0">
                            <Link
                                to="/home"
                                className=" navbar-text text-black hover:cursor-pointer hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                            >
                                <img className=" w-32" src={logo} alt="Logo" />
                            </Link>
                        </div>
                        <div className="flex items-center ml-8">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        to="/home"
                                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 navbar-text text-black hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Inicio
                                    </Link>

                                    {/* clientes */}
                                    <Link
                                        to="/listaCliente"
                                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 navbar-text text-black hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Clientes
                                    </Link>

                                    {/* Proveedores */}
                                    <div
                                        className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-md text-lg font-semibold hover:text-white"
                                        onMouseEnter={onMouseEnterProvider}
                                        onMouseLeave={onMouseLeaveProvider}
                                        onClick={displayDropdownMenuProvider}
                                    >
                                        Proveedores
                                        <div onClick={closeMobileMenu}>
                                            {dropdownProvider && (
                                                <Dropdown
                                                    items={itemsProveedor}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Cuentas Por Cobrar */}
                                    <div
                                        className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-md text-lg font-semibold hover:text-white"
                                        onMouseEnter={onMouseEnterCobrar}
                                        onMouseLeave={onMouseLeaveCobrar}
                                        onClick={displayDropdownMenuCobrar}
                                    >
                                        Cobrar
                                        <div onClick={closeMobileMenu}>
                                            {dropdownCobrar && (
                                                <Dropdown items={itemsCobrar} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Cuentas Por Pagar */}
                                    <div
                                        className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-md text-lg font-semibold hover:text-white"
                                        onMouseEnter={onMouseEnterPagar}
                                        onMouseLeave={onMouseLeavePagar}
                                        onClick={displayDropdownMenuPagar}
                                    >
                                        Pagar
                                        <div onClick={closeMobileMenu}>
                                            {dropdownPagar && (
                                                <Dropdown items={itemsPagar} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Inventario */}

                                    <Link
                                        to="/inventario"
                                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 navbar-text text-black hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Producto
                                    </Link>

                                    {/* Estadistica */}
                                    <div
                                        className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-md text-lg font-semibold hover:text-white"
                                        onMouseEnter={onMouseEnterEstadistica}
                                        onMouseLeave={onMouseLeaveEstadistica}
                                        onClick={displayDropdownMenuEstadistica}
                                    >
                                        Estadística
                                        <div onClick={closeMobileMenu}>
                                            {dropdownEstadistica && (
                                                <Dropdown
                                                    items={itemsEstadistica}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={closeSession}
                                        className="transition duration-200 ease-in-out transform hover:-translate-y-2 hover:scale-200 navbar-text text-white bg-green-600 hover:bg-green-800 px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="md:hidden" id="mobile-menu">
                        <div
                            ref={ref}
                            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                        >
                            <Link
                                to="/home"
                                className="hover:bg-green-600 text-black block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Inicio
                            </Link>

                            {/* clientes */}
                            <div
                                className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-mdtext-black text-lg font-semibold hover:text-white"
                                onMouseEnter={onMouseEnterClients}
                                onMouseLeave={onMouseLeaveClients}
                                onClick={displayDropdownMenuClients}
                            >
                                Clientes
                                <div onClick={closeMobileMenu}>
                                    {dropdownClients && (
                                        <Dropdown items={itemsClients} />
                                    )}
                                </div>
                            </div>

                            {/* Proveedores */}
                            <div
                                className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-mdtext-black text-lg font-semibold hover:text-white"
                                onMouseEnter={onMouseEnterProvider}
                                onMouseLeave={onMouseLeaveProvider}
                                onClick={displayDropdownMenuProvider}
                            >
                                Proveedores
                                <div onClick={closeMobileMenu}>
                                    {dropdownProvider && (
                                        <Dropdown items={itemsProveedor} />
                                    )}
                                </div>
                            </div>

                            {/* Cuentas Por Cobrar */}
                            <div
                                className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-mdtext-black text-lg font-semibold hover:text-white"
                                onMouseEnter={onMouseEnterCobrar}
                                onMouseLeave={onMouseLeaveCobrar}
                                onClick={displayDropdownMenuCobrar}
                            >
                                Cuentas por cobrar
                                <div onClick={closeMobileMenu}>
                                    {dropdownCobrar && (
                                        <Dropdown items={itemsCobrar} />
                                    )}
                                </div>
                            </div>

                            {/* Cuentas Por Pagar */}
                            <div
                                className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-mdtext-black text-lg font-semibold hover:text-white"
                                onMouseEnter={onMouseEnterPagar}
                                onMouseLeave={onMouseLeavePagar}
                                onClick={displayDropdownMenuPagar}
                            >
                                Cuentas por pagar
                                <div onClick={closeMobileMenu}>
                                    {dropdownPagar && (
                                        <Dropdown items={itemsPagar} />
                                    )}
                                </div>
                            </div>

                            {/* Inventario */}
                            <div
                                className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-mdtext-black text-lg font-semibold hover:text-white"
                                onMouseEnter={onMouseEnterInventario}
                                onMouseLeave={onMouseLeaveInventario}
                                onClick={displayDropdownMenuInventario}
                            >
                                Inventario
                                <div onClick={closeMobileMenu}>
                                    {dropdownInventario && (
                                        <Dropdown items={itemsInventario} />
                                    )}
                                </div>
                            </div>

                            {/* Estadistica */}
                            <div
                                className="hover:cursor-pointer hover:bg-green-600 px-3 py-2 rounded-mdtext-black text-lg font-semibold hover:text-white"
                                onMouseEnter={onMouseEnterEstadistica}
                                onMouseLeave={onMouseLeaveEstadistica}
                                onClick={displayDropdownMenuEstadistica}
                            >
                                Estadística
                                <div onClick={closeMobileMenu}>
                                    {dropdownEstadistica && (
                                        <Dropdown items={itemsEstadistica} />
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeSession}
                                className="transition duration-200 ease-in-out transform hover:-translate-y-2 hover:scale-200 w-full text-start text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </Transition>
            </nav>
        </>
    );
}
