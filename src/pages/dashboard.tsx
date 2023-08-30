"use client";

import React, { useState, useEffect } from "react";
import { HttpClient } from "@/infra/HttpClient";

type Count = {
    id: number;
    cont_aut: number;
    cont_esc: number;
    cont_evc: number;
    cont_man1: number;
    cont_man2: number;
    cont_sif: number;
    datahora: string;
}

type Speed = {
    id: number;
    datahora: string;
    vel_esc_evc: number;
    vel_sif: number;
    vel_aut: number;
    vel_man1: number;
    vel_man2: number;
}

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

  // create a dashboard with the title "Dashboard"
  // a sub title called ultima atualizacao with the date of the last update
    // a table with the following columns:
    // Contadores and Velocidades
    // in the bottom of the columns goes the values of the counters and speeds
  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Ultima atualizacao: {speed.datahora}</h2>
        <table>
            <thead>
                <tr>
                    <th>Contadores</th>
                    <th>Velocidades</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>cont_aut</td>
                    <td>{speed.vel_aut}</td>
                </tr>
                <tr>
                    <td>cont_esc</td>
                    <td>{speed.vel_esc_evc}</td>
                </tr>
                <tr>
                    <td>cont_evc</td>
                    <td>{speed.vel_esc_evc}</td>
                </tr>
                <tr>
                    <td>cont_man1</td>
                    <td>{speed.vel_man1}</td>
                </tr>
                <tr>
                    <td>cont_man2</td>
                    <td>{speed.vel_man2}</td>
                </tr>
                <tr>
                    <td>cont_sif</td>
                    <td>{speed.vel_sif}</td>
                </tr>
            </tbody>
        </table>
    </div>

  );
}
