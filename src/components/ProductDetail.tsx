import React, { useState } from 'react';
import { Product, ClientRequest } from '../types';
import { motion } from 'motion/react';
import { ChevronLeft, Info, HelpCircle, ArrowRight, Sparkles, Sliders, Check } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onSubmitRequest: (request: Omit<ClientRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export default function ProductDetail({ product, onBack, onSubmitRequest }: ProductDetailProps) {
  // Option customizations
  const [leatherType, setLeatherType] = useState('Premium Palazzo (Италия)');
  const [baseOption, setBaseOption] = useState('Черный Матовый Металл');
  const [isArmrestUpgrade, setIsArmrestUpgrade] = useState(false);
  const [customWidth, setCustomWidth] = useState(75); // custom slider for width in cm

  // Form info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  // Surcharges calculation
  const basePrice = product.price;
  const armrestSurcharge = isArmrestUpgrade ? 12000 : 0;
  const premiumLeatherSurcharge = leatherType.includes('Palazzo') ? 15000 : 0;
  const widthSurcharge = (customWidth - 70) > 0 ? (customWidth - 70) * 1500 : 0;
  const totalPrice = basePrice + armrestSurcharge + premiumLeatherSurcharge + widthSurcharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const notesSummary = `Материал: ${leatherType}, База: ${baseOption}, Доп. мягкость: ${isArmrestUpgrade ? 'Да' : 'Нет'}, Ширина: ${customWidth} см. Общая стоимость: ${totalPrice.toLocaleString()} ₽`;

    // Local application state submission
    onSubmitRequest({
      name,
      email: email || 'не указан',
      phone,
      furnitureInterest: `${product.russianName} (Индивидуальный заказ)`,
      notes: notesSummary,
    });

    // Explicit Mailto to Ruslan's email
    const emailTo = 'ruslanabdjemilov@gmail.com';
    const emailSubject = encodeURIComponent(`Заявка на мебель: ${product.russianName} (Запрос от ${name})`);
    const emailBody = encodeURIComponent(
      `Здравствуйте, Руслан!\n\n` +
      `Меня зовут ${name}. Я хочу проконсультироваться по поводу мебели "${product.russianName}".\n\n` +
      `Выбранные характеристики на сайте:\n` +
      `- Обивка: ${leatherType}\n` +
      `- База/Опора: ${baseOption}\n` +
      `- Дополнительный апгрейд эргономики: ${isArmrestUpgrade ? 'Включен' : 'Отсутствует'}\n` +
      `- Индивидуальная ширина: ${customWidth} см\n` +
      `- Предварительный расчет стоимости: ${totalPrice.toLocaleString()} рублей\n\n` +
      `Контактные данные для связи:\n` +
      `- Телефон: ${phone}\n` +
      `- Электронная почта: ${email || 'Не указана'}\n\n` +
      `С уважением, ${name}.`
    );

    // Launch mail window
    window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
    
    setMessageSubmitted(true);
    // Reset Form values
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 bg-transparent text-zinc-300">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-none transition-all text-xs font-semibold mb-8 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 text-amber-500" />
        <span>Вернуться к просмотру галереи</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: INTERACTIVE VISUAL DISPLAY */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-zinc-900/60 border border-zinc-850 p-6 rounded-none aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 bg-zinc-950 border border-zinc-800 py-1.5 px-3 rounded-none text-xs font-semibold text-zinc-300">
              Интерактивный чертеж изделия
            </div>
            
            <img
              src={product.imageUrl}
              alt={product.russianName}
              referrerPolicy="no-referrer"
              className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-102"
            />

            {/* Simulated scale helper line */}
            <div className="absolute bottom-6 left-12 right-12 flex flex-col gap-1.5 items-center justify-center">
              <div className="relative w-full h-[1px] bg-zinc-700">
                <span className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-amber-500" />
                <span className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-amber-500" />
                <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-zinc-950 px-2.5 py-0.5 border border-zinc-800 text-[10px] text-zinc-300 font-bold rounded-none">
                  Высота: 78 см | Настраиваемый габарит: {customWidth} см
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Specs Panel */}
          <div className="bg-zinc-900 border border-zinc-850 rounded-none p-6">
            <h3 className="text-xs font-bold text-zinc-100 mb-4 uppercase tracking-widest flex items-center gap-2 font-sans border-b border-zinc-800 pb-2">
              <Info className="w-4 h-4 text-amber-500" />
              <span>Паспорт Характеристик ТД</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
              {product.specs.map((sp, i) => (
                <div key={i} className="flex justify-between border-b border-zinc-950 pb-2 text-xs">
                  <span className="text-zinc-500 font-medium">{sp.label}</span>
                  <span className="text-zinc-200 font-semibold">{sp.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONFIGURATOR + CONTACT CALL */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase bg-amber-600/10 border border-amber-600/20 px-3.5 py-1.5 rounded-none">
              {product.russianCategory}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-white mt-5 mb-2 tracking-wide">
              {product.russianName}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              {product.russianDescription}
            </p>
          </div>

          {/* 1. INTERACTIVE DESIGN CONFIGURATOR */}
          <div className="bg-[#121212] border border-zinc-850 rounded-none p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4 flex items-center gap-1.5 border-b border-zinc-800 pb-3">
              <Sliders className="w-3.5 h-3.5 text-amber-500" />
              <span>Интерактивный Калькулятор Сборки</span>
            </h3>

            {/* Leather Option Selection */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-zinc-400 block mb-2">
                Тип Кожи / Обивки:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: 'Palazzo Nubuck Lusso', desc: 'Уплотненная кожа (+15к)' },
                  { name: 'Siena Soft-Grain Eco-Leather', desc: 'Износостойкая базовая' }
                ].map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setLeatherType(opt.name)}
                    className={`p-3 text-left rounded-none border text-xs transition-all ${
                      leatherType === opt.name
                        ? 'border-amber-600 bg-amber-600/10 text-amber-500 font-bold'
                        : 'border-zinc-800 hover:border-zinc-700 text-zinc-400 bg-zinc-950/40'
                    }`}
                  >
                    <div className="truncate">{opt.name}</div>
                    <div className="text-[10px] text-zinc-500 font-normal mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Base Option Selection */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-zinc-400 block mb-2">
                Конфигурация Опорной Платформы:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Кованая Сталь', 'Золотое PVD', 'Ореховый Натурал'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBaseOption(opt)}
                    className={`py-2 px-1 text-center rounded-none border text-xs transition-all ${
                      baseOption === opt
                        ? 'border-amber-600 bg-amber-600/10 text-amber-500 font-semibold'
                        : 'border-zinc-800 hover:border-zinc-700 text-zinc-400 bg-zinc-950/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Sizing Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-zinc-400 mb-2">
                <span>Индивидуальная габаритная ширина (под лоджию/нишу):</span>
                <span className="text-amber-500 font-bold">{customWidth} см</span>
              </div>
              <input
                type="range"
                min="65"
                max="120"
                value={customWidth}
                onChange={(e) => setCustomWidth(Number(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                <span>Минимум (65 см)</span>
                <span>Стандарт (75 см)</span>
                <span>Максимум (120 см)</span>
              </div>
            </div>

            {/* Surcharge details */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-none p-4 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-wider">Предварительная Цена сборки</span>
                <div className="text-2xl font-black text-amber-500 mt-0.5 font-mono">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div className="text-right text-[10px] text-zinc-400 font-medium">
                <div>Срок выполнения: ~14 дней</div>
                <div>Доставка по России: Бесплатно</div>
              </div>
            </div>
          </div>

          {/* 2. CONTACT CTA FORM (To Ruslan's email) */}
          <div className="bg-[#121212] border border-zinc-850 text-zinc-300 rounded-none p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-base font-bold mb-1 tracking-wider text-zinc-100 flex items-center gap-2 uppercase font-serif">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Заказать индивидуальный расчёт</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-5 leading-normal">
              Оставьте контакты. При отправке формы у вас откроется почтовое приложение для отправки спецификации напрямую на email <strong className="text-amber-500 hover:underline select-all font-semibold">ruslanabdjemilov@gmail.com</strong>.
            </p>

            {messageSubmitted ? (
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-none text-center">
                <Check className="w-8 h-8 text-green-500 mx-auto mb-2 animate-bounce" />
                <h4 className="font-bold text-sm text-zinc-200">Заявка успешно скомпилирована!</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  У вас открылся шаблон письма в почтовой программе. Пожалуйста, завершите отправку сообщения на адрес <span className="underline text-amber-500">ruslanabdjemilov@gmail.com</span> для немедленной записи на звонок к Руслану.
                </p>
                <button
                  type="button"
                  onClick={() => setMessageSubmitted(false)}
                  className="mt-3.5 text-xs underline text-amber-500 hover:text-amber-400 cursor-pointer"
                >
                  Оформить ещё один заказ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                    Ваше Имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например, Александр"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 transition-all font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                      Номер Телефона *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                      Email (опционально)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@mail.ru"
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-none transition-all shadow-md mt-4 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Записаться на звонок через почту</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
