'use client';

import Link from "next/link";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 via-purple-100 to-pink-100 px-4 text-center">
      <AlertTriangle className="text-red-500 w-20 h-20 mb-6 animate-pulse" strokeWidth={1.5} />
      
      <h1 className="text-7xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
      <p className="max-w-md mx-auto mb-8 text-gray-700">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-orange-600 text-white text-lg font-semibold hover:bg-orange-700 transition"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-6 py-3 rounded-full border border-orange-600 text-orange-600 text-lg font-semibold hover:bg-orange-50 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
}
