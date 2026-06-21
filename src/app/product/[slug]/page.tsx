"use client"

import React, { useState } from 'react'
import { useCart } from "@/context/CartContext"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart()
  
  const product = {
    name: "Premium Smart Watch Pro",
    price: "2,500",
    oldPrice: "3,500",
    description: "This is a premium quality smart watch with heart rate monitoring, step tracking, and 7-day battery life. Water resistant and compatible with iOS and Android.",
    images: [
      "https://placehold.co/600x600/eeeeee/333333?text=Smart+Watch+1",
      "https://placehold.co/600x600/eeeeee/333333?text=Smart+Watch+2",
      "https://placehold.co/600x600/eeeeee/333333?text=Smart+Watch+3"
    ],
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["Standard"]
  }

  const bundles = [
    { id: 1, name: "১টি কিনুন", price: "২,৫০০ ৳", save: "" },
    { id: 2, name: "২টি কিনুন (১০% ছাড়)", price: "৪,৫০০ ৳", save: "৫০০ ৳ সেভ করুন" },
    { id: 3, name: "৩টি কিনুন (Combo Offer)", price: "৬,০০০ ৳", save: "১,৫০০ ৳ সেভ করুন" }
  ]

  const reviews = [
    { id: 1, name: "Rakib Hasan", rating: 5, date: "12 June, 2026", comment: "প্রোডাক্টটি অনেক ভালো। ডেলিভারি খুব ফাস্ট ছিল!" },
    { id: 2, name: "Tanvir Ahmed", rating: 4, date: "10 June, 2026", comment: "ব্যাটরি ব্যাকআপ বেশ ভালো। আমি খুশি।" }
  ]

  const [activeImage, setActiveImage] = useState(product.images[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedBundle, setSelectedBundle] = useState(bundles[0].id)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-8 mb-10 mt-5">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden border border-gray-100 bg-[#f8f9fa] sticky top-24">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`w-[80px] h-[80px] rounded-md overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? 'border-[#319b03] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-black text-[#292930] mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <span className="text-3xl font-bold text-[#00276c]">৳{product.price}</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through">৳{product.oldPrice}</span>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-[#292930] mb-3">কালার নির্বাচন করুন:</h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border text-sm font-bold transition-all ${
                      selectedColor === color 
                        ? 'border-[#319b03] bg-[#f0fdf4] text-[#319b03] shadow-sm' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bundle Packages (আগের মতো) */}
          <div className="mb-8">
             <h3 className="text-[15px] font-bold text-[#292930] mb-3">প্যাকেজ নির্বাচন করুন:</h3>
             <div className="flex flex-col gap-3">
               {bundles.map(bundle => (
                 <div 
                   key={bundle.id}
                   onClick={() => setSelectedBundle(bundle.id)}
                   className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                     selectedBundle === bundle.id 
                      ? 'border-[#319b03] bg-[#f0fdf4]' 
                      : 'border-gray-200 hover:border-[#319b03]'
                   }`}
                 >
                   <div className="flex items-center gap-3">
                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedBundle === bundle.id ? 'border-[#319b03]' : 'border-gray-300'}`}>
                        {selectedBundle === bundle.id && <div className="w-2.5 h-2.5 bg-[#319b03] rounded-full"></div>}
                     </div>
                     <div>
                       <div className="font-bold text-[#292930]">{bundle.name}</div>
                       {bundle.save && <div className="text-xs font-bold text-red-500 mt-0.5">{bundle.save}</div>}
                     </div>
                   </div>
                   <div className="font-bold text-lg text-[#00276c]">{bundle.price}</div>
                 </div>
               ))}
             </div>
          </div>

          {/* Quantity */}
          <div className="mb-8 flex items-center gap-4">
            <h3 className="text-[15px] font-bold text-[#292930] m-0">পরিমাণ:</h3>
            <div className="flex items-center border border-gray-200 w-fit rounded-md bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >-</button>
              <span className="px-4 py-2 font-bold min-w-[50px] text-center border-x border-gray-200">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              onClick={() => {
                addToCart({ id: parseInt(params.slug) || 1, name: product.name, price: parseInt(product.price.replace(',', '')), image: product.images[0], quantity: quantity }, false);
                window.location.href = '/checkout';
              }}
              className="flex-1 py-4 bg-[#00276c] hover:bg-black text-white text-lg font-bold rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg"
            >
              <i className="fas fa-shopping-bag"></i> এখনই অর্ডার করুন
            </button>
            <button 
              onClick={() => addToCart({ id: parseInt(params.slug) || 1, name: product.name, price: parseInt(product.price.replace(',', '')), image: product.images[0], quantity: quantity })}
              className="flex-1 py-4 bg-[#f8f9fa] hover:bg-gray-200 text-[#292930] border border-gray-200 text-lg font-bold rounded-lg transition-colors flex justify-center items-center gap-2"
            >
              <i className="fas fa-cart-plus text-[#319b03]"></i> কার্টে যোগ করুন
            </button>
          </div>

        </div>
      </div>

      {/* Details & Grid System Area */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-[#292930] mb-6 border-l-4 border-[#319b03] pl-3">প্রোডাক্ট ডেসক্রিপশন</h2>
        
        <div className="text-gray-600 leading-relaxed mb-8">
          <p>{product.description}</p>
        </div>

        {/* Grid System for Features/Specs */}
        <h3 className="text-lg font-bold text-[#292930] mb-4">ফিচারসমূহ:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#f8f9fa] p-4 rounded-lg border border-gray-100 flex items-start gap-3">
            <i className="fas fa-battery-full text-[#319b03] text-xl mt-1"></i>
            <div>
              <h4 className="font-bold text-[#292930]">লং ব্যাটারি লাইফ</h4>
              <p className="text-sm text-gray-500 mt-1">টানা ৭ দিন চার্জ থাকবে।</p>
            </div>
          </div>
          <div className="bg-[#f8f9fa] p-4 rounded-lg border border-gray-100 flex items-start gap-3">
            <i className="fas fa-water text-[#319b03] text-xl mt-1"></i>
            <div>
              <h4 className="font-bold text-[#292930]">ওয়াটারপ্রুফ</h4>
              <p className="text-sm text-gray-500 mt-1">IP68 রেটিং, পানিতে ভিজলে নষ্ট হবে না।</p>
            </div>
          </div>
          <div className="bg-[#f8f9fa] p-4 rounded-lg border border-gray-100 flex items-start gap-3">
            <i className="fas fa-heartbeat text-[#319b03] text-xl mt-1"></i>
            <div>
              <h4 className="font-bold text-[#292930]">হেলথ ট্র্যাকিং</h4>
              <p className="text-sm text-gray-500 mt-1">হার্ট রেট ও স্লিপ মনিটরিং সুবিধা।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#292930] border-l-4 border-[#319b03] pl-3">কাস্টমার রিভিউ</h2>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">4.5</span>
            <div className="text-yellow-400">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00276c] text-white rounded-full flex justify-center items-center font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#292930]">{review.name}</h4>
                    <div className="text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-gray-300'}`}></i>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
           <button className="px-6 py-2 border-2 border-[#319b03] text-[#319b03] font-bold rounded-lg hover:bg-[#319b03] hover:text-white transition-colors">
             রিভিউ দিন
           </button>
        </div>
      </div>

    </div>
  )
}
