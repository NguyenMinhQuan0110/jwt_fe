'use client';

import api from '@/utils/api';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]=  useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
        setError("Mật khẩu không khớp")
        return
    }else{
        setError('')
        try {
        const response = await api.post('/auth/register', { name,email, password });
        setSuccess(response.data.message || 'Đăng kí tài khoản thành công!');
        // Chuyển hướng sau 1 giây
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
        } catch (err) {
        const errorMessage = err.response?.data?.message || 'Đăng kí thất bại. Vui lòng thử lại.';
        setError(errorMessage);
        }

    }
    // Logic đăng ký sẽ được thêm sau khi kết nối backend
    console.log('Name:', name, 'Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Xác nhận mật khẩu"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Đăng Ký
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}