import React, { useState } from 'react';
import { Product, ClientRequest, ProductCallout } from '../types';
import { Trash, Edit, Plus, FileText, CheckCircle, Clock, AlertCircle, ShoppingBag, Eye } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  requests: ClientRequest[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateRequestStatus: (requestId: string, newStatus: ClientRequest['status']) => void;
  onDeleteRequest: (requestId: string) => void;
}

export default function AdminPanel({
  products,
  requests,
  onAddProduct,
  onDeleteProduct,
  onUpdateRequestStatus,
  onDeleteRequest,
}: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'enquiries'>('enquiries');

  // Add Product Form states
  const [name, setName] = useState('');
  const [russianName, setRussianName] = useState('');
  const [category, setCategory] = useState('Chairs');
  const [russianCategory, setRussianCategory] = useState('Кресла');
  const [price, setPrice] = useState(85000);
  const [description, setDescription] = useState('');
  const [russianDescription, setRussianDescription] = useState('');
  const [selectedImagePreset, setSelectedImagePreset] = useState('/assets/images/olive_leather_chair_1779270207979.png');

  // Dynamic interactive Callouts helper state of the adding product
  const [tempCallouts, setTempCallouts] = useState<ProductCallout[]>([
    { label: 'Премиум набивка', x: 60, y: 40 }
  ]);
  const [newCalloutLabel, setNewCalloutLabel] = useState('');
  const [newCalloutX, setNewCalloutX] = useState(50);
  const [newCalloutY, setNewCalloutY] = useState(50);

  // Specifications
  const [specMaterial, setSpecMaterial] = useState('Натуральная Кожа');
  const [specFrame, setSpecFrame] = useState('Нержавеющая Сталь');

  const handleAddCallout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCalloutLabel) return;
    setTempCallouts([...tempCallouts, {
      label: newCalloutLabel,
      x: newCalloutX,
      y: newCalloutY,
    }]);
    setNewCalloutLabel('');
  };

  const handleClearCallouts = () => {
    setTempCallouts([]);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!russianName || !russianDescription) {
      alert('Пожалуйста, заполните основные поля на русском языке!');
      return;
    }

    const newProd: Product = {
      id: `custom-prod-${Date.now()}`,
      name: name || russianName,
      russianName,
      description: description || russianDescription,
      russianDescription,
      category,
      russianCategory,
      price: Number(price),
      imageUrl: selectedImagePreset,
      callouts: tempCallouts,
      features: tempCallouts.map((c) => c.label),
      specs: [
        { label: 'Материал обивки', value: specMaterial },
        { label: 'Опорная рама', value: specFrame },
        { label: 'Ограничение веса', value: 'До 150кг' },
        { label: 'Гарантийное обслуживание', value: '3 года' }
      ]
    };

    onAddProduct(newProd);

    // Reset Form
    setName('');
    setRussianName('');
    setDescription('');
    setRussianDescription('');
    setPrice(95000);
    setTempCallouts([{ label: 'Натуральная обивка', x: 50, y: 50 }]);
    
    alert('Товар успешно добавлен и опубликован в каталоге!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 bg-transparent text-zinc-300">
      {/* Header and subtabs toggler */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif text-white tracking-wide">Панель Администратора</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Управление коллекцией мебели и входящими обращениями клиентов Руслана.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-none flex gap-1">
          <button
            onClick={() => setActiveSubTab('enquiries')}
            className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === 'enquiries'
                ? 'bg-amber-600 text-black'
                : 'text-zinc-400 hover:text-amber-500'
            }`}
          >
            <span>Заявки ({requests.length})</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === 'catalog'
                ? 'bg-amber-600 text-black'
                : 'text-zinc-400 hover:text-amber-500'
            }`}
          >
            <span>Каталог</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: REQUESTS ENQUIRIES PANEL */}
      {activeSubTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="bg-[#121212] border border-zinc-850 rounded-none p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-100 mb-4 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Список Поступивших Заявок на консультацию</span>
            </h3>

            {requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-zinc-500 italic">Заявок пока не поступало. Оставьте заявку на странице товара, чтобы протестировать этот раздел!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                      <th className="py-3 px-4">Клиент</th>
                      <th className="py-3 px-4">Контакты</th>
                      <th className="py-3 px-4">Интересующая модель</th>
                      <th className="py-3 px-4">Спецификация / Опции</th>
                      <th className="py-3 px-4">Дата создания</th>
                      <th className="py-3 px-4 text-center">Статус связи</th>
                      <th className="py-3 px-4 text-right">Действие</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-zinc-100">{req.name}</td>
                        <td className="py-3.5 px-4 space-y-0.5">
                          <div>Тел: <strong className="font-semibold text-zinc-200">{req.phone}</strong></div>
                          <div className="text-[10px] text-zinc-500 font-mono">{req.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-amber-500">{req.furnitureInterest}</span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="line-clamp-2 text-[11px] text-zinc-400">{req.notes}</p>
                        </td>
                        <td className="py-3.5 px-4 text-[10px] font-mono text-zinc-500">
                          {new Date(req.createdAt).toLocaleString('ru-RU')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex justify-center gap-1">
                            <button
                              onClick={() => onUpdateRequestStatus(req.id, 'new')}
                              className={`px-2.5 py-1 rounded-none text-[9px] font-bold uppercase tracking-wider cursor-pointer ${
                                req.status === 'new'
                                  ? 'bg-amber-600 text-black'
                                  : 'bg-zinc-950 border border-zinc-850 text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              Новый
                            </button>
                            <button
                              onClick={() => onUpdateRequestStatus(req.id, 'contacted')}
                              className={`px-2.5 py-1 rounded-none text-[9px] font-bold uppercase tracking-wider cursor-pointer ${
                                req.status === 'contacted'
                                  ? 'bg-blue-700 text-white'
                                  : 'bg-zinc-950 border border-zinc-850 text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              Связались
                            </button>
                            <button
                              onClick={() => onUpdateRequestStatus(req.id, 'completed')}
                              className={`px-2.5 py-1 rounded-none text-[9px] font-bold uppercase tracking-wider cursor-pointer ${
                                req.status === 'completed'
                                  ? 'bg-green-800 text-white'
                                  : 'bg-zinc-950 border border-zinc-850 text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              Готово
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => onDeleteRequest(req.id)}
                            className="p-1 px-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/25 border border-transparent rounded-none transition-all cursor-pointer"
                            title="Удалить заявку"
                          >
                            <Trash className="w-3.5 h-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: CATALOG EDITOR & PRODUCT ADDITION */}
      {activeSubTab === 'catalog' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add Product Form (Col spans 5) */}
          <div className="lg:col-span-5 bg-[#121212] border border-zinc-850 rounded-none p-6 shadow-xl">
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#d97706] mb-4 flex items-center gap-1.5 border-b border-zinc-805 pb-3">
              <Plus className="w-5 h-5 text-amber-500" />
              <span>Добавить Карточку Мебели</span>
            </h3>

            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Название на Русском *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Вращающееся кресло «Гранд»"
                  value={russianName}
                  onChange={(e) => setRussianName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-650"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Категория (Рус.)
                  </label>
                  <input
                    type="text"
                    value={russianCategory}
                    onChange={(e) => setRussianCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-650"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-650"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Релизное описание (Рус.) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Подробно опишите материалы, комфорт, швы..."
                  value={russianDescription}
                  onChange={(e) => setRussianDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-650"
                />
              </div>

              {/* Specs declaration */}
              <div className="grid grid-cols-2 gap-3 bg-zinc-950 border border-zinc-850 p-3.5 rounded-none">
                <div>
                  <label className="text-[8px] font-bold tracking-widest text-zinc-500 block mb-1 uppercase">Материал обивки</label>
                  <input
                    type="text"
                    value={specMaterial}
                    onChange={(e) => setSpecMaterial(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-2 py-1.5 text-xs text-zinc-200"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-bold tracking-widest text-zinc-500 block mb-1 uppercase">Опорная рама</label>
                  <input
                    type="text"
                    value={specFrame}
                    onChange={(e) => setSpecFrame(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-600 focus:outline-none rounded-none px-2 py-1.5 text-xs text-zinc-200"
                  />
                </div>
              </div>

              {/* Predefined Beautiful 3D Renders Picker closely matched */}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Визуальный 3D Рендер (выберите шаблон):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { path: '/assets/images/olive_leather_chair_1779270207979.png', label: 'Оливковое Кресло' },
                    { path: '/assets/images/blue_ergonomic_chair_1779270230212.png', label: 'Голубой Aero' },
                    { path: '/assets/images/minimalist_sofa_1779270251685.png', label: 'Диван «Nube»' },
                  ].map((preset) => (
                    <div
                      key={preset.path}
                      onClick={() => setSelectedImagePreset(preset.path)}
                      className={`cursor-pointer p-2 rounded-none border text-center transition-all flex flex-col items-center gap-1.5 ${
                        selectedImagePreset === preset.path
                          ? 'border-amber-600 bg-amber-600/10 text-amber-500 font-bold text-xs'
                          : 'border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 text-[10px]'
                      }`}
                    >
                      <img
                        src={preset.path}
                        alt={preset.label}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-contain bg-zinc-950 rounded p-0.5"
                      />
                      <span className="truncate w-full text-[9px] block text-zinc-400">{preset.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Tag/Callout Injector */}
              <div className="border border-zinc-800 p-3.5 bg-zinc-950/60 rounded-none">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Интерактивные маркеры ({tempCallouts.length})</span>
                  <button
                    type="button"
                    onClick={handleClearCallouts}
                    className="text-[10px] font-bold text-red-400 hover:underline cursor-pointer"
                  >
                    Сбросить
                  </button>
                </div>
                
                {/* List of current callouts before publishing */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tempCallouts.map((c, i) => (
                    <span key={i} className="bg-zinc-900 px-2.5 py-1 border border-zinc-800 rounded-none text-[9px] text-zinc-300 font-bold">
                      {c.label} ({c.x}%, {c.y}%)
                    </span>
                  ))}
                </div>

                {/* Addition controls */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Название нового маркера (напр. Литая сталь)"
                    value={newCalloutLabel}
                    onChange={(e) => setNewCalloutLabel(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-none px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none"
                  />
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <span className="text-[8px] text-zinc-500 block">X: {newCalloutX}%</span>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={newCalloutX}
                        onChange={(e) => setNewCalloutX(Number(e.target.value))}
                        className="w-full accent-amber-600 h-1 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[8px] text-zinc-500 block">Y: {newCalloutY}%</span>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={newCalloutY}
                        onChange={(e) => setNewCalloutY(Number(e.target.value))}
                        className="w-full accent-amber-600 h-1 cursor-pointer"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCallout}
                      className="px-3 py-1.5 bg-amber-600 text-black font-bold text-xs uppercase tracking-wider rounded-none hover:bg-amber-500 transition-all cursor-pointer"
                    >
                      + Точка
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs tracking-widest uppercase rounded-none transition-all shadow-md mt-4 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Опубликовать в каталоге</span>
              </button>
            </form>
          </div>

          {/* Current Catalog Table (Col spans 7) */}
          <div className="lg:col-span-7 bg-[#121212] border border-zinc-850 rounded-none p-6 shadow-xl">
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#d97706] mb-4 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <span>База моделей в каталоге ({products.length})</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-widest font-bold text-[9px]">
                    <th className="py-2.5 px-2">Миниатюра</th>
                    <th className="py-2.5 px-2">Русское Имя</th>
                    <th className="py-2.5 px-2">Категория</th>
                    <th className="py-2.5 px-2">Цена в Рублях</th>
                    <th className="py-2.5 px-2 text-right">Удаление</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-zinc-950 transition-colors">
                      <td className="py-2 px-2">
                        <img
                          src={prod.imageUrl}
                          alt={prod.russianName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-contain bg-zinc-950 border border-zinc-800 rounded p-0.5"
                        />
                      </td>
                      <td className="py-2 px-2 font-bold font-serif text-zinc-200">{prod.russianName}</td>
                      <td className="py-2 px-2">
                        <span className="bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-none text-[9px] text-amber-500 font-bold uppercase tracking-wider">
                          {prod.russianCategory}
                        </span>
                      </td>
                      <td className="py-2 px-2 font-mono text-zinc-100 font-medium">
                        {prod.price.toLocaleString('ru-RU')} ₽
                      </td>
                      <td className="py-2 px-2 text-right">
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1 px-2.5 text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-transparent rounded-none transition-colors cursor-pointer"
                          title="Исключить товар из базы"
                        >
                          <Trash className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 bg-zinc-950 border border-zinc-850 rounded-none flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-zinc-400 leading-normal">
                <strong className="text-zinc-200 font-bold block mb-0.5">Внимание администратора</strong>
                При добавлении нового товара кастомные интерактивные Callout-метки отрисовываются на изображении товара мгновенно посредством встроенного векторного оверлея. Используйте смещения X и Y, чтобы поставить точки на швы или основание перед публикацией.
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
