"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="h-full flex flex-col p-4">
          <h2 className="text-xl font-bold mb-8 hidden md:block">
            <Link href="/">Dashboard</Link>
          </h2>
          <nav className="flex flex-col gap-4">
            <Link href="/dashboard" className="hover:text-blue-600">
              Overview
            </Link>
            <Link href="/dashboard/orders" className="hover:text-blue-600">
              Orders
            </Link>
            <Link href="/dashboard/products" className="hover:text-blue-600">
              Products
            </Link>
            <Link href="/dashboard/users" className="hover:text-blue-600">
              Users
            </Link>
          </nav>
          <div className="mt-auto">
            <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay when sidebar open on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
