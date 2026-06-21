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
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorFields([]);
    if (cart.length === 0) return;

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("দয়া করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)।");
      setErrorFields(["phone"]);
      return;
    }

    const nameStr = formData.name.trim();
    if (nameStr.length < 4 || /(.)\1{2,}/.test(nameStr)) {
      setError("দয়া করে আপনার সঠিক নাম লিখুন (ভুল বা হাবিজাবি নাম গ্রহণযোগ্য নয়)।");
      setErrorFields(["name"]);
      return;
    }

    const addressStr = formData.address.trim();
    if (addressStr.length < 10 || !/\s/.test(addressStr) || /(.)\1{3,}/.test(addressStr)) {
      setError("দয়া করে আপনার সম্পূর্ণ ও সঠিক ঠিকানা বিস্তারিতভাবে লিখুন (যেমন: বাসা নং, এলাকা)।");
      setErrorFields(["address"]);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSuccess(true);
    setIsSubmitting(false);
    clearCart();
  };

  if (success) {
    return (
      <div className="max-w-sm mx-auto my-10 p-6 bg-white rounded-xl shadow-lg text-center border-t-4 border-[#319b03]">
        <div className="w-16 h-16 bg-[#f0fdf4] text-[#319b03] rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-check text-3xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-[#00276c] mb-3">অর্ডারটি সফল হয়েছে!</h1>
        <p className="text-gray-600 mb-6 text-sm">আমাদের প্রতিনিধি খুব শীঘ্রই আপনাকে কল করে অর্ডারটি কনফার্ম করবেন।</p>
        <Link href="/" className="inline-block px-6 py-3 bg-[#319b03] text-white font-bold rounded-lg hover:bg-[#277c02] transition-colors text-sm">
          আরও শপিং করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-2 px-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* ডেলিভারি ইনফরমেশন হেডার + কার্ট আইটেম */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-100">
          <h2 className="text-sm font-bold text-[#292930] flex items-center gap-2 mb-3">
            <i className="fa-solid fa-truck-fast text-[#319b03]"></i> ডেলিভারি ইনফরমেশন
          </h2>

          {/* কার্ট আইটেম - একদম উপরে */}
          {cart.length > 0 && (
            <div className="space-y-2 mb-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100 items-center">
                  <img src={item.image} alt={item.name} className="w-11 h-11 object-cover rounded-md bg-white flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-medium text-gray-800 truncate">{item.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-bold text-[#319b03] text-xs">৳{item.price}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white border border-gray-200 rounded text-xs">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-0.5 text-gray-500 hover:text-black">-</button>
                          <span className="px-1.5 font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-0.5 text-gray-500 hover:text-black">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                          <i className="fa-solid fa-times text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* ফর্ম ফিল্ড */}
          <div className="px-4 pt-3 pb-2 space-y-3">

            {/* নাম */}
            <div>
              <label className={`block text-xs font-bold mb-1 ${errorFields.includes("name") ? "text-red-500" : "text-gray-700"}`}>আপনার নাম *</label>
              <input
                type="text"
                required
                placeholder="সম্পূর্ণ নাম লিখুন"
                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-colors ${errorFields.includes("name") ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-[#319b03] focus:bg-white"}`}
                value={formData.name}
                onChange={(e) => { setFormData({...formData, name: e.target.value}); setErrorFields(errorFields.filter(f => f !== 'name')); setError(''); }}
              />
            </div>

            {/* মোবাইল */}
            <div>
              <label className={`block text-xs font-bold mb-1 ${errorFields.includes("phone") ? "text-red-500" : "text-gray-700"}`}>মোবাইল নাম্বার *</label>
              <input
                type="tel"
                required
                placeholder="01XXXXXXXXX"
                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-colors ${errorFields.includes("phone") ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-[#319b03] focus:bg-white"}`}
                value={formData.phone}
                onChange={(e) => { setFormData({...formData, phone: e.target.value}); setErrorFields(errorFields.filter(f => f !== 'phone')); setError(''); }}
              />
            </div>

            {/* ঠিকানা */}
            <div>
              <label className={`block text-xs font-bold mb-1 ${errorFields.includes("address") ? "text-red-500" : "text-gray-700"}`}>সম্পূর্ণ ঠিকানা *</label>
              <textarea
                required
                placeholder="বাসা নং, রোড নং, এলাকা, থানা, জেলা"
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-colors resize-none ${errorFields.includes("address") ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-[#319b03] focus:bg-white"}`}
                value={formData.address}
                onChange={(e) => { setFormData({...formData, address: e.target.value}); setErrorFields(errorFields.filter(f => f !== 'address')); setError(''); }}
              />
            </div>

            {/* ডেলিভারি এরিয়া */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">ডেলিভারি এরিয়া *</label>
              <div className="grid grid-cols-2 gap-2">
                <label className={`cursor-pointer border px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${formData.delivery_area === 'dhaka' ? 'border-[#319b03] bg-[#f0fdf4]' : 'border-gray-200 bg-gray-50'}`}>
                  <input type="radio" name="area" className="accent-[#319b03]" checked={formData.delivery_area === 'dhaka'} onChange={() => setFormData({...formData, delivery_area: 'dhaka'})} />
                  <span className="font-medium text-xs">ঢাকার ভেতরে (৳৬০)</span>
                </label>
                <label className={`cursor-pointer border px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${formData.delivery_area === 'outside' ? 'border-[#319b03] bg-[#f0fdf4]' : 'border-gray-200 bg-gray-50'}`}>
                  <input type="radio" name="area" className="accent-[#319b03]" checked={formData.delivery_area === 'outside'} onChange={() => setFormData({...formData, delivery_area: 'outside'})} />
                  <span className="font-medium text-xs">ঢাকার বাইরে (৳১২০)</span>
                </label>
              </div>
            </div>

          </div>

          {/* এরর মেসেজ */}
          {error && (
            <div className="mx-4 mb-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg flex items-start gap-2 border border-red-200 text-xs">
              <i className="fa-solid fa-triangle-exclamation mt-0.5 flex-shrink-0"></i>
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* অর্ডার বাটন */}
          <div className="px-4 pb-3">
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-3 bg-[#00276c] text-white rounded-lg font-bold text-sm hover:bg-[#001f55] transition-colors shadow-md disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>অর্ডার সাবমিট হচ্ছে <i className="fa-solid fa-spinner fa-spin"></i></>
              ) : (
                <>অর্ডার কনফার্ম করুন <i className="fa-solid fa-arrow-right"></i></>
              )}
            </button>
          </div>

          {/* ক্যাশ অন ডেলিভারি নোট */}
          <div className="mx-4 mb-3 bg-blue-50 text-blue-800 px-3 py-2 rounded-lg flex items-start gap-2 text-xs">
            <i className="fa-solid fa-circle-info mt-0.5 flex-shrink-0"></i>
            <p>ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে পেমেন্ট করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।</p>
          </div>

          {/* সাবটোটাল / সর্বমোট */}
          <div className="mx-4 mb-4 space-y-1.5 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-600">
              <span>সাবটোটাল</span>
              <span className="font-medium">৳{cartTotal}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-medium">৳{cart.length > 0 ? deliveryCharge : 0}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#00276c] pt-1.5 border-t border-gray-200">
              <span>সর্বমোট</span>
              <span>৳{cart.length > 0 ? grandTotal : 0}</span>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
