'use client';

import Header from '../../components/Header';
import { useState } from 'react';

// Mock data cho giỏ hàng
const mockCartItems = [
  { id: 1, name: 'Sản phẩm 1', price: 100000, quantity: 2, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Sản phẩm 2', price: 200000, quantity: 1, image: 'https://via.placeholder.com/100' },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Giỏ Hàng</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 border border-gray-300 rounded-md text-center"
                    min="1"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-xl font-bold">
                Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VNĐ
              </p>
              <a
                    href="/checkout"
                    className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Tiến hành thanh toán
            </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}