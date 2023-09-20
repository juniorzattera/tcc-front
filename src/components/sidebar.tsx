"use client";
import 'tailwindcss/tailwind.css';
import React from "react";
import Link from 'next/link';

const ButtonLink = ({ children, to, ...props }: {children: string, to: string}) => {
    return (
        <Link
        href={to}
        {...props}
        className="flex items-center mt-5 px-1 py-2  text-white"
        >
        <span className="mx-4 font-medium">{children}</span>
        </Link>
    );
    }

const Sidebar = () => {
    return (
        <div className="items-center justify-center flex flex-col py-8 bg-gray-800">
            <h2 className="text-3xl font-semibold text-white">Menu</h2>

            <div className="flex flex-col justify-between flex-1 mt-1">
                <nav>
                <ButtonLink to="/dashboard">Dashboard</ButtonLink>

                <a className="flex items-center mt-5 px-1 py-2  text-white" href="#">
                    <span className="mx-4 font-medium">Eviceração</span>
                </a>                

                <a className="flex items-center mt-5 px-1 py-2  text-white" href="http://121.1.17.170" target="_blank">
                    <span className="mx-4 font-medium">Marel</span>
                    </a>
                <a className="flex items-center mt-5 px-1 py-2  text-white" href="#">
                    <span className="mx-4 font-medium">Gráficos</span>
                </a>                            
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;