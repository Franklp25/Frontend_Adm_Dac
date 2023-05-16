import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

import logo from "../assets/images/Logotipo_Bio&Gen.png";

export default function Navbar() {
    const ref = React.createRef();

    const [click, setClick] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    function closeSession() {
        localStorage.removeItem("token");
        window.location = "/";
    }

    return (
        <>
            <nav className="bg-white">
                <div className="max-w-screen px-5 sm:px-6 lg:px-8 border-solid border-b-2 border-gray-300 ">
                    <div className="flex items-center justify-between h-20 ">
                        <div className="flex-shrink-0">
                            <Link
                                to="/home"
                                className="navbar-text text-black hover:cursor-pointer hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                            >
                                <img className="w-32" src={logo} alt="Logo" />
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
                                    <Link
                                        to="/listaProveedor"
                                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 navbar-text text-black hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Proveedores
                                    </Link>

                                    {/* Cuentas Por Cobrar */}
                                    <Link
                                        to="/listaCuentasCobrar"
                                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 navbar-text text-black hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Cobros
                                    </Link>

                                    {/* Cuentas Por Pagar */}
                                    <Link
                                        to="/listaCuentasPagar"
                                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 navbar-text text-black hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Pagos
                                    </Link>

                                    {/* Inventario */}
                                    <Link
                                        to="/inventario"
                                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 navbar-text text-black hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-lg font-semibold"
                                    >
                                        Productos
                                    </Link>

                                    {/* Estadistica */}

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={closeSession}
                                            className="transition duration-200 ease-in-out transform hover:-translate-y-2 hover:scale-200 navbar-text text-white bg-green-600 hover:bg-green-800 px-3 py-2 rounded-md text-lg font-semibold text-center"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* -------------------------------------------------------------------------------------------------------------------------- */}
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
                            <Link
                                to="/listaCliente"
                                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 hover:bg-green-600 text-black block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Clientes
                            </Link>

                            {/* Proveedores */}
                            <Link
                                to="/listaProveedor"
                                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 hover:bg-green-600 text-black block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Proveedores
                            </Link>

                            {/* Cuentas Por Cobrar */}
                            <Link
                                to="/listaCuentasCobrar"
                                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 hover:bg-green-600 text-black block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Cobros
                            </Link>

                            {/* Cuentas Por Pagar */}
                            <Link
                                to="/listaCuentasPagar"
                                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 hover:bg-green-600 text-black block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Pagos
                            </Link>

                            {/* Inventario */}
                            <Link
                                to="/inventario"
                                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-200 hover:bg-green-600 text-black block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Productos
                            </Link>

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
