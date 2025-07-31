"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck, CreditCard, Truck, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Services Banner */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <Truck className="h-6 w-6 text-indigo-400" />
            <div>
              <h4 className="font-medium text-white">Free Shipping</h4>
              <p className="text-xs text-gray-400">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCard className="h-6 w-6 text-indigo-400" />
            <div>
              <h4 className="font-medium text-white">Secure Payment</h4>
              <p className="text-xs text-gray-400">100% protected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-6 w-6 text-indigo-400" />
            <div>
              <h4 className="font-medium text-white">2-Year Warranty</h4>
              <p className="text-xs text-gray-400">Guaranteed quality</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Headphones className="h-6 w-6 text-indigo-400" />
            <div>
              <h4 className="font-medium text-white">24/7 Support</h4>
              <p className="text-xs text-gray-400">Dedicated service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">E-<span className="text-indigo-400">Shop</span></h2>
            <p className="text-gray-400">
              Premium electronics and gadgets for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition">Shop</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition">Return Policy</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe for updates and exclusive offers</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md text-white transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 md:px-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition">Terms of Service</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}