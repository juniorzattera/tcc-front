import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { HttpClient } from "@/infra/HttpClient";

type dataType = {
  id: number;
  cont_esc: number;
  cont_evc: number;
  cont_sif: number;
  cont_aut: number;
  cont_man1: number;
  cont_man2: number;
  datahora: string;
};

function Historico() {
  const [data, setData] = useState<dataType[]>([]);
  const [httpClient] = useState(new HttpClient());

  useEffect(() => {
    httpClient.get("/metrics/counter").then((response) => {
      setData(response);
    });
  }, []);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() - 1);

    return dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calcPercentage = (value: number) => {
    const base_value = 128000;
    const percentage = (value / base_value) * 100;
    return {
      text: `${percentage.toFixed(2)}%`,
      value: Number(percentage.toFixed(2)),
    };
  };

  return (
    <div>
      <Sidebar />
      <div className="bg-gray-800 min-h-screen flex flex-row p-2">
        <div className="container mx-auto">
          <div className="">
            <div className="bg-gray-900 shadow-md p-2 rounded-lg">
              <div className="flex flex-col items-center">
                <h2 className="text-5xl text-white font-semibold mb-2">
                  Histórico de Abates
                </h2>
                <div>
                  <table className="w-full border-collapse border border-gray-600">
                    <thead>
                      <tr className="bg-gray-800 text-white ">
                        <th className="p-4 ">datahora</th>
                        <th className="p-4 ">cont_esc</th>
                        <th className="p-4 ">cont_evc</th>
                        <th className="p-4 ">cont_sif</th>
                        <th className="p-4 ">cont_aut</th>
                        <th className="p-4 ">cont_man1</th>
                        <th className="p-4 ">cont_man2</th>
                        <th className="p-4 ">Porcentagem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-200 " : "bg-white"
                          }
                        >
                          <td className="p-4 ">{formatDate(item.datahora)}</td>
                          <td className="p-4">{item.cont_esc}</td>
                          <td className="p-4">{item.cont_evc}</td>
                          <td className="p-4">{item.cont_sif}</td>
                          <td className="p-4">{item.cont_aut}</td>
                          <td className="p-4">{item.cont_man1}</td>
                          <td className="p-4">{item.cont_man2}</td>
                          <td
                            className={
                              calcPercentage(item.cont_esc).value < 100
                                ? "text-red-500 p-4"
                                : "text-green-400 p-4"
                            }
                          >
                            {calcPercentage(item.cont_esc).text}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historico;
