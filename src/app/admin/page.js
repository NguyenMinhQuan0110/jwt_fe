'use client';

import Sidebar from '../../components/Sidebar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data cho biểu đồ lượt truy cập
const chartData = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'Lượt truy cập',
      data: [1200, 1900, 1500, 2200, 1800, 2500],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Thống kê lượt truy cập' },
  },
};

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Tổng quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Tổng lượt truy cập</h3>
            <p className="text-2xl font-bold text-blue-600">12,345</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Doanh thu tháng này</h3>
            <p className="text-2xl font-bold text-blue-600">150,000,000 VNĐ</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Số đơn hàng</h3>
            <p className="text-2xl font-bold text-blue-600">567</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}