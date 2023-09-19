"use client";
import 'tailwindcss/tailwind.css';
import React, { useState } from "react";

const EditModal = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = React.useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="border border-gray-400 rounded w-full py-2 px-3"
          />
        </div>
        {/* Adicione mais campos de edição conforme necessário */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
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

const CreateModal = ({ onClose, onSave }) => {
  const [newUser, setNewUser] = React.useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSave = () => {
    onSave(newUser);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Criar Usuário</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            className="border border-gray-400 rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="border border-gray-400 rounded w-full py-2 px-3"
          />
        </div>
        {/* Adicione mais campos de criação conforme necessário */}
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

const DeleteModal = ({ user, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(user.id);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Excluir Usuário</h2>
        <p>Você tem certeza de que deseja excluir o usuário "{user.name}"?</p>
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
const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Usuário 1", email: "usuario1@example.com" },
    { id: 2, name: "Usuário 2", email: "usuario2@example.com" },
    // Adicione mais usuários conforme necessário
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleEditUser = (editedUser) => {
    // Atualize o usuário na lista de usuários (faça a chamada à API, se necessário)
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleCreateUser = (newUser) => {
    // Crie um novo usuário na lista de usuários (faça a chamada à API, se necessário)
    const newUserWithId = { ...newUser, id: users.length + 1 };
    setUsers([...users, newUserWithId]);
  };

  const handleDeleteUser = (userId) => {
    // Exclua o usuário da lista de usuários (faça a chamada à API, se necessário)
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-row p-6">
      <div className=" mx-auto">
        <div className="">
          <div className="bg-gray-900 shadow-md p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-semibold mb-2">Lista de Usuários</h2>
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
              
              <ul>
                {users.map((user) => (
                  <li key={user.id} className="mb-2">
                    {user.name} - {user.email}
                    <button
                      onClick={() => openDeleteModal(user)}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>

              {editModalOpen && (
                <EditModal
                  user={selectedUser}
                  onClose={() => setEditModalOpen(false)}
                  onSave={handleEditUser}
                />
              )}
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
