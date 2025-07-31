'use client';

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AppDispatch } from "../redux/store";
import { useState } from "react";

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
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
