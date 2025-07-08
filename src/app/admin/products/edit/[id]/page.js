'use client';

import Sidebar from '../../../../../components/Sidebar';
import { useState } from 'react';
import { useParams } from 'next/navigation';

// Mock data cho sản phẩm
const mockProduct = {
  id: 1,
  name: 'Sản phẩm 1',
  price: 100000,
  stock: 50,
  description: 'Đây là mô tả chi tiết của sản phẩm 1.',
  image: 'https://via.placeholder.com/150',
};

export default function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState(mockProduct.name);
  const [price, setPrice] = useState(mockProduct.price);
  const [stock, setStock] = useState(mockProduct.stock);
  const [description, setDescription] = useState(mockProduct.description);
  const [image, setImage] = useState(mockProduct.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic sửa sản phẩm sẽ được thêm sau khi kết nối backend
    console.log('Updated Product:', { id, name, price, stock, description, image });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Sửa sản phẩm</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Giá (VNĐ)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập giá"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Tồn kho
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số lượng tồn kho"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Mô tả
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mô tả sản phẩm"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                URL hình ảnh
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập URL hình ảnh"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Cập nhật sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}