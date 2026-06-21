"use client"

import React, { useState } from 'react'
import Image from 'next/image'

export default function CheckoutPage() {
  const [deliveryArea, setDeliveryArea] = useState('inside')
  
  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Premium Smart Watch Pro",
      price: 2500,
      quantity: 1,
      image: "https://placehold.co/100x100/eeeeee/333333?text=Watch"
    }
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const deliveryCharge = deliveryArea === 'inside' ? 60 : 120
  const total = subtotal + deliveryCharge

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-8 mb-10 mt-5">
      <h1 className="text-2xl md:text-3xl font-black text-[#292930] mb-8 border-b pb-4">চেকআউট</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left: Customer Form */}
        <div className="w-full lg:w-3/5">
          <h2 className="text-xl font-bold text-[#00276c] mb-6 flex items-center gap-2">
            <i className="fas fa-map-marker-alt"></i> ডেলিভারি ইনফরমেশন
          </h2>
          
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">আপনার নাম *</label>
              <input 
                type="text" 
                placeholder="সম্পূর্ণ নাম লিখুন" 
                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#319b03] focus:ring-1 focus:ring-[#319b03] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নাম্বার *</label>
              <input 
                type="tel" 
                placeholder="01XXXXXXXXX" 
                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#319b03] focus:ring-1 focus:ring-[#319b03] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ডেলিভারি এরিয়া *</label>
              <div className="grid grid-cols-2 gap-4">
                <label 
                  className={`border p-4 rounded-md cursor-pointer flex items-center gap-3 transition-all ${deliveryArea === 'inside' ? 'border-[#319b03] bg-[#f0fdf4]' : 'border-gray-200'}`}
                >
                  <input 
                    type="radio" 
                    name="area" 
                    value="inside" 
                    checked={deliveryArea === 'inside'}
                    onChange={(e) => setDeliveryArea(e.target.value)}
                    className="accent-[#319b03] w-4 h-4"
                  />
                  <span className="font-bold text-[#292930]">ঢাকার ভিতরে (৬০৳)</span>
                </label>
                <label 
                  className={`border p-4 rounded-md cursor-pointer flex items-center gap-3 transition-all ${deliveryArea === 'outside' ? 'border-[#319b03] bg-[#f0fdf4]' : 'border-gray-200'}`}
                >
                  <input 
                    type="radio" 
                    name="area" 
                    value="outside" 
                    checked={deliveryArea === 'outside'}
                    onChange={(e) => setDeliveryArea(e.target.value)}
                    className="accent-[#319b03] w-4 h-4"
                  />
                  <span className="font-bold text-[#292930]">ঢাকার বাইরে (১২০৳)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">সম্পূর্ণ ঠিকানা *</label>
              <textarea 
                placeholder="বাসা নং, রাস্তা, এলাকা, থানা, জেলা" 
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#319b03] focus:ring-1 focus:ring-[#319b03] outline-none transition-all"
                required
              ></textarea>
            </div>
            
            <button type="button" className="w-full py-4 bg-[#00276c] hover:bg-black text-white text-lg font-bold rounded-lg transition-colors flex justify-center items-center gap-2 mt-4 shadow-lg">
              <i className="fas fa-check-circle"></i> অর্ডার কনফার্ম করুন
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-[#00276c] mb-6 flex items-center gap-2">
              <i className="fas fa-shopping-cart"></i> অর্ডার সামারি
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-[#292930] leading-tight mb-1">{item.name}</h4>
                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                  </div>
                  <div className="font-bold text-[#319b03]">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
              <div className="flex justify-between text-gray-600">
                <span>সাবটোটাল</span>
                <span className="font-bold text-[#292930]">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-bold text-[#292930]">৳{deliveryCharge}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 mt-1">
                <span className="text-lg font-bold text-[#292930]">সর্বমোট</span>
                <span className="text-xl font-black text-[#00276c]">৳{total}</span>
              </div>
            </div>
            
            <div className="mt-6 bg-[#eaf4e6] text-[#319b03] p-4 rounded-md text-sm font-bold text-center border border-[#cbeabb]">
              <i className="fas fa-info-circle mr-1"></i> ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন)
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
