"use client";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import { HttpClient } from "@/infra/HttpClient";
import Image from "next/image";
import Sidebar from "@/components/sidebar";

type Count = {
  id: number;
  cont_pendura: number;
  cont_aut: number;
  cont_esc: number;
  cont_evc: number;
  cont_man1: number;
  cont_man2: number;
  cont_sif: number;
  cont_chillers: number;
  datahora: string;
};

type Speed = {
  id: number;
  datahora: string;
  vel_esc_evc: number;
  vel_sif: number;
  vel_aut: number;
  vel_man1: number;
  vel_man2: number;
};

const formatDateTime = (date: string) => {
  if (!date) return "";
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const dayStr = day < 10 ? `0${day}` : day;
  const monthStr = month < 10 ? `0${month}` : month;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${dayStr}/${monthStr}/${year} ${hoursStr}:${minutesStr}`;
};

export default function Dashboard() {
  const [httpClient] = useState(new HttpClient());
  const [count, setCount] = useState<Count>({} as Count);
  const [speed, setSpeed] = useState<Speed>({} as Speed);
  const [usernameError, setUsernameError] = useState(false);
  const [statusSangria, setStatusSangria] = useState(false);
  const colors = Array.from({ length: 24 }, () =>
    Math.random() < 0.5 ? "bg-green-500" : "bg-red-500"
  );

  useEffect(() => {
    const fetchSpeed = () => {
      httpClient.get("/metrics/speed").then((response) => {
        setSpeed(response[0]);
      });
    };
    const fetchCount = () => {
      httpClient.get("/metrics/count").then((response) => {
        setCount(response[0]);
      });
    };
    const fetchPing = () => {
      httpClient.get("/metrics/ping").then((response) => {
        if (response[0].camera_sangria === 0) {
          setStatusSangria(true);
        } else {
          setStatusSangria(false);
        }
      });
    };

    fetchSpeed();
    fetchCount();
    fetchPing();
    const interval = setInterval(() => {
      fetchSpeed();
      fetchCount();
      fetchPing();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="bg-gray-800 text-white min-h-screen flex flex-row p-6">
        <div className="container mx-auto">
          <div className="">
            <div className="bg-gray-900 shadow-md p-6 rounded-lg">
              <div className="flex flex-col items-center">
                <h2 className="text-5xl font-semibold mb-2">
                  Dashboard - FAQUI
                </h2>
                <p className="text-gray-400">{`Última atualização: ${formatDateTime(
                  count.datahora
                )}`}</p>
              </div>
              <div className="flex justify-around">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <h3 className="text-3xl font-semibold mb-2">Contadores</h3>
                    <Image
                      src="/frango.png"
                      width={50}
                      height={50}
                      alt={"asd"}
                    />
                  </div>
                  <p className="text-xl ">Pendura: {count.cont_pendura}</p>
                  <p className="text-xl ">Escaldagem: {count.cont_esc}</p>
                  <p className="text-xl">Evisceração: {count.cont_evc}</p>
                  <p className="text-xl">Inspeção Federal: {count.cont_sif}</p>
                  <p className="text-xl">Nória Automática: {count.cont_aut}</p>
                  <p className="text-xl">Nória Manual 1: {count.cont_man1}</p>
                  <p className="text-xl">Nória Manual 2: {count.cont_man2}</p>
                  <p className="text-xl">Chillers: {count.cont_chillers}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center">
                    <h3 className="text-3xl font-semibold mb-2">Velocidades</h3>
                    <Image src="/raio.png" width={50} height={50} alt={"asd"} />
                  </div>
                  <p className="text-xl">
                    Escaldagem/Evisceração:{" "}
                    <span
                      className={speed.vel_esc_evc < 144 ? "text-red-500" : ""}
                    >
                      {speed.vel_esc_evc}
                    </span>
                  </p>
                  <p className="text-xl">Inspeção Federal: {speed.vel_sif}</p>
                  <p className="text-xl">Nória Automática: {speed.vel_aut}</p>
                  <p className="text-xl">Nória Manual 1: {speed.vel_man1}</p>
                  <p className="text-xl">Nória Manual 2: {speed.vel_man2}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-4 justify-around">
            <div className="bg-gray-900 shadow-md p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <Image
                    src="/Sangria.png"
                    width={40}
                    height={40}
                    alt={"asd"}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Sangria</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xl flex w-full items-center justify-center">
                      Sistema de Detecção
                    </p>
                    <p className="text-xl flex w-full items-center justify-center">
                      Frangos Mal Sangrados
                    </p>
                  </div>

                  <p className="text-xl text-center">Status</p>
                  {statusSangria ? (
                    <div className="text-xl flex w-full items-center justify-center gap-2">
                      <p className="">Conectado</p>
                      <Image
                        src="/true.png"
                        width={25}
                        height={25}
                        alt={"asd"}
                        className=""
                      />
                    </div>
                  ) : (
                    <div className="text-xl flex w-full items-center justify-center gap-2">
                      <p className="">Desconectado</p>
                      <Image
                        src="/false.png"
                        width={25}
                        height={25}
                        alt={"asd"}
                        className=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-900 shadow-md p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <Image
                    src="/aguaquente.png"
                    width={40}
                    height={40}
                    alt={"asd"}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Escaldagem</h3>
              </div>
              <div>
                <p className="text-xl flex w-full items-center justify-center">
                  Temperatura
                </p>
                <p className="text-xl flex w-full items-center justify-center">
                  Tanque de Escaldagem
                </p>
                <p className="text-xl flex w-full items-center justify-center text-red-500">
                  Sem dados
                </p>
              </div>
            </div>
            <div className="bg-gray-900 shadow-md p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <Image
                    src="/figado.png"
                    width={40}
                    height={40}
                    alt={"asd"}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Evisceradora</h3>
                <div className="grid grid-cols-6 gap-4 grid-rows-4">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 ${color} rounded-md`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-900 shadow-md p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <Image
                    src="/preresfriamento.png"
                    width={40}
                    height={40}
                    alt={"asd"}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  Pré Resfriamento
                </h3>
                <div>
                  <p className="text-xl flex w-full items-center justify-center">
                    Temperatura Chiller 1
                  </p>
                  <p className="text-xl flex w-full items-center justify-center text-red-500">
                  Sem dados
                  </p>
                  <p className="text-xl flex w-full items-center justify-center">
                    Temperatura Chiller 2
                  </p>
                  <p className="text-xl flex w-full items-center justify-center text-red-500">
                  Sem dados
                  </p>
                  <p className="text-xl flex w-full items-center justify-center">
                    Vazão Produção Gelo
                  </p>
                  <p className="text-xl flex w-full items-center justify-center text-red-500">
                  Sem dados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
