"use client";

import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ children, to, ...props }: {children: string, to: string}) => {
    return (
        <Link
        to={to}
        {...props}
        className="flex items-center mt-5 px-4 py-2 text-gray-700 rounded dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900"
        >
        <span className="mx-4 font-medium">{children}</span>
        </Link>
    );
    }

const Sidebar = () => {
    return (
        <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Menu</h2>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                <ButtonLink to="/dashboard">Dashboard</ButtonLink>

                <a className="flex items-center mt-5 px-4 py-2 text-gray-700 rounded dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900" href="#">
                    <span className="mx-4 font-medium">Eviceração</span>
                </a>

                <a className="flex items-center mt-5 px-4 py-2 text-gray-700 rounded dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900" href="#">
                    <span className="mx-4 font-medium">Acumulados Turnos</span>
                </a>
                <a className="flex items-center mt-5 px-4 py-2 text-gray-700 rounded dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900" href="#">
                    <span className="mx-4 font-medium">Marel</span>
                </a>
                <a className="flex items-center mt-5 px-4 py-2 text-gray-700 rounded dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900" href="#">
                    <span className="mx-4 font-medium">Gráficos</span>
                </a>
                <ButtonLink to="/usuarios">Usuários</ButtonLink>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;