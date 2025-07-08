'use client';

import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import Image from 'next/image';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // Kiểm tra trạng thái đăng nhập khi component được mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Gọi API để lấy thông tin người dùng từ token
          const response = await api.get('/auth/getuserbytoken');
          setUser(response.data);
          setIsLoggedIn(true);
          setIsAdmin(response.data.role === 'admin');
        } catch (err) {
          console.error('Lỗi khi lấy thông tin người dùng:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          document.cookie = 'token=; path=/; max-age=0';
          document.cookie = 'refreshToken=; path=/; max-age=0';
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      }
    };
    checkLoginStatus();
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
    <header className="bg-blue-600 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-commerce App</h1>
        <nav className="flex items-center space-x-4">
          <a href="/" className="hover:underline">Trang chủ</a>
          <a href="/cart" className="hover:underline">Giỏ hàng</a>
          {isAdmin && (
            <a href="/admin" className="hover:underline">Quản trị</a>
          )}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <Image
                    src={user?.avatar || '/default-avatar.png'}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
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
          ) : (
            <>
              <a href="/login" className="hover:underline">Đăng nhập</a>
              <a href="/register" className="hover:underline">Đăng ký</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}