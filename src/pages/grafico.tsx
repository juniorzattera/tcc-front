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
      height: 600,
    },
    colors: ["#008FFB", "#00E396", "#CED4DC", "#FF4560", "#775DD0"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
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
    httpClient
      .get("/metrics/speeder?start=2023-08-21&end=2023-08-22")
      .then((response) => {
        if (response.length > 0) {
          const series = [
            "vel_esc_evc",
            "vel_sif",
            "vel_aut",
            "vel_man1",
            "vel_man2",
          ].map((propertyName) => ({
            name: propertyName,
            data: response.map((item: any) => {
              console.log(item[propertyName]);
              return {
                x: new Date(item.datahora).getTime(),
                y: item[propertyName],
              }
            }),
          }));

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
      <div className="bg-gray-800 text-white min-h-screen flex flex-row p-6">
        <div className="mx-auto">
          <div style={{ width: "1300px", height: "600px" }} className="bg-white">
            {data.series.length > 0 && (
              <Chart
                options={data.options}
                series={data.series}
                type="area"
                height={600}
                width={1300}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grafico;