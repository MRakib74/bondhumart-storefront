"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    delivery_area: "dhaka",
  });

  const deliveryCharge = formData.delivery_area === 'dhaka' ? 60 : 120;
  const grandTotal = cartTotal + deliveryCharge;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (cart.length === 0) return;

    // Advanced Validation Rules
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("দয়া করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)।");
      return;
    }
    
    const nameStr = formData.name.trim();
    if (nameStr.length < 4 || /(.)\1{2,}/.test(nameStr)) {
      setError("দয়া করে আপনার সঠিক নাম লিখুন (ভুল বা হাবিজাবি নাম গ্রহণযোগ্য নয়)।");
      return;
    }
    
    const addressStr = formData.address.trim();
    if (addressStr.length < 10 || !/\s/.test(addressStr) || /(.)\1{3,}/.test(addressStr)) {
      setError("দয়া করে আপনার সম্পূর্ণ ও সঠিক ঠিকানা বিস্তারিতভাবে লিখুন (যেমন: বাসা নং, এলাকা)।");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate Superfast API call (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Placeholder for actual Laravel API integration
    
    setSuccess(true);
    setIsSubmitting(false);
    clearCart(); // Clear cart after successful order
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto my-20 p-8 bg-white rounded-xl shadow-lg text-center border-t-4 border-[#319b03]">
        <div className="w-20 h-20 bg-[#f0fdf4] text-[#319b03] rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-check text-4xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-[#00276c] mb-4">অর্ডারটি সফল হয়েছে!</h1>
        <p className="text-gray-600 mb-8 text-lg">আমাদের প্রতিনিধি খুব শীঘ্রই আপনাকে কল করে অর্ডারটি কনফার্ম করবেন।</p>
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-[#319b03] text-white font-bold rounded-lg hover:bg-[#277c02] transition-colors"
        >
          আরও শপিং করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-8 text-[#00276c] border-b pb-4">নিরাপদ চেকআউট</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Form */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-[#292930] flex items-center gap-2">
              <i className="fa-solid fa-truck-fast text-[#319b03]"></i> ডেলিভারি ইনফরমেশন
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">আপনার নাম *</label>
                <input 
                  type="text" 
                  required
                  placeholder="সম্পূর্ণ নাম লিখুন"
                  className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#319b03] transition-colors bg-gray-50 focus:bg-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">মোবাইল নাম্বার *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#319b03] transition-colors bg-gray-50 focus:bg-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">ডেলিভারি এরিয়া *</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer border p-3 rounded-lg flex items-center gap-2 transition-colors ${formData.delivery_area === 'dhaka' ? 'border-[#319b03] bg-[#f0fdf4]' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
                    <input 
                      type="radio" 
                      name="area" 
                      className="accent-[#319b03] w-4 h-4"
                      checked={formData.delivery_area === 'dhaka'}
                      onChange={() => setFormData({...formData, delivery_area: 'dhaka'})}
                    />
                    <span className="font-medium text-sm">ঢাকার ভেতরে (৳৬০)</span>
                  </label>
                  <label className={`cursor-pointer border p-3 rounded-lg flex items-center gap-2 transition-colors ${formData.delivery_area === 'outside' ? 'border-[#319b03] bg-[#f0fdf4]' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
                    <input 
                      type="radio" 
                      name="area" 
                      className="accent-[#319b03] w-4 h-4"
                      checked={formData.delivery_area === 'outside'}
                      onChange={() => setFormData({...formData, delivery_area: 'outside'})}
                    />
                    <span className="font-medium text-sm">ঢাকার বাইরে (৳১২০)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">সম্পূর্ণ ঠিকানা *</label>
                <textarea 
                  required
                  placeholder="বাসা নং, রোড নং, এলাকা, থানা, জেলা"
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#319b03] transition-colors bg-gray-50 focus:bg-white resize-none"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start gap-3 mt-4">
                <i className="fa-solid fa-circle-info mt-1"></i>
                <p className="text-sm">ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে পেমেন্ট করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।</p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3 mt-4 border border-red-200">
                  <i className="fa-solid fa-triangle-exclamation mt-1"></i>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 mt-6 bg-[#00276c] text-white rounded-lg font-bold text-lg hover:bg-[#001f55] transition-colors shadow-md disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>অর্ডার সাবমিট হচ্ছে <i className="fa-solid fa-spinner fa-spin"></i></>
                ) : (
                  <>অর্ডার কনফার্ম করুন <i className="fa-solid fa-arrow-right"></i></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Cart Items */}
        <div className="w-full lg:w-2/5">
          <div className="bg-[#f8f9fa] rounded-xl p-6 border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-[#292930]">আপনার কার্ট ({cart.length} আইটেম)</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 my-8">কার্ট খালি!</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white p-3 rounded-lg border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-gray-50" />
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-[#319b03]">৳{item.price}</span>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 text-gray-500 hover:text-black">-</button>
                          <span className="text-xs px-2 font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 text-gray-500 hover:text-black">+</button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>সাবটোটাল</span>
                <span className="font-medium">৳{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-medium">৳{cart.length > 0 ? (formData.delivery_area === 'dhaka' ? 60 : 120) : 0}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#00276c] pt-3 border-t border-gray-200">
                <span>সর্বমোট</span>
                <span>৳{cart.length > 0 ? cartTotal + (formData.delivery_area === 'dhaka' ? 60 : 120) : 0}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
