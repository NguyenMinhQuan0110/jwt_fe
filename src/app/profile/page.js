'use client';

import Header from '@/components/Header';
import api from '@/utils/api';
import { useEffect, useState } from 'react';

export default function EditUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [infoError, setInfoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [infoSuccess, setInfoSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [userId, setUserId]=useState('');

  // Lấy thông tin người dùng khi component được mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/getuserbytoken');
        const { id, name, email } = response.data;
        setUserId(id);
        setName(name);
        setEmail(email);
      } catch (err) {
        setInfoError('Không thể tải thông tin người dùng. Vui lòng thử lại.');
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setInfoError('');
    setInfoSuccess('');
    
    if (!name.trim() || !email.trim()) {
      setInfoError('Vui lòng điền đầy đủ tên và email');
      return;
    }

    try {
      const response = await api.put('/users/userupdate', {
        id: userId,
        name,
        email,
      });
      setInfoSuccess('Cập nhật thông tin thành công!');
      // Cập nhật lại state với dữ liệu mới
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Cập nhật thông tin thất bại. Vui lòng thử lại.';
      setInfoError(errorMessage);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmNewPassword) {
      setPasswordError('Mật khẩu mới không khớp');
      return;
    }

    if (!currentPassword.trim() || !newPassword.trim()) {
      setPasswordError('Vui lòng điền đầy đủ mật khẩu hiện tại và mật khẩu mới');
      return;
    }

    try {
      const response = await api.put('/users/setpassword', {
        id: userId,
        oldpassword: currentPassword,
        newpassword: newPassword,
      });
      setPasswordSuccess(response.data.message || 'Đổi mật khẩu thành công!');
      // Xóa các trường mật khẩu sau khi đổi thành công
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.';
      setPasswordError(errorMessage);
    }
  };

  return (
    <div>
      <Header/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Chỉnh Sửa Thông Tin</h2>

          {/* Form cập nhật thông tin */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Cập nhật thông tin cá nhân</h3>
            {infoError && <p className="text-red-500 text-sm mb-4">{infoError}</p>}
            {infoSuccess && <p className="text-green-500 text-sm mb-4">{infoSuccess}</p>}
            <form onSubmit={handleInfoSubmit}>
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
                  // required
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
                  // required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Cập nhật thông tin
              </button>
            </form>
          </div>

          {/* Form đổi mật khẩu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
            {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
            {passwordSuccess && <p className="text-green-500 text-sm mb-4">{passwordSuccess}</p>}
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu hiện tại"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  id="confirm-new-password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}