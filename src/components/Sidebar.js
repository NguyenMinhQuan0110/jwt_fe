'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import api from '../utils/api';

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/auth/getuserbytoken');
          setUser(response.data);
        } catch (err) {
          console.error('Lỗi khi lấy thông tin người dùng:', err);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    } catch (err) {
      console.error('Lỗi khi đăng xuất:', err);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 flex flex-col justify-between">
      {/* Nội dung menu: cuộn được */}
      <div className="p-4 overflow-y-auto flex-1">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block p-2 rounded-md hover:bg-gray-700">Tổng quan</a>
          <a href="/admin/products" className="block p-2 rounded-md hover:bg-gray-700">Quản lý sản phẩm</a>
          <a href="/admin/users" className="block p-2 rounded-md hover:bg-gray-700">Quản lý người dùng</a>
          <a href="/admin/orders" className="block p-2 rounded-md hover:bg-gray-700">Quản lý đơn hàng</a>
          <a href="/" className="block p-2 rounded-md hover:bg-gray-700">Quay lại trang chủ</a>
        </nav>
      </div>

      {/* Avatar + tên cố định dưới cùng */}
      {user && (
        <div className="p-4 border-t border-gray-700 relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-3 w-full text-left focus:outline-none"
          >
            <Image
              src={user?.avatar || '/default-avatar.png'}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium">{user.name}</span>
          </button>

          {showDropdown && (
            <div className="absolute bottom-14 left-4 w-48 bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg z-50">
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Cài đặt</a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
