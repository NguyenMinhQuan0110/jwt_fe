'use client';

import Header from '../../components/Header';

// Mock data cho đơn hàng
const mockCartItems = [
  { id: 1, name: 'Sản phẩm 1', price: 100000, quantity: 2 },
  { id: 2, name: 'Sản phẩm 2', price: 200000, quantity: 1 },
];

export default function CheckoutPage() {
  const totalPrice = mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic thanh toán sẽ được thêm sau khi kết nối backend
    console.log('Đặt hàng thành công!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Thanh Toán</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form thông tin thanh toán */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Thông tin thanh toán</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập địa chỉ"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phương thức thanh toán
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      className="mr-2"
                      defaultChecked
                    />
                    Thanh toán khi nhận hàng
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      className="mr-2"
                    />
                    Thẻ tín dụng
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Đặt Hàng
              </button>
            </form>
          </div>
          {/* Tóm tắt đơn hàng */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h3>
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>{(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ</span>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">
                Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VNĐ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}