import React from 'react';
import { Search, User, ShoppingCart, FileText, Sliders, Home, Compass } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'products' | 'admin' | 'prd';
  setActiveTab: (tab: 'home' | 'products' | 'admin' | 'prd') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  cartCount,
}: HeaderProps) {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-zinc-800 bg-transparent">
      {/* Brand Logo with Serif style inspired by the Elegant code snippet */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-9 h-9 bg-amber-600 rounded-sm flex items-center justify-center font-serif text-black font-bold text-lg transition-transform group-hover:rotate-6">
          МР
        </div>
        <span className="text-xl font-serif tracking-widest text-zinc-100 uppercase">
          Мебель от Руслана
        </span>
      </div>

      {/* Navigation - Elegant lowercase/uppercase hybrid as referenced */}
      <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs uppercase tracking-widest font-semibold">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'home'
              ? 'text-amber-500 bg-zinc-900/80 border border-zinc-800'
              : 'text-zinc-400 hover:text-amber-500 hover:bg-zinc-900/30'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Главная</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'products'
              ? 'text-amber-500 bg-zinc-900/80 border border-zinc-800'
              : 'text-zinc-400 hover:text-amber-500 hover:bg-zinc-900/30'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Каталог</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'admin'
              ? 'text-amber-500 bg-zinc-900/80 border border-zinc-800'
              : 'text-zinc-400 hover:text-amber-500 hover:bg-zinc-900/30'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Админ</span>
        </button>

        <button
          onClick={() => setActiveTab('prd')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'prd'
              ? 'text-amber-500 bg-zinc-900/80 border border-zinc-800'
              : 'text-zinc-400 hover:text-amber-500 hover:bg-zinc-900/30'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>PRD Демо</span>
        </button>
      </nav>

      {/* Search Input, Service Pulse Badge, Cart Icon */}
      <div className="flex items-center gap-3 w-full lg:w-auto justify-center md:justify-end">
        {/* Rounded Search bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск мебели..."
            className="w-40 sm:w-48 xl:w-56 px-4 py-1.5 pl-9 rounded-full bg-zinc-900/90 border border-zinc-800 focus:border-amber-600 focus:outline-none placeholder-zinc-650 text-zinc-100 text-xs transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
        </div>

        {/* Dynamic active status pulse indicator matching mockup spec */}
        <div className="bg-zinc-900 h-9 px-3.5 flex items-center gap-2 rounded-full border border-zinc-800">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">
            Online
          </span>
        </div>

        {/* Premium Shopping Cart design */}
        <button className="relative w-9 h-9 rounded-full bg-[#1A1A1A] border border-zinc-800 hover:bg-[#252525] hover:border-amber-500 transition-all flex items-center justify-center text-zinc-300">
          <ShoppingCart className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-600 text-black text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-beat">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
