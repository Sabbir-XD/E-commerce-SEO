'use client';

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { clearCart } from "../../redux/cartSlice";
import { placeOrder } from "../../redux/ordersSlice";
import { useState } from "react";

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(phone)) newErrors.phone = "Invalid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newOrder = {
      id: Date.now().toString(),
      name,
      address,
      phone,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };

    dispatch(placeOrder(newOrder));
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <ul className="mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span>{item.title} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="font-bold text-lg mb-6">Total: ${total.toFixed(2)}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
