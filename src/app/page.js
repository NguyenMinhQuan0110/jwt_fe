'use client';

import Header from '../components/Header';

const mockProducts = [
  { id: 1, name: 'Sản phẩm 1', price: 100000, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sản phẩm 2', price: 200000, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Sản phẩm 3', price: 150000, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Sản phẩm 4', price: 300000, image: 'https://via.placeholder.com/150' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Danh sách sản phẩm</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <a href={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
              </a>
              <p className="text-gray-600">{product.price.toLocaleString('vi-VN')} VNĐ</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}