import React from 'react';
import { Mail, Phone, Calendar, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenConsultationModal: () => void;
}

export default function Footer({ onOpenConsultationModal }: FooterProps) {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 border-t border-[#2C3322]/10 bg-transparent py-10 text-[#2C3322]/80">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 text-xs">
        
        {/* Brand identity column */}
        <div className="md:col-span-5 space-y-3.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#2C3322] flex items-center justify-center text-[#D4D1C5] font-black text-xs">
              МР
            </div>
            <span className="text-sm font-bold tracking-tight text-[#2C3322]">
              Мебель от Руслана
            </span>
          </div>
          <p className="max-w-sm text-xs text-[#2C3322]/70 leading-normal">
            Роскошная дизайнерская мебель из кожи и массива ценных пород дерева. Создано опытными деревообработчиками и кожевниками по строгим стандартам долговечности.
          </p>
          <div className="flex items-center gap-2.5 text-[10px] uppercase font-bold tracking-wider text-[#A85135]/90 bg-[#A85135]/5 py-1 px-2 rounded w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>10 лет безусловной гарантии на каркасы</span>
          </div>
        </div>

        {/* Contact info column */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-bold text-[#2C3322]/40 tracking-widest uppercase block mb-1">
            Контакты и Запись на звонок
          </span>
          <div className="space-y-2">
            <a 
              href="mailto:ruslanabdjemilov@gmail.com" 
              className="group flex items-center gap-2 hover:text-[#A85135] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#A85135]" />
              <span className="font-semibold underline underline-offset-2 select-all">ruslanabdjemilov@gmail.com</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="flex items-center gap-2 text-[#2C3322]/70">
              <Phone className="w-4 h-4 text-[#2C3322]/60" />
              <span>Режим звонков: 09:00 — 21:00 (МСК) ежедневно</span>
            </div>
            <div className="flex items-center gap-2 text-[#2C3322]/70">
              <Calendar className="w-4 h-4 text-[#2C3322]/60" />
              <span>Бесплатное выездное согласование материалов</span>
            </div>
          </div>
        </div>

        {/* Call to action short block */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-[10px] font-bold text-[#2C3322]/40 tracking-widest uppercase block mb-1">
            План работ
          </span>
          <p className="text-[#2C3322]/60 leading-normal text-[11px]">
            Обсуждаем дизайн по телефону, привозим образцы кожи Palazzo в течение 48 часов, собираем мебель под ключ за 14 дней.
          </p>
          <button
            onClick={onOpenConsultationModal}
            className="text-[11px] font-bold text-[#A85135] hover:text-[#2C3322] underline underline-offset-2 flex items-center gap-1 mt-1 transition-colors"
          >
            <span>Оставить запрос на обратный вызов</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Bottom credits */}
      <div className="border-t border-[#2C3322]/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#2C3322]/50 gap-4">
        <span>© {new Date().getFullYear()} «Мебель от Руслана». Все права защищены законом РФ.</span>
        <div className="flex items-center gap-1.5 font-medium">
          <span>Сделано с любовью</span>
          <Heart className="w-3 h-3 text-[#A85135] fill-current" />
          <span>по премиум референсу Frutu</span>
        </div>
      </div>
    </footer>
  );
}
