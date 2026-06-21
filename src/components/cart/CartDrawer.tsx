"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[10000] transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] max-w-[85vw] bg-white z-[10001] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#00276c]">Shopping Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <i className="fa-solid fa-cart-shopping text-5xl"></i>
              <p>Your cart is empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-[#319b03] text-white rounded-full font-bold hover:bg-[#277c02] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-white"
                />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</h3>
                    <div className="text-[#319b03] font-bold mt-1">৳{item.price}</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Control */}
                    <div className="flex items-center bg-white border border-gray-200 rounded-md">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#00276c]"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#00276c]"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                    {/* Remove Item */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between mb-4 text-lg font-bold">
              <span>Subtotal:</span>
              <span className="text-[#319b03]">৳{cartTotal}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 bg-[#00276c] text-white text-center rounded-lg font-bold text-lg hover:bg-[#001f55] transition-colors"
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
