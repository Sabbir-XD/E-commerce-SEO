"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AppDispatch } from "../redux/store";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Props {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ id, title, price, image }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setLoading(true);
    dispatch(addToCart({ id, title, price, image, quantity: 1 }));
    setTimeout(() => setLoading(false), 300);
    alert(`${title} added to cart!`);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="mt-3 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition"
    >
      <ShoppingCart size={16} />

      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
