"use client";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { withSession } from "@/services/auth/session";
import { HttpClient } from "@/infra/HttpClient";

const CreateModal = ({ onClose, onSave }: { onClose: any; onSave: any }) => {
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSave = () => {
    onSave(newUser);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-gray-700 p-6 rounded shadow-lg ">
        <h2 className="text-xl font-bold mb-4">Criar Usuário</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block ">
            Nome:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            className="border text-gray-700 border-gray-400 rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block ">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            className="border text-gray-700 border-gray-400 rounded w-full py-2 px-3"
          />
        </div>      
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="ml-2 border border-gray-400 px-4 py-2 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({
  user,
  onClose,
  onDelete,
}: {
  user: any;
  onClose: any;
  onDelete: any;
}) => {
  const handleDelete = () => {
    onDelete(user.id);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-700 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Excluir Usuário</h2>
        <p>Você tem certeza de que deseja excluir o usuário {user.username}?</p>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Excluir
          </button>
          <button
            onClick={onClose}
            className="ml-2 border border-gray-400 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const UserList = (props: any) => {
  const [users, setUsers] = useState<
    { username: string; role: string; id: number }[]
  >([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [httpClient] = useState(new HttpClient());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetUsers();
  }, [loading]);

  const handleGetUsers = async () => {
    try {
      const response = await httpClient.get("/users");
      console.log(response);
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleCreateUser = async (newUser: any) => {
    try {
      setLoading(true);
      await httpClient.post("/users", newUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      await httpClient.delete(`/users/${userId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sidebar {...props} />
      <div className="bg-gray-800 text-white min-h-screen flex flex-row p-6">
        <div className=" mx-auto">
          <div className="">
            <div className="bg-gray-900 shadow-md p-6 rounded-lg">
              <div className="flex flex-col items-center">
                <h2 className="text-5xl font-semibold mb-2">
                  Lista de Usuários
                </h2>
              </div>
              <div>
                <div className="flex justify-end">
                  <button
                    onClick={openCreateModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                  >
                    Criar Novo Usuário
                  </button>
                </div>
                <table className="w-full border-collapse border border-gray-600 ">
                  <thead>
                    <tr className="bg-gray-800 text-white ">
                      <th className="p-4 ">ID</th>
                      <th className="p-4 ">Nome</th>
                      <th className="p-4 ">Privilégio</th>
                      <th className="p-4 ">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-gray-700 " : "bg-gray-800"
                        }
                      >
                        <td className="p-4 px-20 text-center text-white">
                          {item.id}
                        </td>
                        <td className="p-4 px-20 text-center text-white">
                          {item.username}
                        </td>
                        <td className="p-4 px-20 text-center text-white">
                          {item.role}
                        </td>
                        <td className="p-4 px-20 text-center text-white">
                          <button
                            onClick={() => openDeleteModal(item)}
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {createModalOpen && (
                <CreateModal
                  onClose={() => setCreateModalOpen(false)}
                  onSave={handleCreateUser}
                />
              )}
              {deleteModalOpen && (
                <DeleteModal
                  user={selectedUser}
                  onClose={() => setDeleteModalOpen(false)}
                  onDelete={handleDeleteUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

export const getServerSideProps = withSession(async (ctx: any) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});
