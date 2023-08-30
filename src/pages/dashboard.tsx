"use client";

import React, { useState, useEffect } from "react";
import { HttpClient } from "@/infra/HttpClient";
import Image from "next/image";

type Count = {
  id: number;
  cont_aut: number;
  cont_esc: number;
  cont_evc: number;
  cont_man1: number;
  cont_man2: number;
  cont_sif: number;
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
  const dateObj = new Date(date);

  // format dd/mm/yyyy hh:mm:ss

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const dayStr = day < 10 ? `0${day}` : day;
  const monthStr = month < 10 ? `0${month}` : month;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

  return `${dayStr}/${monthStr}/${year} ${hoursStr}:${minutesStr}:${secondsStr}`;
};

export default function Dashboard() {
  const [httpClient] = useState(new HttpClient());
  const [count, setCount] = useState<Count>({} as Count);
  const [speed, setSpeed] = useState<Speed>({} as Speed);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      httpClient.get("/metrics/speed").then((response) => {
        setSpeed(response[0]);
      });
      httpClient.get("/metrics/count").then((response) => {
        setCount(response[0]);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [httpClient]);

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      <div className="container mx-auto">
        <div className="">
          <div className="bg-gray-900 shadow-md p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-semibold mb-2">Dashboard</h2>
              <p className="text-gray-400">{`Última atualização: ${formatDateTime(
                count.datahora
              )}`}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="flex flex-row items-center">
                  <h3 className="text-3xl font-semibold mb-2">Contadores</h3>
                  <Image
                    src="/frango.png"
                    width={50}
                    height={50}
                    alt={"asd"}
                  />
                </div>

                <p className="text-xl">Escaldagem: {count.cont_esc}</p>
                <p className="text-xl">Esvisceração: {count.cont_evc}</p>
                <p className="text-xl">SIF: {count.cont_sif}</p>
                <p className="text-xl">Noria Automática: {count.cont_aut}</p>
                <p className="text-xl">Noria Manual 1: {count.cont_man1}</p>
                <p className="text-xl">Noria Manual 2: {count.cont_man2}</p>
              </div>
              <div>
                <div className="flex flex-row items-center">
                  <h3 className="text-3xl font-semibold mb-2">Velocidades</h3>
                  <Image
                    src="/raio.png"
                    width={50}
                    height={50}
                    alt={"asd"}
                  />
                </div>
                <p className="text-xl">
                  Escaldagem/Eviseração: {speed.vel_esc_evc}
                </p>
                <p className="text-xl">SIF: {speed.vel_sif}</p>
                <p className="text-xl">Noria Automática: {speed.vel_aut}</p>
                <p className="text-xl">Noria Manual 1: {speed.vel_man1}</p>
                <p className="text-xl">Noria Manual 2: {speed.vel_man2}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <div className="bg-gray-900 shadow-md p-4 rounded-lg">
            <div className="flex flex-row items-center">
              <h3 className="text-lg font-semibold mb-2">Sangria</h3>
              <Image
                src="/Sangria.png"
                width={50}
                height={50}
                alt={"asd"}
              />
            </div>

            {/* ... conteúdo dos dados adicionais 1 ... */}
          </div>
          <div className="bg-gray-900 shadow-md p-4 rounded-lg">
            <div className="flex flex-row items-center">
              <h3 className="text-lg font-semibold mb-2">Dados Adicionais 1</h3>
              <Image
                src="/frango.png"
                width={50}
                height={50}
                alt={"asd"}
              />
            </div>
            {/* ... conteúdo dos dados adicionais 2 ... */}
          </div>
          <div className="bg-gray-900 shadow-md p-4 rounded-lg">
            <div className="flex flex-row items-center">
              <h3 className="text-lg font-semibold mb-2">Dados Adicionais 1</h3>
              <Image
                src="/frango.png"
                width={50}
                height={50}
                alt={"asd"}
              />
            </div>
            {/* ... conteúdo dos dados adicionais 1 ... */}
          </div>
          <div className="bg-gray-900 shadow-md p-4 rounded-lg">
            <div className="flex flex-row items-center">
              <h3 className="text-lg font-semibold mb-2">Dados Adicionais 1</h3>
              <Image
                src="/frango.png"
                width={50}
                height={50}
                alt={"asd"}
              />
            </div>
            {/* ... conteúdo dos dados adicionais 2 ... */}
          </div>
          <div className="bg-gray-900 shadow-md p-4 rounded-lg">
            <div className="flex flex-row items-center">
              <h3 className="text-lg font-semibold mb-2">Dados Adicionais 1</h3>
              <Image
                src="/frango.png"
                width={50}
                height={50}
                alt={"asd"}
              />
            </div>
            {/* ... conteúdo dos dados adicionais 2 ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
