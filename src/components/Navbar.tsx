'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">E-Shop</Link>
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-400">Home</Link>
        <Link href="/checkout" className="hover:text-gray-400">Checkout</Link>
        <Link href="/orders" className="hover:text-gray-400">Orders</Link>
      </div>
    </nav>
  );
}
