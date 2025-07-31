'use client'

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Eye, Star } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export default function ProductCard({ id, title, price, image, rating }: Product) {
  return (
    <motion.div 
      className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Hover Overlay Buttons */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={20} />
          </motion.button>
          
          <Link href={`/product/${id}`}>
            <motion.button
              className="bg-white text-indigo-600 p-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={20} />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">{title}</h3>
        
        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.round(rating.rate) ? 'currentColor' : 'none'} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating.count})</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">${price}</span>
          
          {/* Mobile View Button (hidden on desktop) */}
          <Link 
            href={`/product/${id}`}
            className="md:hidden text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
          >
            <Eye size={16} />
            View
          </Link>
        </div>

        {/* Quick Add Button (mobile only) */}
        <button className="mt-3 w-full md:hidden bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}