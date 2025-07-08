'use client';

import { useState } from 'react';
import api from '../../utils/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.put('/auth/forgetpassword', { email});
      setSuccess('Đổi mật khẩu thành công. Vui lòng kiểm tra email của bạn!');
      // Chuyển hướng sau 1 giây
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Nhập email của bạn</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Lấy mật khẩu mới
          </button>
        </form>
      </div>
    </div>
  );
}