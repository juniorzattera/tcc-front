"use client";

import React, { useState } from "react";
import { HttpClient } from "@/infra/HttpClient";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [httpClient] = useState(new HttpClient());

  const handleLogin = async () => {
    // Reset previous error messages
    setUsernameError("");
    setPasswordError("");
    setLoginError("");

    // Perform validation
    if (username.trim() === "") {
      setUsernameError("O campo de usuário não pode ficar em branco.");
    }

    if (password.trim() === "") {
      setPasswordError("O campo de senha não pode ficar em branco.");
    }

    if (username.trim() !== "" && password.trim() !== "") {
      try {
        const response = await httpClient.post("/auth/login", {
          username,
          password,
        });
        console.log(response);
      } catch (error) {
        setLoginError("Usuário ou senha incorretos.");
      }
    } else {
      console.log("Login failed.");
    }
  };

  return (
    <main className="gradient-login">
      <div className="container mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-md">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-5 md:p-20 mx-2">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-300 ">
                  Aurora FAQUI
                </h1>
              </div>
              <div className="flex justify-center items-center mt-6">
                <form className="w-full max-w-sm">
                  <div className="md:flex flex-col md:items-center mb-6">
                    <div className="w-full">
                      <label
                        className={`block text-gray-500 font-bold mb-1 md:mb-0 pr-4 ${
                          usernameError && "text-red-500"
                        }`}
                        htmlFor="inline-full-name"
                      >
                        Usuário
                      </label>
                    </div>
                    <div className="">
                      <input
                        className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                          usernameError && "border-red-500"
                        }`}
                        id="inline-full-name"
                        type="text"
                        placeholder="Usuário"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    {usernameError && (
                      <div className="text-red-500 text-sm mt-1">
                        {usernameError}
                      </div>
                    )}
                  </div>
                  <div className="md:flex flex-col md:items-center mb-6">
                    <div className="w-full">
                      <label
                        className={`block text-gray-500 font-bold mb-1 md:mb-0 pr-4 ${
                          passwordError && "text-red-500"
                        }`}
                        htmlFor="inline-password"
                      >
                        Senha
                      </label>
                    </div>
                    <div className="">
                      <input
                        className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                          passwordError && "border-red-500"
                        }`}
                        id="inline-password"
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {passwordError && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </div>
                    )}
                  </div>
                  {loginError && (
                    <div className="text-red-500 text-sm m-2 text-center ">
                      {loginError}
                    </div>
                  )}
                  <div className="flex justify-center ">
                    <button
                      className="shadow bg-blue-600 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded"
                      type="button"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-center mt-12 text-slate-300">
              Desenvolvido por TI/Manutenção - FAQUI
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
