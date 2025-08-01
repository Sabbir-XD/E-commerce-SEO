'use client';

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { Package, ChevronDown, ChevronUp, CalendarDays, User, ListOrdered, DollarSign, Truck, CreditCard, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 mb-4">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h1>
          <p className="text-gray-600 mb-6">Your order history will appear here once you make purchases.</p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <ListOrdered className="h-8 w-8 text-orange-600" />
              Order History
            </h1>
            <p className="text-gray-500 mt-1">{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
          </div>
        </div>

        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div 
                className="p-5 cursor-pointer"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-50 p-2.5 rounded-lg flex-shrink-0">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id.slice(-8).toUpperCase()}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1.5 text-sm text-gray-500">
                        <span className="flex items-center">
                          <CalendarDays className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {order.orderDate ? new Date(order.orderDate).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </span>
                        <span className="flex items-center">
                          <User className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {order.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold text-lg text-blue-600">${order.totalAmount?.toFixed(2)}</p>
                    </div>
                    <div className="text-gray-400">
                      {expandedOrders[order.id] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {expandedOrders[order.id] && (
                <div className="border-t border-gray-200 px-5 py-4 bg-gray-50/50">
                  <div className="mb-5">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-500">
                      <span className="w-4 h-0.5 bg-gray-300 mt-0.5"></span>
                      Order Items
                    </h4>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 64px) 100vw"
                                className="object-contain p-1"
                                quality={80}
                                priority={false}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Truck className="h-5 w-5 text-gray-500" />
                        Shipping Details
                      </h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p className="font-medium">{order.name}</p>
                        <p className="text-gray-500">{order.address}</p>
                        <p className="text-gray-500">{order.phone}</p>
                        {order.email && <p className="text-gray-500">{order.email}</p>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                        Payment Summary
                      </h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal</span>
                          <span>${order.totalAmount?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span>${order.totalAmount?.toFixed(2)}</span>
                        </div>
                        <div className="pt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-200 flex justify-end">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                      Need Help?
                    </button>
                    <button className="ml-3 px-4 py-2 bg-orange-600 rounded-lg text-sm font-medium text-white hover:bg-orange-700 transition shadow-sm">
                      Reorder
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}