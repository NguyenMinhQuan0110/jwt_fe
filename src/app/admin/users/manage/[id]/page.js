'use client';

import Sidebar from '../../../../../components/Sidebar';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';

export default function ManageUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [status, setStatus] = useState(user.block);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState('');
  const [actionType, setActionType] = useState('');
  const [actionPayload, setActionPayload] = useState(null);
  const reasonModalRef = useRef(null);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [reason, setReason] = useState('');

  const roles = ['User', 'Admin'];

  // Lấy thông tin user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        const user = response.data;
        setUser(user);
        setSelectedRole(user.role);
        setStatus(!user.block);
      } catch (err) {
        setError('Không thể tải thông tin người dùng. Vui lòng thử lại.');
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  // Mở modal xác nhận block/unblock
  const handleAskConfirmToggleStatus = () => {
    setPendingStatus(status ? 'chặn' : 'bỏ chặn');
    setActionType('toggleStatus');
    setActionPayload(null);
    if (status === true) {
      // sắp block => mở modal nhập lý do
      setIsReasonModalOpen(true);
    } else {
      // Nếu đang block -> unblock luôn, không cần lý do
      setIsModalOpen(true);
    }
  };

  // Mở modal xác nhận cập nhật vai trò
  const handleAskConfirmUpdateRole = (role) => {
    setPendingStatus(`cập nhật quyền "${role}" cho`);
    setActionType('updateRole');
    setActionPayload(role);
    setIsModalOpen(true);
    setShowRoleDropdown(false);
  };

  // Xác nhận hành động từ modal
  const handleConfirmAction = async () => {
    if (actionType === 'toggleStatus') {
      if (status === true) {
        try {
          await api.put(`/users/lockuser`, { id, reason });
        } catch (err) {
          setError('Không thể block tin người dùng. Vui lòng thử lại.');
          console.log(err);
        }
      }else{
        try {
          await api.put(`/users/unlockuser/${id}`);
        } catch (err) {
          setError('Không thể unblock tin người dùng. Vui lòng thử lại.');
          console.log(err);
        }
      }
      setStatus((prev) => !prev);
      console.log('Toggle Status for user:', id, 'New Status:', !status);
      // TODO: Gọi API block/unblock
    } else if (actionType === 'updateRole') {
      setSelectedRole(actionPayload);
      console.log('Update Role for user:', id, 'New Role:', actionPayload);
      // TODO: Gọi API cập nhật vai trò
    }

    setIsModalOpen(false);
    setReason('')
  };

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
    }

    if (showRoleDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRoleDropdown]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isReasonModalOpen && reasonModalRef.current && !reasonModalRef.current.contains(event.target)) {
        setIsReasonModalOpen(false);
        setReason('');
      }
    }

    if (isReasonModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isReasonModalOpen]);


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Thông tin người dùng</h3>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <p className="mb-2"><strong>Tên:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-4"><strong>Trạng thái:</strong> {status ? 'unblock' : 'block'}</p>
          <p className="mb-4"><strong>Vai trò hiện tại:</strong> {selectedRole}</p>
          <div className="flex space-x-4">
            <div className="relative" ref={dropdownRef}>
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
                      onClick={() => handleAskConfirmUpdateRole(role)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleAskConfirmToggleStatus}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              {status ? 'Block' : 'Unblock'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal nhập lý do block */}
      {isReasonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div ref={reasonModalRef} className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Nhập lý do chặn</h3>
            <input
              id="reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập lý do..."
            />
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={() => {
                  setIsReasonModalOpen(false);
                  setReason('');
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (!reason.trim()) return alert('Vui lòng nhập lý do!');
                  setIsReasonModalOpen(false);
                  setIsModalOpen(true); // mở modal xác nhận
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal xác nhận dùng chung */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Xác nhận</h3>
            <p className="mb-6">Bạn có chắc chắn muốn {pendingStatus} người dùng này không?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setReason('');
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
