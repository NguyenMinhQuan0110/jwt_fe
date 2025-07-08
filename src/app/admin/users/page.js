'use client';

import Sidebar from '../../../components/Sidebar';
import { useState } from 'react';

// Mock data cho người dùng
const mockUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'User' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'Admin' },
  { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'User' },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
        <a
          href="/admin/users/add"
          className="mb-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Thêm người dùng
        </a>
        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Tên</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Vai trò</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <a href={`/admin/users/manage/${user.id}`} className="text-blue-600 hover:underline mr-4">
                      Quản lý
                    </a>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}