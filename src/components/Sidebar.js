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

  // Xử lý đăng xuất
    const handleLogout = async () => {
      try {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false);
        window.location.href = '/';
      } catch (err) {
        console.error('Lỗi khi đăng xuất:', err);
      }
    };

  // Toggle dropdown menu
  const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 fixed top-0 left-0 overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block p-2 rounded-md hover:bg-gray-700">Tổng quan</a>
          <a href="/admin/products" className="block p-2 rounded-md hover:bg-gray-700">Quản lý sản phẩm</a>
          <a href="/admin/users" className="block p-2 rounded-md hover:bg-gray-700">Quản lý người dùng</a>
          <a href="/admin/orders" className="block p-2 rounded-md hover:bg-gray-700">Quản lý đơn hàng</a>
          <a href="/" className="block p-2 rounded-md hover:bg-gray-700">Quay lại trang chủ</a>
        </nav>
      </div>
      
      {/* Thông tin người dùng ở dưới cùng */}
      {user && (
        <div className="mt-6 pt-4 border-t border-gray-600 flex items-center space-x-3" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="flex items-center space-x-3 w-full text-left focus:outline-none">
            <Image
              src={user?.avatar || '/default-avatar.png'}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
            </div>
          </button>
          {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 border border-gray-300 rounded-md shadow-lg z-10">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-blue-100"
                  >
                    Cài đặt
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
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