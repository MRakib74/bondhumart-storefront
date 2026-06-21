"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addToCart } = useCart();
  
  const trendingProducts = [
    {
      id: 1,
      name: "Smart Watch Pro",
      price: 2500,
      image: "https://placehold.co/400x400/eeeeee/333333?text=Smart+Watch",
      slug: "smart-watch-pro"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 1200,
      image: "https://placehold.co/400x400/eeeeee/333333?text=Earbuds",
      slug: "wireless-earbuds"
    },
    {
      id: 3,
      name: "Power Bank 20000mAh",
      price: 1800,
      image: "https://placehold.co/400x400/eeeeee/333333?text=Power+Bank",
      slug: "power-bank"
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 900,
      image: "https://placehold.co/400x400/eeeeee/333333?text=Speaker",
      slug: "bluetooth-speaker"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#00276C] to-[#000000] text-white text-center py-[60px] px-5 rounded-xl mb-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">Welcome to Bondhumart</h1>
        <p className="text-lg text-white/80">Discover the best gadgets at unbeatable prices.</p>
      </section>

      {/* Trending Products */}
      <div className="mb-10">
        <h2 className="text-[22px] text-[#292930] mb-5 border-b-[3px] border-[#00276c] inline-block pb-1 font-bold">
          Trending Gadgets
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-[0_1.25px_2.5px_rgba(0,0,0,0.075)] hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-250 flex flex-col border border-black/5"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-[180px] md:h-[220px] object-cover bg-[#f8f9fa]"
                />
              </Link>
              
              <div className="p-4 flex-grow flex flex-col">
                <Link href={`/product/${product.slug}`} className="no-underline">
                  <h3 className="text-[14px] text-[#292930] m-0 mb-2 leading-relaxed flex-grow font-medium hover:text-[#319b03] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="text-[16px] font-bold text-[#00276c] mb-3">
                  ৳{product.price}
                </div>
                <button 
                  onClick={() => {
                    sessionStorage.setItem('bondhumart_buynow', JSON.stringify({ ...product, quantity: 1 }));
                    window.location.href = '/checkout';
                  }}
                  className="w-full text-center p-3 bg-[#00276c] hover:bg-black text-white rounded-md text-[14px] font-bold cursor-pointer transition-colors duration-200"
                >
                  অর্ডার করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
