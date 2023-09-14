"use client";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Usuarios from "@/pages/usuarios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <Router>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/usuarios" element={<Usuarios />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
