import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { HttpClient } from "@/infra/HttpClient";

type dataType = {
  id: number;
  cont_pendura: number;
  diferenca_pen_esc: number;
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
                        <th className="p-4 ">Data</th>
                        <th className="p-4 ">Pendura</th>
                        <th className="p-4 ">Escaldagem</th>
                        <th className="p-4 ">Evisceração</th>
                        <th className="p-4 ">Inspeção Federal</th>
                        <th className="p-4 ">Nória Automática</th>
                        <th className="p-4 ">Nória Manual 1</th>
                        <th className="p-4 ">Nória Manual 2</th>
                        <th className="p-4 ">Atendimento Cota Diária</th>
                        <th className="p-4 ">Perca Aves Pend. X Esc.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-700 " : "bg-gray-800"
                          }
                        >
                          <td className="p-4 text-center text-white">{formatDate(item.datahora)}</td>
                          <td className="p-4 text-center text-white">{item.cont_pendura}</td>
                          <td className="p-4 text-center text-white">{item.cont_esc}</td>
                          <td className="p-4 text-center text-white">{item.cont_evc}</td>
                          <td className="p-4 text-center text-white">{item.cont_sif}</td>
                          <td className="p-4 text-center text-white">{item.cont_aut}</td>
                          <td className="p-4 text-center text-white">{item.cont_man1}</td>
                          <td className="p-4 text-center text-white">{item.cont_man2}</td>
                          <td
                            className={
                              calcPercentage(item.cont_pendura).value < 100
                                ? "text-red-500 text-center p-4 font-semibold"
                                : "text-green-400 text-center p-4 font-semibold"
                            }
                          >
                            {calcPercentage(item.cont_pendura).text}
                          </td>
                          <td className="p-4 text-center text-red-500">{item.diferenca_pen_esc}</td>
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
