'use client';

import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: Product) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
      <Image 
        src={image} 
        alt={title} 
        width={200} 
        height={200} 
        className="object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-center line-clamp-2">{title}</h2>
      <p className="text-xl font-bold text-green-600 my-2">${price}</p>
      <Link
        href={`/product/${id}`}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
}
