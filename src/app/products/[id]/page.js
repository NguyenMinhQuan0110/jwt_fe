'use client';

import Header from '../../../components/Header';
import { useParams } from 'next/navigation';

// Mock data cho sản phẩm
const mockProduct = {
  id: 1,
  name: 'Sản phẩm 1',
  price: 100000,
  description: 'Đây là mô tả chi tiết của sản phẩm 1. Sản phẩm này có chất lượng cao và phù hợp với mọi nhu cầu.',
  image: 'https://via.placeholder.com/300',
};

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8 pt-30">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={mockProduct.image}
                alt={mockProduct.name}
                className="w-full h-96 object-cover rounded-md"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{mockProduct.name}</h2>
              <p className="text-xl text-gray-600 mb-4">
                {mockProduct.price.toLocaleString('vi-VN')} VNĐ
              </p>
              <p className="text-gray-700 mb-6">{mockProduct.description}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}