'use client'; // এই লাইনটা অবশ্যই দিতে হবে

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  console.log("Orders from Redux:", orders); // Debug

  if (!orders || orders.length === 0) {  // Null safe check
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-semibold">No orders found.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Order ID</th>
            <th className="p-3 border-b">Customer Name</th>
            <th className="p-3 border-b">Total Items</th>
            <th className="p-3 border-b">Total Amount</th>
            <th className="p-3 border-b">Order Date</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{order.id}</td>
              <td className="p-3 border-b">{order.customerName}</td>
              <td className="p-3 border-b">
                {order.items.reduce((acc, i) => acc + i.quantity, 0)}
              </td>
              <td className="p-3 border-b">${order.totalAmount.toFixed(2)}</td>
              <td className="p-3 border-b">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="p-3 border-b">
                <button
                  onClick={() =>
                    setSelectedOrder(selectedOrder === order.id ? null : order.id)
                  }
                  className="text-blue-600 hover:underline"
                >
                  {selectedOrder === order.id ? "Hide" : "View"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Order Details</h2>
          {orders
            .find((o) => o.id === selectedOrder)
            ?.items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
