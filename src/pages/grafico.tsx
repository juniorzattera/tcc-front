"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Chart, LinearScale, CategoryScale, PointElement, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";


function Grafico() {
  Chart.register(LinearScale, CategoryScale, PointElement, LineElement);
  return (
    <div>
      <Sidebar />
      <div className="bg-gray-800 text-white min-h-screen flex flex-row p-6">
        <div className=" mx-auto">
          <div style={{ width: '900px', height: '900px' }}>
            <Line
              data={{
                labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
                datasets: [
                  {
                    label: "Vendas Mensais",
                    data: [100, 150, 200, 250, 300],
                    fill: false,
                    borderColor: "blue", // Cor da linha do gráfico
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Quantidade",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grafico;
