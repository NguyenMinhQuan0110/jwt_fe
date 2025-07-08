'use client';

import Sidebar from '../../../components/Sidebar';
import { useState } from 'react';

// Mock data cho sản phẩm
const mockProducts = [
  { id: 1, name: 'Sản phẩm 1', price: 100000, stock: 50 },
  { id: 2, name: 'Sản phẩm 2', price: 200000, stock: 30 },
  { id: 3, name: 'Sản phẩm 3', price: 150000, stock: 20 },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(mockProducts);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Quản lý sản phẩm</h2>
        <a
          href="/admin/products/add"
          className="mb-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Thêm sản phẩm
        </a>
        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Tên sản phẩm</th>
                <th className="p-3 text-left">Giá</th>
                <th className="p-3 text-left">Tồn kho</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.price.toLocaleString('vi-VN')} VNĐ</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">
                    <a href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:underline mr-4">
                      Sửa
                    </a>
                    <button
                      onClick={() => handleDelete(product.id)}
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
    </div>
  );
}