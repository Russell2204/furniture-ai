import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ArrowRight, Sparkles, Check, PhoneCall } from 'lucide-react';

interface HeroProps {
  products: Product[];
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  onViewProductDetail: (product: Product) => void;
  onOpenConsultationModal: () => void;
}

export default function Hero({
  products,
  selectedProduct,
  setSelectedProduct,
  onViewProductDetail,
  onOpenConsultationModal,
}: HeroProps) {
  // Slides index
  const activeIndex = products.findIndex((p) => p.id === selectedProduct.id);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-transparent relative overflow-hidden">
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-zinc-800/10 rounded-full blur-[80px] pointer-events-none" />

      {/* LEFT CONTENT COLUMN: Presentational copy + Slider */}
      <div className="lg:col-span-5 flex flex-col justify-center h-full z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md mb-6 w-fit">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">
            Премиум-коллекция 2026
          </span>
        </div>

        {/* Dynamic Title and Description */}
        <div className="min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-zinc-100 leading-[1.12] mb-6 tracking-wide">
                {selectedProduct.name === 'High Quality Leather Lounge Chair'
                  ? 'Высококачественная Кожаная Мебель'
                  : selectedProduct.russianName}
              </h1>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-md">
                {selectedProduct.russianDescription}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button CTA */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button
            onClick={() => onViewProductDetail(selectedProduct)}
            className="px-7 py-3.5 bg-amber-600 hover:bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider rounded-none flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Оценить модель</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenConsultationModal}
            className="px-6 py-3.5 bg-transparent border border-zinc-800 hover:border-amber-600/50 text-zinc-100 hover:text-amber-500 font-semibold text-xs uppercase tracking-wider rounded-none flex items-center gap-2.5 transition-all duration-300 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-amber-500" />
            <span>Заказать звонок</span>
          </button>
        </div>

        {/* Bottom Slider Section mirroring layout */}
        <div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase block mb-4">
            Другие Экспонаты в Галерее
          </span>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {products.map((prod) => {
              const isSelected = prod.id === selectedProduct.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`flex-shrink-0 w-64 p-3 rounded-none cursor-pointer transition-all duration-300 flex items-center gap-3.5 border ${
                    isSelected
                      ? 'bg-[#1A1A1A] border-amber-600 shadow-lg shadow-amber-600/5'
                      : 'bg-zinc-950/60 border-zinc-900 hover:bg-[#151515] hover:border-zinc-800'
                  }`}
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.russianName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-none object-contain bg-zinc-900/80 p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs text-zinc-200 truncate font-serif">
                      {prod.russianName}
                    </h3>
                    <p className="text-[10px] text-zinc-500 line-clamp-1 mb-1.5">
                      {prod.russianCategory}
                    </p>
                    <span className="text-xs font-semibold text-amber-500">
                      {prod.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 mt-4 ml-1">
            {products.map((prod, idx) => (
              <span
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`h-1.5 cursor-pointer transition-all duration-300 ${
                  idx === activeIndex ? 'w-6 bg-amber-600' : 'w-1.5 bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: HERO PRODUCT PREVIEW CONTENT */}
      <div className="lg:col-span-7 flex items-center justify-center relative p-4 h-full min-h-[400px] md:min-h-[500px]">
        {/* Floating backdrop canvas frame like in the design */}
        <div className="absolute inset-0 bg-[#121212] rounded-none border border-zinc-900 pointer-events-none scale-95" />

        {/* Main Product Render with Animation */}
        <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full flex items-center justify-center p-4"
            >
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.russianName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)] select-none animate-float"
              />

              {/* Dynamic SVGs & Callouts Overlaid */}
              {selectedProduct.callouts && selectedProduct.callouts.map((call, idx) => {
                const isLeft = call.x < 50;
                const isTop = call.y < 50;

                return (
                  <div
                    key={`${selectedProduct.id}-call-${idx}`}
                    className="absolute"
                    style={{ left: `${call.x}%`, top: `${call.y}%` }}
                  >
                    {/* Pulsing focal point */}
                    <span className="absolute -left-1.5 -top-1.5 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-lg">
                      <span className="absolute w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-60" />
                    </span>

                    {/* SVG Connecting Dotted Line */}
                    <svg
                      className="absolute overflow-visible pointer-events-none"
                      style={{
                        width: '120px',
                        height: '60px',
                        left: isLeft ? '-120px' : '0px',
                        top: isTop ? '-60px' : '0px',
                      }}
                    >
                      <path
                        d={
                          isLeft
                            ? isTop
                              ? 'M 120 60 L 40 10 L 0 10' // pointer to left and up
                              : 'M 120 0 L 40 50 L 0 50'   // pointer to left and down
                            : isTop
                            ? 'M 0 60 L 80 10 L 120 10'  // pointer to right and up
                            : 'M 0 0 L 80 50 L 120 50'    // pointer to right and down
                        }
                        fill="none"
                        stroke="#d97706"
                        strokeWidth="1.25"
                        strokeDasharray="4 4"
                        className="opacity-90 animate-dash"
                      />
                    </svg>

                    {/* Highly polished pill-shaped dark badge overlay */}
                    <div
                      className={`absolute whitespace-nowrap text-[10px] uppercase font-bold tracking-wider text-zinc-200 px-3.5 py-1.5 bg-[#121212]/95 backdrop-blur-md border border-zinc-800 rounded-none shadow-xl flex items-center gap-1.5 transition-transform hover:scale-105 ${
                        isLeft
                          ? isTop
                            ? '-left-32 -translate-x-full -top-[58px]'
                            : '-left-32 -translate-x-full top-[42px]'
                          : isTop
                          ? 'left-[110px] -top-[58px]'
                          : 'left-[110px] top-[42px]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{call.label}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature floating lists */}
        <div className="absolute bottom-4 right-10 flex flex-col gap-2 max-w-xs z-10 hidden sm:flex">
          {selectedProduct.features.map((feat, index) => (
            <motion.div
              key={`${selectedProduct.id}-feat-${index}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2.5 bg-zinc-950/90 backdrop-blur-md border border-zinc-850 py-2 px-3.5 rounded-sm shadow-xl text-xs font-medium text-zinc-300"
            >
              <div className="w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center">
                <Check className="w-3 h-3 text-black font-extrabold" />
              </div>
              <span className="truncate">{feat}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
