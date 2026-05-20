import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PRD_DOCUMENT_CONTENT } from '../data';
import { Copy, Check, FileText, BookOpen, Star, HelpCircle, Layers } from 'lucide-react';

export default function PrdViewer() {
  const [copied, setCopied] = useState(false);
  const [activePrdTab, setActivePrdTab] = useState<'full' | 'summary'>('full');

  const handleCopy = () => {
    navigator.clipboard.writeText(PRD_DOCUMENT_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 bg-transparent" id="prd-document-root">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#2C3322]/15 pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#2C3322] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#A85135]" />
            <span>Product Requirements Document (PRD)</span>
          </h1>
          <p className="text-xs text-[#2C3322]/60 mt-0.5">Встроенный интерактивный документ технических спецификаций и бизнес-требований проекта.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtab choice */}
          <div className="bg-[#2C3322]/5 p-1 rounded-full flex gap-1 text-[11px] font-bold">
            <button
              onClick={() => setActivePrdTab('full')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activePrdTab === 'full'
                  ? 'bg-[#2C3322] text-[#D4D1C5]'
                  : 'text-[#2C3322]/70 hover:text-[#2C3322]'
              }`}
            >
              Полный PRD.md
            </button>
            <button
              onClick={() => setActivePrdTab('summary')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activePrdTab === 'summary'
                  ? 'bg-[#2C3322] text-[#D4D1C5]'
                  : 'text-[#2C3322]/70 hover:text-[#2C3322]'
              }`}
            >
              Сводная Спецификация
            </button>
          </div>

          {/* Copy PRD Button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-white hover:bg-[#2C3322]/5 text-[#2C3322] border border-[#2C3322]/15 font-semibold text-xs rounded-full transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-700" />
                <span className="text-green-700">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Скопировать RAW PRD</span>
              </>
            )}
          </button>
        </div>
      </div>

      {activePrdTab === 'full' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Table of contents shortcut guide sidebar */}
          <div className="lg:col-span-3 space-y-4 hidden lg:block">
            <div className="bg-white/40 border border-[#2C3322]/10 rounded-2xl p-5 stick top-4">
              <span className="text-[10px] font-bold tracking-widest text-[#2C3322]/40 uppercase block mb-3">Содержание PRD</span>
              <ul className="space-y-2.5 text-xs font-semibold text-[#2C3322]/80">
                <li className="flex items-center gap-2 hover:text-[#A85135] transition-colors cursor-pointer">
                  <Star className="w-3.5 h-3.5 text-[#A85135]" />
                  <span>1. Общее видение</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#A85135] transition-colors cursor-pointer">
                  <Layers className="w-3.5 h-3.5 text-[#2C3322]/60" />
                  <span>2. Стилистическая концепция</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#A85135] transition-colors cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-[#2C3322]/60" />
                  <span>3. Функционал страниц</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#A85135] transition-colors cursor-pointer">
                  <Layers className="w-3.5 h-3.5 text-[#2C3322]/60" />
                  <span>4. Технические ограничения</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Full Markdown display with exquisite custom spacing typography rendering */}
          <div className="lg:col-span-9 bg-white/75 backdrop-blur-md border border-[#2C3322]/10 rounded-3xl p-6 md:p-10 shadow-sm overflow-hidden prose prose-stone max-w-none">
            <div className="markdown-body prd-markdown text-[#2C3322]">
              <ReactMarkdown>{PRD_DOCUMENT_CONTENT}</ReactMarkdown>
            </div>
          </div>

        </div>
      ) : (
        /* Summary view as dashboard blocks */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/50 border border-[#2C3322]/10 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-[#2C3322] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A85135]" />
              <span>Главная цель</span>
            </h3>
            <p className="text-xs text-[#2C3322]/70 leading-relaxed">
              Презентовать премиальную мебель ручной работы под брендом «Мебель от Руслана» и конвертировать посетителей в замеры/звонки с помощью прямой связи на ruslanabdjemilov@gmail.com.
            </p>
          </div>

          <div className="bg-white/50 border border-[#2C3322]/10 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-[#2C3322] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2C3322]" />
              <span>Визуальный стиль</span>
            </h3>
            <p className="text-xs text-[#2C3322]/70 leading-relaxed">
              Овсяная нейтральная гамма с глубоким зеленым («оливковым») контрастом, тонкими векторными callout-указателями и скругленными элементами декора, как на референс-арте.
            </p>
          </div>

          <div className="bg-white/50 border border-[#2C3322]/10 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-[#2C3322] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2C3322]" />
              <span>Функционал Админа</span>
            </h3>
            <p className="text-xs text-[#2C3322]/70 leading-relaxed">
              Полный интерактивный каталог, в который можно на лету добавлять диваны и кресла, а также отслеживать оставленные клиентами контакты для созвона.
            </p>
          </div>

          <div className="bg-white/50 border border-[#2C3322]/10 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-[#2C3322] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-700" />
              <span>Архитектура</span>
            </h3>
            <p className="text-xs text-[#2C3322]/70 leading-relaxed">
              React 19 + TypeScript. Использование localStorage обеспечивает полную сохранность вновь созданных товаров и заявок между сессиями браузера.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
