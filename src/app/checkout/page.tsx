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

    // Advanced Validation Rules
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("দয়া করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)।");
      setErrorFields(["phone"]);
      return;
    }
    
    const nameStr = formData.name.trim();
    if (nameStr.length < 4 || /(.)\1{2,}/.test(nameStr)) {
      setError("দয়া করে আপনার সঠিক নাম লিখুন (ভুল বা হাবিজাবি নাম গ্রহণযোগ্য নয়)।");
      setErrorFields(["name"]);
      return;
    }
    
    const addressStr = formData.address.trim();
    if (addressStr.length < 10 || !/\s/.test(addressStr) || /(.)\1{3,}/.test(addressStr)) {
      setError("দয়া করে আপনার সম্পূর্ণ ও সঠিক ঠিকানা বিস্তারিতভাবে লিখুন (যেমন: বাসা নং, এলাকা)।");
      setErrorFields(["address"]);
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
