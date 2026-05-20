import React from 'react';
import { Product } from '../types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onView, onAddToCart }: ProductCardProps) {
  return (
    <div 
      className="group bg-[#121212] hover:bg-[#161616] rounded-none p-5 border border-zinc-850 hover:border-amber-600/50 shadow-lg hover:shadow-amber-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div 
        onClick={() => onView(product)}
        className="w-full aspect-[4/3] rounded-none bg-zinc-900/60 p-4 flex items-center justify-center relative overflow-hidden transition-colors border border-zinc-850 cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.russianName}
          referrerPolicy="no-referrer"
          className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
        />

        {product.price > 100000 && (
          <span className="absolute top-3 left-3 bg-amber-600 text-black text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-none flex items-center gap-1 font-sans">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Эксклюзив</span>
          </span>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-amber-600 text-black px-4 py-2 rounded-none text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform">
            <span>Раскрыть детали</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Product Info Block */}
      <div className="mt-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-bold tracking-widest text-[#d97706] uppercase">
            {product.russianCategory}
          </span>
          <h3 
            onClick={() => onView(product)}
            className="text-lg font-serif text-zinc-100 mt-1 hover:text-amber-500 cursor-pointer line-clamp-1 transition-colors"
          >
            {product.russianName}
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 min-h-[2rem] leading-relaxed">
            {product.russianDescription}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">ЦЕНА</span>
            <span className="text-base font-extrabold text-zinc-100 font-mono">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-black hover:bg-amber-600 hover:border-amber-600 text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
}
