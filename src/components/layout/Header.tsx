"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // In Next.js we use state to manage the drawers instead of raw DOM manipulation
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const cartCount = 0 // Will connect to Zustand later

  return (
    <>
      {/* Top Marquee */}
      <div className="top-notice bg-[#319b03] text-white py-2 text-sm text-center font-bold overflow-hidden">
        <marquee>Bondhumart অনলাইনে শপে আপনাকে স্বাগতম।।</marquee>
      </div>

      {/* Mobile Header */}
      <div className="header-mobile">
        <div className="flex justify-between items-center">
          <i className="fas fa-bars text-2xl cursor-pointer" onClick={toggleMobileMenu}></i>
          <div className="text-center">
            <Link href="/" className="text-inherit no-underline">
              <h1 className="m-0 text-[22px] text-[#319b03] font-black">Bondhumart</h1>
              <div className="text-[9px] font-bold">TRUSTED ONLINE SHOP</div>
            </Link>
          </div>
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <i className="fas fa-shopping-cart text-[22px]"></i>
            <span className="absolute -top-2 -right-2 bg-[#00276C] text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="search-wrapper mt-2">
          <div className="search-box m-0">
            <input type="text" placeholder="পণ্য খুঁজুন..." />
            <button><i className="fas fa-search"></i></button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="header-desktop container">
        <Link href="/" className="no-underline">
          <h1 className="m-0 text-[#319b03] text-[32px] font-black">Bondhumart</h1>
        </Link>
        
        {/* Desktop Search */}
        <div className="search-wrapper w-[500px]">
          <div className="search-box m-0">
            <input type="text" placeholder="পণ্য খুঁজুন..." />
            <button><i className="fas fa-search"></i></button>
          </div>
        </div>
        
        <div className="flex gap-4 items-center cursor-pointer" onClick={toggleCart}>
          <div className="relative">
            <i className="fas fa-shopping-cart text-2xl"></i>
            <span className="absolute -top-2.5 -right-2.5 bg-rose-600 text-white text-[11px] px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Category Navigation Bar */}
      <div className="nav-desktop-wrapper">
        <div className="container nav-desktop">
          <Link href="/" className="nav-item">হোম</Link>
          <Link href="/category/electronics" className="nav-item">ইলেক্ট্রনিক্স</Link>
          <Link href="/category/fashion" className="nav-item">ফ্যাশন</Link>
          <Link href="/category/gadgets" className="nav-item">গ্যাজেটস</Link>
          <Link href="/category/home-appliance" className="nav-item">হোম অ্যাপ্লায়েন্স</Link>
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="bottom-nav">
        <Link href="/"><i className="fas fa-home"></i>Home</Link>
        <a href="https://wa.me/8801861382534" target="_blank" className="text-[#25D366]"><i className="fab fa-whatsapp"></i>WhatsApp</a>
        <a href="tel:01861382534"><i className="fas fa-phone-alt"></i>Call</a>
      </div>

      {/* Overlay */}
      {(isMobileMenuOpen || isCartOpen) && (
        <div 
          id="masterOverlay" 
          style={{ display: 'block' }}
          onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(false); }}
        ></div>
      )}

      {/* Mobile Drawer */}
      <div id="mobileDrawer" style={{ left: isMobileMenuOpen ? 0 : '-300px' }}>
        <div className="p-5 border-b border-[#eee] flex justify-between items-center">
          <h3 className="m-0 text-[#319b03]">Bondhumart</h3>
          <i className="fas fa-times cursor-pointer text-xl" onClick={toggleMobileMenu}></i>
        </div>
        <Link href="/" className="block p-4 border-b border-[#f0f0f0] text-[#333] font-bold no-underline" onClick={toggleMobileMenu}>
          <i className="fas fa-home mr-2"></i> Home
        </Link>
        <Link href="/category/electronics" className="block p-4 border-b border-[#f0f0f0] text-[#333] font-bold no-underline" onClick={toggleMobileMenu}>
          ইলেক্ট্রনিক্স
        </Link>
        <Link href="/category/fashion" className="block p-4 border-b border-[#f0f0f0] text-[#333] font-bold no-underline" onClick={toggleMobileMenu}>
          ফ্যাশন
        </Link>
      </div>

      {/* Cart Sidebar */}
      <div id="cartSidebar" style={{ right: isCartOpen ? 0 : '-400px' }}>
        <div className="p-5 border-b border-[#eee] flex justify-between items-center">
          <h3 className="m-0">Cart review</h3>
          <i className="fas fa-times cursor-pointer text-xl" onClick={toggleCart}></i>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cartCount === 0 ? (
            <p className="text-center text-gray-500 mt-10">আপনার কার্ট খালি!</p>
          ) : (
            <div>Cart items will go here</div>
          )}
        </div>

        <div className="p-5 pb-[60px] border-t border-[#eee] bg-white">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>৳ 0</span>
          </div>
          <Link href="/checkout" className="block bg-[#319b03] text-white text-center p-4 rounded-lg no-underline font-bold text-lg" onClick={toggleCart}>
            অর্ডার সম্পন্ন করুন
          </Link>
        </div>
      </div>
    </>
  )
}
