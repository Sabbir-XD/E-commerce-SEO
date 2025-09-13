"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "@/redux/cartSlice";
import AddToCartButton from "./AddToCartButton";
import Swal from "sweetalert2";

type ProductCardProps = Pick<
  Product,
  "id" | "title" | "price" | "image" | "rating" | "category"
> & {
  onAddToCart?: (id: number) => void;
  className?: string; // <-- Added this
};

export default function ProductCard({
  id,
  title,
  price,
  image,
  rating,
  category,
  onAddToCart,
  className,
}: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setLoading(true);
    dispatch(addToCart({ id, title, price, image, quantity: 1 }));
    setTimeout(() => setLoading(false), 300);
    Swal.fire({
      icon: "success",
      title: `${title} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <motion.div
      className={`group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 ${
        className || ""
      }`}
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
        {/* Hover Buttons */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-2">
          <motion.button
            className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart && onAddToCart(id)}
          >
            <ShoppingCart onClick={handleAdd} disabled={loading} size={20} />
          </motion.button>
          <Link href={`/product/${id}`}>
            <motion.button
              className="bg-white text-orange-600 p-3 rounded-full shadow-lg"
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
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-2">{category}</p>

        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(rating.rate) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating.count})</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-orange-600">
            ${price.toFixed(2)}
          </span>
          <Link
            href={`/product/${id}`}
            className="md:hidden text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1"
          >
            <Eye size={16} />
            View
          </Link>
        </div>

        {/* Mobile Add to Cart */}
        <AddToCartButton id={id} title={title} price={price} image={image} />
      </div>
    </motion.div>
  );
}
