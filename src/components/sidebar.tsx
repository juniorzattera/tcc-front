import 'tailwindcss/tailwind.css';
import React, { useState } from "react";
import Link from 'next/link';
import { BsList, BsArrowLeft } from 'react-icons/bs';

const ButtonLink = ({ children, to, ...props }: { children: string, to: string }) => {
    return (
        <Link
            href={to}
            {...props}
            className="flex items-center mt-5 px-1 py-2 text-white"
        >
            <span className="mx-4 font-medium">{children}</span>
        </Link>
    );
}

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [evicMenuOpen, setEvicMenuOpen] = useState(false);
    const [graphicMenuOpen, setGraphicMenuOpen] = useState(false);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    const toggleEvicMenu = () => {
        setEvicMenuOpen(!evicMenuOpen);
    }

    const toggleGraphicMenu = () => {
        setGraphicMenuOpen(!graphicMenuOpen);
    }

    return (
        <div className="relative">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                className={`fixed h-full bg-gray-800 ${
                    isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full'
                    } transform transition-transform ease-in-out duration-300 z-20`}
            >
                {isSidebarOpen && (
                    <button onClick={closeSidebar} className="text-white p-2 absolute top-0 right-0">
                        <BsArrowLeft size={30} />
                    </button>
                )}
                {!isSidebarOpen && (
                    <button onClick={toggleSidebar} className="text-white p-2 absolute top-0 left-0">
                        <BsList size={30} />
                    </button>
                )}
                <div className="flex flex-col py-8">
                    {isSidebarOpen && (
                        <div className="flex flex-col justify-between flex-1 mt-1">
                            <nav>
                                <h2 className="text-3xl font-semibold text-white mt-5 mx-4">Menu</h2>

                                <ButtonLink to="/dashboard">Home</ButtonLink>

                                <div onClick={toggleEvicMenu} className="flex items-center mt-5 px-1 py-2 text-white cursor-pointer">
                                    <span className="mx-4 font-medium">Evisceração</span>
                                </div>

                                {evicMenuOpen && (
                                    <div className="pl-8">
                                        <ButtonLink to="">Evisceradora</ButtonLink>
                                        <ButtonLink to="">Velocidades\Contadores</ButtonLink>
                                    </div>
                                )}

                                <a className="flex items-center mt-5 px-1 py-2 text-white" href="http://121.1.17.170" target="_blank" rel="noreferrer">
                                    <span className="mx-4 font-medium">Marel</span>
                                </a>

                                <div onClick={toggleGraphicMenu} className="flex items-center mt-5 px-1 py-2 text-white cursor-pointer">
                                    <span className="mx-4 font-medium">Gráficos</span>
                                </div>

                                {graphicMenuOpen && (
                                    <div className="pl-8">
                                        <ButtonLink to="/graficoVel">Velocidades</ButtonLink>
                                        <ButtonLink to="">Temperaturas</ButtonLink>
                                    </div>
                                )}
                                <ButtonLink to="/historico">Histórico de Abates</ButtonLink>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Sidebar;
