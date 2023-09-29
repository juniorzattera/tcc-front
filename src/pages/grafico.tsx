import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar";
import { HttpClient } from "@/infra/HttpClient";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const initialData = {
  series: [],
  options: {
    chart: {
      type: "area",
      height: 500,
    },
    colors: ["#73BF69", "#F2CC0C", "#8AB8FF", "#FF780A", "#775DD0"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.2,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      type: "datetime",
    },    
    tooltip: {
      enabled: true,
      shared: true,
      onDatasetHover: {
        highlightDataSeries: true,
      },
      style: {
        fontSize: "16px",
        fontFamily: "Arial",
      },
      theme: "dark",
      x: {
        show: true,
        format: "dd/MM/yyyy HH:mm",
      }
    },
  },
};

function Grafico() {
  const [httpClient] = useState(new HttpClient());
  const [data, setData] = useState(initialData);

  const fetchSpeed = () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 4 * 60 * 60 * 1000);

    httpClient
      .get(`/metrics/speeder?start=${yesterday.toISOString()}&end=${now.toISOString()}`)
      .then((response) => {
        if (response.length > 0) {
          const series = [
            {
              name: "Nória Escaldagem/Evisceração",
              data: response.map((item) => ({
                x: new Date(item.datahora).getTime(),
                y: item.vel_esc_evc,
              })),
            },
            {
              name: "Nória Inspeção Federal",
              data: response.map((item) => ({
                x: new Date(item.datahora).getTime(),
                y: item.vel_sif,
              })),
            },
            {
              name: "Nória Automática",
              data: response.map((item) => ({
                x: new Date(item.datahora).getTime(),
                y: item.vel_aut,
              })),
            },
            {
              name: "Nória Manual 1",
              data: response.map((item) => ({
                x: new Date(item.datahora).getTime(),
                y: item.vel_man1,
              })),
            },
            {
              name: "Nória Manual 2",
              data: response.map((item) => ({
                x: new Date(item.datahora).getTime(),
                y: item.vel_man2,
              })),
            },
          ];
          setData({
            ...data,
            series,
          });
        }
      });
  };

  useEffect(() => {
    fetchSpeed();
    const interval = setInterval(fetchSpeed, 60000);
    return () => clearInterval(interval);
  }, [httpClient]);

  return (
    <div>
      <Sidebar />
      <div className="bg-gray-800 min-h-screen flex flex-row p-2">
        <div className="container mx-auto">
          <div className="">
            <div className="bg-gray-900 shadow-md p-2 rounded-lg">
              <div className="flex flex-col items-center">
                <h2 className="text-5xl text-white font-semibold mb-2">
                  Velocidades Nórias
                </h2>
          <div style={{ width: "1200px", height: "500px" }} className="bg-white">
            {data.series.length > 0 && (
              <Chart
                options={data.options}
                series={data.series}
                type="area"
                height={500}
                width={1200}
              />
            )}
               </div>
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grafico;