'use client';

import Sidebar from '../../../../../components/Sidebar';
import { useState } from 'react';
import { useParams } from 'next/navigation';

// Mock data cho người dùng
const mockUser = {
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'a@example.com',
  role: 'User',
  status: 'Active',
};

export default function ManageUser() {
  const { id } = useParams();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState(mockUser.role);
  const [status, setStatus] = useState(mockUser.status);

  const roles = ['User', 'Admin'];

  const handleUpdateRole = (role) => {
    setSelectedRole(role);
    setShowRoleDropdown(false);
    // Logic gọi API cập nhật vai trò sẽ được thêm sau
    console.log('Update Role for user:', id, 'New Role:', role);
  };

  const handleToggleStatus = () => {
    const newStatus = status === 'Active' ? 'Blocked' : 'Active';
    setStatus(newStatus);
    // Logic gọi API block/unblock sẽ được thêm sau
    console.log('Toggle Status for user:', id, 'New Status:', newStatus);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Thông tin người dùng</h3>
          <p className="mb-2"><strong>Tên:</strong> {mockUser.name}</p>
          <p className="mb-2"><strong>Email:</strong> {mockUser.email}</p>
          <p className="mb-4"><strong>Trạng thái:</strong> {status}</p>
          <p className="mb-4"><strong>Vai trò hiện tại:</strong> {selectedRole}</p>
          <div className="flex space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Cập nhật vai trò
              </button>
              {showRoleDropdown && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleUpdateRole(role)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleToggleStatus}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              {status === 'Active' ? 'Block' : 'Unblock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}