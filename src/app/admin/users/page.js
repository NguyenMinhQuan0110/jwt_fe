'use client';

import api from '@/utils/api';
import Sidebar from '../../../components/Sidebar';
import { useEffect, useRef, useState } from 'react';



export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);


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
// Cập nhật mối khi searchTerm  thay đổi
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        searchUsers(searchTerm);
      } else {
        // Nếu không có từ khóa thì load tất cả
        api.get('/users')
          .then(res => setUsers(res.data))
          .catch(err => {
            console.error(err);
            setError('Không thể tải danh sách người dùng.');
          });
      }
    }, 500); // 0.5 giây debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Mở modal xác nhận xóa
  const handleAskDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  //gọi api xác nhận xóa
  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/delete/${userToDelete.id}`);
      setSuccess(`Xóa thành công người dùng: ${userToDelete.name}`)
      setUsers(users.filter((user) => user.id !== userToDelete.id));
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Không thể Xóa người dùng người dùng. Vui lòng thử lại.';
      setError(errorMessage);
    } finally {
      // Sau khi xử lý xong mới reset modal
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };


  //gọi api xử lý tìm kiếm user
  const searchUsers = async (keyword) => {
    try {
      const response = await api.get(`/users/search`, {
        params: { keyword }
      });
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Lỗi khi tìm kiếm:', err);
      setError('Không thể tìm kiếm. Vui lòng thử lại.');
    }
  };

  // Click outside để đóng modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDeleteModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDeleteModalOpen]);

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
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập tên, email, hoặc id của user..."
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="text-red-600 mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 mb-4">
            {success}
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
                      onClick={() => handleAskDelete(user)}
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
      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
            <p className="mb-6">
              Bạn có chắc chắn muốn xóa người dùng: <strong>{userToDelete.name}</strong> không?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}