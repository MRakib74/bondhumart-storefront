"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart, CartItem } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  // "Buy Now" direct order item (from Order Now button, NOT added to cart)
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("bondhumart_buynow");
    if (stored) {
      try {
        setBuyNowItem(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    delivery_area: "dhaka",
  });

  const deliveryCharge = formData.delivery_area === 'dhaka' ? 60 : 120;

  // Order items = buyNowItem (if direct order) OR cart items
  const orderItems: CartItem[] = buyNowItem ? [buyNowItem] : cart;
  const orderTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = orderTotal + deliveryCharge;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const [buyNowQuantity, setBuyNowQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorFields([]);
    if (orderItems.length === 0) return;

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
    sessionStorage.removeItem("bondhumart_buynow");
    if (!buyNowItem) clearCart();
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
    <div className="max-w-5xl mx-auto my-4 px-3">
      {/* flex-col-reverse makes Cart Items appear first on Mobile, but lg:flex-row keeps them on the right on Desktop */}
      <div className="flex flex-col-reverse lg:flex-row gap-5">

        {/* Left: Form */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* হেডার */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-[#292930] flex items-center gap-2">
                <i className="fa-solid fa-truck-fast text-[#319b03]"></i> ডেলিভারি ইনফরমেশন
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-4 pt-3 pb-2 space-y-3">

                {/* নাম */}
                <div>
                  <label className={`block text-xs font-bold mb-1 ${errorFields.includes("name") ? "text-red-500" : "text-gray-700"}`}>আপনার নাম *</label>
                  <input
                    type="text" required placeholder="সম্পূর্ণ নাম লিখুন"
                    className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-colors ${errorFields.includes("name") ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-[#319b03] focus:bg-white"}`}
                    value={formData.name}
                    onChange={(e) => { setFormData({...formData, name: e.target.value}); setErrorFields(errorFields.filter(f => f !== 'name')); setError(''); }}
                  />
                </div>

                {/* মোবাইল */}
                <div>
                  <label className={`block text-xs font-bold mb-1 ${errorFields.includes("phone") ? "text-red-500" : "text-gray-700"}`}>মোবাইল নাম্বার *</label>
                  <input
                    type="tel" required placeholder="01XXXXXXXXX"
                    className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-colors ${errorFields.includes("phone") ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-[#319b03] focus:bg-white"}`}
                    value={formData.phone}
                    onChange={(e) => { setFormData({...formData, phone: e.target.value}); setErrorFields(errorFields.filter(f => f !== 'phone')); setError(''); }}
                  />
                </div>

                {/* ঠিকানা */}
                <div>
                  <label className={`block text-xs font-bold mb-1 ${errorFields.includes("address") ? "text-red-500" : "text-gray-700"}`}>সম্পূর্ণ ঠিকানা *</label>
                  <textarea
                    required placeholder="বাসা নং, রোড নং, এলাকা, থানা, জেলা" rows={2}
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
                  disabled={isSubmitting || orderItems.length === 0}
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

            </form>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 overflow-hidden sticky top-24">

            <div className="px-4 py-3 border-b border-gray-200 bg-white">
              <h2 className="text-sm font-bold text-[#292930]">আপনার অর্ডার ({orderItems.length} আইটেম)</h2>
            </div>

            {/* আইটেম লিস্ট */}
            <div className="p-3 space-y-2 max-h-[50vh] overflow-y-auto">
              {orderItems.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-6">কোনো আইটেম নেই</p>
              ) : buyNowItem ? (
                /* Buy Now আইটেম */
                <div className="bg-white rounded-lg border border-gray-100 p-3 relative flex gap-3">
                  <img src={buyNowItem.image} alt={buyNowItem.name} className="w-16 h-16 object-cover rounded-md bg-gray-50 flex-shrink-0" />
                  <div className="flex-grow min-w-0 pr-6 lg:pr-0">
                    <h4 className="text-sm font-medium text-gray-800 line-clamp-2 lg:line-clamp-1">{buyNowItem.name}</h4>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-2 gap-2 lg:gap-0">
                      <span className="font-bold text-[#319b03] text-sm">৳{buyNowItem.price}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded">
                          <button onClick={() => setBuyNowQuantity(Math.max(1, buyNowQuantity - 1))} className="px-2.5 py-1 text-gray-500 hover:text-black font-bold">-</button>
                          <span className="px-3 text-sm font-bold border-x border-gray-200">{buyNowQuantity}</span>
                          <button onClick={() => setBuyNowQuantity(buyNowQuantity + 1)} className="px-2.5 py-1 text-gray-500 hover:text-black font-bold">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Cart আইটেম */
                cart.map(item => (
                  <div key={item.id} className="bg-white rounded-lg border border-gray-100 p-3 relative flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-gray-50 flex-shrink-0" />
                    <div className="flex-grow min-w-0 pr-6 lg:pr-0">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2 lg:line-clamp-1">{item.name}</h4>
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-2 gap-2 lg:gap-0">
                        <span className="font-bold text-[#319b03] text-sm">৳{item.price}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1 text-gray-500 hover:text-black font-bold">-</button>
                            <span className="px-3 text-sm font-bold border-x border-gray-200">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1 text-gray-500 hover:text-black font-bold">+</button>
                          </div>
                          {/* Desktop X button */}
                          <button onClick={() => removeFromCart(item.id)} className="hidden lg:block text-red-400 hover:text-red-600 px-1">
                            <i className="fa-solid fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Mobile X button */}
                    <button onClick={() => removeFromCart(item.id)} className="absolute top-2 right-2 lg:hidden w-6 h-6 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600">
                      <i className="fa-solid fa-times text-xs"></i>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* সারসংক্ষেপ */}
            <div className="px-4 py-3 space-y-2 border-t border-gray-200 bg-white">
              <div className="flex justify-between text-xs text-gray-600">
                <span>সাবটোটাল</span>
                <span className="font-medium">৳{orderTotal}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-medium">৳{orderItems.length > 0 ? deliveryCharge : 0}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#00276c] pt-2 border-t border-gray-100">
                <span>সর্বমোট</span>
                <span>৳{orderItems.length > 0 ? grandTotal : 0}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
