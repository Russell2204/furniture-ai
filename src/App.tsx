import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data';
import { Product, ClientRequest } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import PrdViewer from './components/PrdViewer';
import Footer from './components/Footer';
import { Mail, Phone, Calendar, Clock, Check, X, PhoneCall, Sparkles } from 'lucide-react';

const LOCAL_STORAGE_PRODUCTS_KEY = 'ruslan_furniture_products';
const LOCAL_STORAGE_REQUESTS_KEY = 'ruslan_furniture_requests';

// A template for initial requests so the Admin is beautifully pre-populated!
const SEED_REQUESTS: ClientRequest[] = [
  {
    id: 'req-1',
    name: 'Иван Сергеевич',
    phone: '+7 (911) 234-56-78',
    email: 'ivan_peters@mail.ru',
    furnitureInterest: 'Премиальное Кожаное Кресло «Solo»',
    notes: 'Хочет обивку Palazzo темно-зеленого цвета. Договорились созвониться во вторник в 14:00 для согласования выездных замеров.',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    status: 'new',
  },
  {
    id: 'req-2',
    name: 'Елена прекрасная',
    phone: '+7 (926) 789-10-11',
    email: 'elena_designer@gmail.com',
    furnitureInterest: 'Лаконичный Диван «Nube» в стиле джапанди',
    notes: 'Кастомные размеры: ширина 240 см вместо стандартных 220 см. Букле бельгийское светло-овсяное. Согласовано, аванс внесен.',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'contacted',
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'products' | 'admin' | 'prd'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [activeDetailPageProduct, setActiveDetailPageProduct] = useState<Product | null>(null);
  
  // Products and requests lists
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  
  // Search query & simulated cart counts
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // General booking consultation modal trigger
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  
  // consultation modal form
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalNote, setModalNote] = useState('');
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts(INITIAL_PRODUCTS);
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }

    const savedRequests = localStorage.getItem(LOCAL_STORAGE_REQUESTS_KEY);
    if (savedRequests) {
      try {
        setRequests(JSON.parse(savedRequests));
      } catch (e) {
        setRequests(SEED_REQUESTS);
      }
    } else {
      setRequests(SEED_REQUESTS);
      localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(SEED_REQUESTS));
    }
  }, []);

  // Sync products helper
  const handleAddProduct = (newProd: Product) => {
    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(updated));
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(updated));
    // Fallback if deleted current
    if (selectedProduct.id === id && updated.length > 0) {
      setSelectedProduct(updated[0]);
    }
  };

  // Sync requests Helper
  const handleAddRequest = (reqData: Omit<ClientRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: ClientRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    const updated = [newReq, ...requests];
    setRequests(updated);
    localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(updated));
  };

  const handleUpdateRequestStatus = (requestId: string, newStatus: ClientRequest['status']) => {
    const updated = requests.map((r) => r.id === requestId ? { ...r, status: newStatus } : r);
    setRequests(updated);
    localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(updated));
  };

  const handleDeleteRequest = (id: string) => {
    const updated = requests.filter((r) => r.id !== id);
    setRequests(updated);
    localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(updated));
  };

  // Quick helper to view details
  const handleViewProductDetail = (prod: Product) => {
    setActiveDetailPageProduct(prod);
    setActiveTab('products');
  };

  // Handle general modal submit
  const handleGeneralModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName || !modalPhone) return;

    handleAddRequest({
      name: modalName,
      email: modalEmail || 'не указан',
      phone: modalPhone,
      furnitureInterest: 'Общий заказ / Консультация по материалам',
      notes: modalNote || 'Клиент хочет обратный звонок для обсуждения ассортимента.'
    });

    // mailto action directly to Ruslan's email
    const emailTo = 'ruslanabdjemilov@gmail.com';
    const emailSubject = encodeURIComponent(`Запись на консультацию к Руслану от ${modalName}`);
    const emailBody = encodeURIComponent(
      `Здравствуйте, Руслан!\n\n` +
      `Меня зовут ${modalName}. Я оставляю заявку на консультацию на вашем сайте "Мебель от Руслана".\n\n` +
      `Мой номер телефона: ${modalPhone}\n` +
      `Мой email: ${modalEmail || 'Не указан'}\n` +
      `Комментарий к заказу или пожелания: ${modalNote || 'Общий подбор мебели'}\n\n` +
      `Пожалуйста, свяжитесь со мной при первой возможности.\n\n` +
      `С уважением, ${modalName}.`
    );

    window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

    setModalSubmitted(true);
    setTimeout(() => {
      setIsConsultationModalOpen(false);
      setModalSubmitted(false);
      setModalName('');
      setModalPhone('');
      setModalEmail('');
      setModalNote('');
    }, 4000);
  };

  // Filter products by search query
  const filteredProducts = products.filter((prod) =>
    prod.russianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.russianCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (prod.callouts && prod.callouts.some((c) => c.label.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-[#D4D1C5] font-sans text-[#2C3322] flex flex-col justify-between selection:bg-[#2C3322] selection:text-[#D4D1C5] transition-all duration-500 pb-10">
      
      {/* 1. Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'products') {
            setActiveDetailPageProduct(null);
          }
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (activeTab !== 'products') {
            setActiveTab('products'); // redirect to catalog on search typing
          }
        }}
        cartCount={cartCount}
      />

      {/* 2. Main content pages */}
      <main className="flex-grow">
        
        {/* TAB A: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* Elegant slider / specs focus */}
            {products.length > 0 && (
              <Hero
                products={products.slice(0, 3)}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                onViewProductDetail={(p) => handleViewProductDetail(p)}
                onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
              />
            )}

            {/* Quality USP section */}
            <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/30 backdrop-blur-sm border border-[#2C3322]/10 p-6 rounded-3xl space-y-2">
                <span className="text-sm font-bold text-[#A85135]">01. Бескомпромиссная кожа</span>
                <h4 className="text-lg font-black tracking-tight text-[#2C3322]">Натуральный спилок Palazzo</h4>
                <p className="text-xs text-[#2C3322]/70 leading-normal">
                  Обивка итальянского дубления невероятно мягка на ощупь. Изделия дышат, не истираются и приобретают роскошную винтажную патину со временем.
                </p>
              </div>

              <div className="bg-white/30 backdrop-blur-sm border border-[#2C3322]/10 p-6 rounded-3xl space-y-2">
                <span className="text-sm font-bold text-[#A85135]">02. Роботизированная сталь</span>
                <h4 className="text-lg font-black tracking-tight text-[#2C3322]">Сварка TIG повышенной прочности</h4>
                <p className="text-xs text-[#2C3322]/70 leading-normal">
                  Поворотные основания наших кресел крепятся на герметичных шарикоподшипниках шведского производства. Никакого шума, скрипа или дисбаланса.
                </p>
              </div>

              <div className="bg-white/30 backdrop-blur-sm border border-[#2C3322]/10 p-6 rounded-3xl space-y-2">
                <span className="text-sm font-bold text-[#A85135]">03. Ручной раскрой дерева</span>
                <h4 className="text-lg font-black tracking-tight text-[#2C3322]">Пропаренный Сибирский бук</h4>
                <p className="text-xs text-[#2C3322]/70 leading-normal">
                  Прежде чем стать каркасом, древесина сушится в вакуумных термокамерах до идеальной влажности 8%, исключая ссыхание или трещины в квартирах.
                </p>
              </div>
            </section>

            {/* Featured furniture showcase */}
            <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
              <div className="flex justify-between items-end border-b border-[#2C3322]/10 pb-4 mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#2C3322]/40 font-bold">Лимитированный Выпуск</span>
                  <h2 className="text-2xl font-black mt-1 text-[#2C3322]">Избранные модели коллекции</h2>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="text-xs font-bold text-[#A85135] underline underline-offset-2 hover:text-[#2C3322] transition-colors"
                >
                  Смотреть весь каталог
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onView={(p) => handleViewProductDetail(p)}
                    onAddToCart={(p) => {
                      setCartCount(prev => prev + 1);
                      alert(`Товар "${p.russianName}" добавлен в симулятор корзины!`);
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Direct Call Invitation Banner */}
            <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
              <div className="bg-[#2C3322] text-[#D4D1C5] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-80 h-80 bg-white/3 rounded-full blur-[80px]" />
                <div className="space-y-3 shrink-0 max-w-xl">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#A85135]/90 bg-[#A85135]/13 px-3 py-1 rounded-full w-fit block">
                    Выгода Первого контакта
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                    Хотите потрогать кожу Palazzo до оформления заказа в работу?
                  </h2>
                  <p className="text-xs text-[#D4D1C5]/70 leading-relaxed">
                    Руслан лично приедет к вам в удобное время с каталогом материалов, раскладками швов и проведет подробный бесплатный замер вашей гостиной или рабочего кабинета. Оставьте телефон для быстрой записи.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
                  <div className="text-left w-full sm:w-auto sm:mr-4">
                    <span className="text-[10px] text-white/50 block font-mono">Прямой ящик Руслана:</span>
                    <a href="mailto:ruslanabdjemilov@gmail.com" className="text-sm font-bold text-[#A85135] select-all hover:underline">ruslanabdjemilov@gmail.com</a>
                  </div>
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-[#A85135] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#A85135]/95 shadow-lg shadow-[#A85135]/25 hover:translate-y-[-1px] transition-all whitespace-nowrap active:scale-98 flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Назначить замер</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB B: PRODUCTS CATALOG / DETAIL VIEW */}
        {activeTab === 'products' && (
          <div className="container mx-auto">
            {activeDetailPageProduct ? (
              <ProductDetail
                product={activeDetailPageProduct}
                onBack={() => setActiveDetailPageProduct(null)}
                onSubmitRequest={(req) => handleAddRequest(req)}
              />
            ) : (
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Catalog headers */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2C3322]/10 pb-5 mb-8 gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-[#2C3322]">Полный каталог эксклюзивной мебели</h1>
                    <p className="text-xs text-[#2C3322]/50 mt-0.5">В каталоге вы увидите оригинальные диваны, кресла и индивидуальные пресеты.</p>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#A85135] font-semibold underline"
                    >
                      Сбросить фильтр поиска ("{searchQuery}")
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white/20 border border-[#2C3322]/5 rounded-3xl">
                    <p className="text-sm text-[#2C3322]/50 italic">По вашему запросу мебели не обнаружено. Попробуйте ключевые слова: Кресло, Стул, Диван, или зайдите в панель админа, чтобы добавить новый экспонат в каталог!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onView={(p) => handleViewProductDetail(p)}
                        onAddToCart={(p) => {
                          setCartCount(prev => prev + 1);
                          alert(`Товар "${p.russianName}" добавлен в симулятор корзины!`);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB C: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <AdminPanel
            products={products}
            requests={requests}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onDeleteRequest={handleDeleteRequest}
          />
        )}

        {/* TAB D: PRODUCT REQUIREMENTS DOCUMENT (PRD) */}
        {activeTab === 'prd' && <PrdViewer />}

      </main>

      {/* 3. Global Footer Component */}
      <Footer onOpenConsultationModal={() => setIsConsultationModalOpen(true)} />

      {/* 4. CONSULTATION GENERAL CALL BOOKING OVERLAY MODAL */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 bg-[#2C3322]/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#D4D1C5] border border-[#2C3322]/20 w-full max-w-lg rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden text-[#2C3322]">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A85135]/10 rounded-full blur-2xl" />

            {/* Modal Exit Click */}
            <button
              onClick={() => setIsConsultationModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/50 border border-[#2C3322]/10 text-[#2C3322] hover:bg-[#2C3322]/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {modalSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#2C3322] text-[#D4D1C5] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-black text-[#2C3322]">Ваша Заявка Оформлена!</h3>
                <p className="text-xs text-[#2C3322]/70 leading-relaxed max-w-sm mx-auto">
                  Контактные данные занесены в реестр админ-панели и сформирована почтовая спецификация для отправки на <strong className="font-semibold select-all">ruslanabdjemilov@gmail.com</strong>.
                </p>
                <p className="text-[10px] text-green-700 font-semibold bg-green-50 py-1.5 px-3 rounded-full w-fit mx-auto">
                  Соединение установлено. Пожалуйста, подтвердите отправку письма во всплывающем окне!
                </p>
              </div>
            ) : (
              <form onSubmit={handleGeneralModalSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-[#2C3322] flex items-center justify-center text-[#D4D1C5] text-xs font-bold">
                    Р
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2C3322]/60">Заказ консультации • Мебель от Руслана</span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#2C3322] tracking-tight">Запишитесь на замер у вас дома</h3>
                  <p className="text-xs text-[#2C3322]/60 mt-1 leading-relaxed">
                    Руслан свяжется с вами по указанному телефону для подбора удобного времени приезда с образцами натуральной итальянской кожи.
                  </p>
                </div>

                <div className="space-y-3.5 pt-3">
                  <div>
                    <label className="text-[9px] font-extrabold tracking-wider text-[#2C3322]/60 block uppercase mb-1">Как к вам обращаться *</label>
                    <input
                      type="text"
                      required
                      placeholder="Имя Фамилия"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full bg-white border border-[#2C3322]/15 focus:outline-none focus:border-[#2C3322] rounded-xl px-4 py-2.5 text-xs text-[#2C3322]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-extrabold tracking-wider text-[#2C3322]/60 block uppercase mb-1">Номер телефона *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (999) 000-00-00"
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                        className="w-full bg-white border border-[#2C3322]/15 focus:outline-none focus:border-[#2C3322] rounded-xl px-4 py-2.5 text-xs text-[#2C3322]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-extrabold tracking-wider text-[#2C3322]/60 block uppercase mb-1">Эл. почта</label>
                      <input
                        type="email"
                        placeholder="myemail@yandex.ru"
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        className="w-full bg-white border border-[#2C3322]/15 focus:outline-none focus:border-[#2C3322] rounded-xl px-4 py-2.5 text-xs text-[#2C3322]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-extrabold tracking-wider text-[#2C3322]/60 block uppercase mb-1">Пожелания (какие модели нравятся, размеры)</label>
                    <textarea
                      rows={2.5}
                      placeholder="Например, интересует оливковое кресло в количестве 2 шт."
                      value={modalNote}
                      onChange={(e) => setModalNote(e.target.value)}
                      className="w-full bg-white border border-[#2C3322]/15 focus:outline-none focus:border-[#2C3322] rounded-xl px-4 py-2.5 text-xs text-[#2C3322]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2C3322] hover:bg-[#2C3322]/90 text-[#D4D1C5] hover:text-[#D4D1C5] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-98"
                  >
                    Перейти к отправке на почту
                  </button>
                  <p className="text-[9px] text-center text-[#2C3322]/40">
                    Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
