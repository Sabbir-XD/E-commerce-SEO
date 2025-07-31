'use client';

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { clearCart } from "@/redux/cartSlice";

interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  orderDate: string;
}

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderPlaced, setOrderPlaced] = useState<Order | null>(null);

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Full Name is required";
    if (!address.trim()) newErrors.address = "Shipping Address is required";
    if (!phone.trim()) newErrors.phone = "Phone Number is required";
    else if (!/^\d{10,15}$/.test(phone)) newErrors.phone = "Invalid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Create order object
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: name,
      address,
      phone,
      items: cartItems,
      totalAmount,
      orderDate: new Date().toISOString(),
    };

    // Save order in Redux (we need orderSlice for that)
    dispatch({ type: "orders/addOrder", payload: newOrder });

    // Clear cart
    dispatch(clearCart());

    // Show thank you
    setOrderPlaced(newOrder);

    // Reset form
    setName("");
    setAddress("");
    setPhone("");
    setErrors({});
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p>Your order ID is <strong>{orderPlaced.id}</strong></p>
        <p>We will ship to: {orderPlaced.address}</p>
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
    <div className="container mx-auto px-6 py-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>
        <ul className="divide-y divide-gray-300">
          {cartItems.map((item) => (
            <li key={item.id} className="py-2 flex justify-between">
              <span>{item.title} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-lg">Total: ${totalAmount.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block font-semibold mb-1">
            Shipping Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && <p className="text-red-600 mt-1">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
