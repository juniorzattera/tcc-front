"use client";
import 'tailwindcss/tailwind.css';
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Usuarios from "@/pages/usuarios";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
      <div className="flex flex-row ">
        <Sidebar />
        <div className="flex-1 ">
          <Dashboard />
        </div>
      </div>
  );
}
