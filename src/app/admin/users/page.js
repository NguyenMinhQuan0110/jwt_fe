'use client';

import api from '@/utils/api';
import Sidebar from '../../../components/Sidebar';
import { useEffect, useState } from 'react';



export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');


  //xử lý lấy danh sách user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Không thể tải danh sách người dùng. Vui lòng thử lại.');
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  const handleDelete = async(id) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (err) {
      setError('Không thể Xóa người dùng người dùng. Vui lòng thử lại.');
      console.log(err);
    }
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

        {error && (
          <div className="text-red-600 mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Tên</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Vai trò</th>
                <th className="p-3 text-left">Block</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.block ? "Có" : "Không"}</td>
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