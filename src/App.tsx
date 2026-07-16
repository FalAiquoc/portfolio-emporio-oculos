import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

// Componente de Logotipo Vetorial Fiel ao Logo Real com texto do Novo HTML
// Componente de Logotipo Fiel ao Logo Real (Logo oficial por imagem ou óculos estilizado SVG como fallback)
function Logo({ className = "h-10", dark = false, horizontal = true }: { className?: string; dark?: boolean; horizontal?: boolean }) {
  const iconColor = dark ? "#E30613" : "#FFFFFF";
  const textColor = dark ? "#0F172A" : "#FFFFFF";
  const subtextColor = dark ? "#E30613" : "#FFFFFF";

  const logoImg = storeData.logoUrl ? (
    <img src={storeData.logoUrl} alt={storeData.name} className="h-8 w-auto object-contain rounded-sm border border-red-500/10" />
  ) : null;

  const iconSvg = (
    <svg className="h-full aspect-[2/1] overflow-visible" viewBox="0 0 720 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={iconColor} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 180 150 C 210 90, 310 90, 340 150" />
        <path d="M 180 190 C 210 250, 310 250, 340 190" />
        <path d="M 380 150 C 410 90, 510 90, 540 150" />
        <path d="M 380 190 C 410 250, 510 250, 540 190" />
        <path d="M 336 160 C 346 150, 374 150, 384 160" strokeWidth="14" />
        <path d="M 190 155 C 130 155, 100 200, 100 240 C 100 270, 120 270, 125 250 C 130 230, 150 180, 190 180" fill={iconColor} stroke="none" />
        <path d="M 530 155 C 590 155, 620 200, 620 240 C 620 270, 600 270, 595 250 C 590 230, 570 180, 530 180" fill={iconColor} stroke="none" />
        <path d="M 198 170 L 322 170" strokeWidth="12" />
        <path d="M 398 170 L 522 170" strokeWidth="12" />
      </g>
    </svg>
  );

  if (horizontal) {
    return (
      <div className={`flex items-center space-x-2.5 ${className}`}>
        <div className="h-full py-0.5 flex items-center">
          {logoImg || iconSvg}
        </div>
        <div className="flex flex-col leading-[0.95] text-left">
          <span className="text-base sm:text-lg font-black tracking-[0.05em] font-display" style={{ color: textColor }}>EMPÓRIO</span>
          <span className="text-[12px] sm:text-[13px] font-black tracking-[0.18em] font-display" style={{ color: subtextColor }}>DOS ÓCULOS</span>
          <span className="text-[7px] font-bold tracking-[0.15em] text-slate-400 font-display">ATACADO DA PRUDENTE</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="h-16 sm:h-20 flex items-center justify-center">
        {logoImg || iconSvg}
      </div>
      <div className="mt-3 flex flex-col leading-[1.0] font-display">
        <span className="text-2xl sm:text-3xl font-black tracking-[0.08em]" style={{ color: textColor }}>EMPÓRIO</span>
        <span className="text-xl sm:text-2xl font-black tracking-[0.2em] mt-1" style={{ color: subtextColor }}>DOS ÓCULOS</span>
        <span className="text-[10px] font-bold tracking-[0.22em] text-slate-400 mt-1">ATACADO DA PRUDENTE</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedFaceShape, setSelectedFaceShape] = useState<string>('Oval');
  const [activeCategory, setActiveCategory] = useState<'grau' | 'sol' | 'lente'>('grau');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Formatos de Rosto para Visagismo
  const faceShapes = [
    { name: 'Oval', description: 'Combina com quase todas as armações. Lentes retangulares e quadradas trazem mais impacto visual.', tips: 'Modelos clássicos esportivos ou retangulares destacam a harmonia natural.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300' },
    { name: 'Redondo', description: 'Precisa de linhas marcantes. Ideal: Armações quadradas e retangulares com ângulos bem retos.', tips: 'Evite óculos redondos, pois eles acentuam o formato circular do rosto.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300' },
    { name: 'Quadrado', description: 'Precisa suavizar as linhas marcadas da mandíbula. Ideal: Armações redondas, ovais ou gatinho.', tips: 'Modelos com fio de nylon ou armações redondas de acetato são ótimas opções.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300' },
    { name: 'Coração', description: 'Testa levemente larga e queixo fino. Ideal: Armações ovais ou clássicas aviadoras.', tips: 'Prefira armações de metal fino ou estilo invisível (sem aro).', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300' }
  ];

  const brands = storeData.brands || [];

  // Injeção de fontes e cores dinâmicas via CSS variables
  useEffect(() => {
    if (storeData.typography.importUrl) {
      const linkId = 'store-google-fonts';
      let fontLink = document.getElementById(linkId) as HTMLLinkElement;
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = linkId;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
      fontLink.href = storeData.typography.importUrl;
    }

    const root = document.documentElement;
    root.style.setProperty('--font-display-family', storeData.typography.displayFontFamily);
    root.style.setProperty('--font-body-family', storeData.typography.bodyFontFamily);

    root.style.setProperty('--p-50', '#FAF9F6');
    root.style.setProperty('--p-100', '#F3F2EC');
    root.style.setProperty('--p-200', '#E5E3D8');
    root.style.setProperty('--p-300', '#D0CDBC');
    root.style.setProperty('--p-400', '#A19D87');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Vermelho Oficial
    root.style.setProperty('--p-600', '#B5020B');
    root.style.setProperty('--p-700', '#8D0007');
    root.style.setProperty('--p-800', '#590003');
    root.style.setProperty('--p-900', '#000000');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Slate Escuro
    root.style.setProperty('--a-600', '#080C16');
    root.style.setProperty('--a-700', '#030508');

    document.title = `${storeData.name} — Atacado da Prudente`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (msg?: string) => {
    const defaultMsg = msg || storeData.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encodeURIComponent(defaultMsg)}`;
  };

  const categories = [
    { id: 'grau', label: 'Armações de Grau', icon: 'Glasses' },
    { id: 'sol', label: 'Óculos de Sol', icon: 'Sun' },
    { id: 'lente', label: 'Lentes Especiais', icon: 'ShieldCheck' }
  ] as const;

  // Filtragem avançada com base na aba ativa e na busca
  const filteredProducts = storeData.products.filter(p => {
    const matchesCategory = p.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[var(--p-50)] text-slate-800 antialiased selection:bg-[#E30613] selection:text-white font-body">
      
      {/* Estilos inline para letreiro e animações do dropdown */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .submenu-hover:hover .submenu-dropdown {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ===================== TICKER / MARQUEE DE IMPACTO COMERCIAL ===================== */}
      <div className="bg-slate-950 text-white py-2.5 overflow-hidden border-b border-[#E30613]/40 text-[10px] font-black tracking-widest uppercase relative z-50">
        <div className="animate-marquee whitespace-nowrap flex space-x-12">
          <span>🔥 PROMOÇÃO DE INAUGURAÇÃO: COMPRE A ARMAÇÃO E GANHE O EXAME DE VISTA CORTESIA!</span>
          <span>🕶️ ATACADO DE ÓCULOS: PREÇOS DIRETO DE FÁBRICA EM ATÉ 10X SEM JUROS!</span>
          <span>🚚 ENTREGA EXPRESSA PARA TODA A GRANDE NATAL E PARNAMIRIM!</span>
          <span>🔥 PROMOÇÃO DE INAUGURAÇÃO: COMPRE A ARMAÇÃO E GANHE O EXAME DE VISTA CORTESIA!</span>
          <span>🕶️ ATACADO DE ÓCULOS: PREÇOS DIRETO DE FÁBRICA EM ATÉ 10X SEM JUROS!</span>
          <span>🚚 ENTREGA EXPRESSA PARA TODA A GRANDE NATAL E PARNAMIRIM!</span>
        </div>
      </div>

      {/* ===================== TOPBAR OFICIAL (Do novo HTML) ===================== */}
      <div className="bg-slate-900 text-slate-400 text-xs py-2 border-b border-slate-850 relative z-50 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5"><Icon name="Phone" size={13} className="text-[#E30613]" /> (84) 2030-3145</span>
            <span className="flex items-center gap-1.5"><Icon name="Mail" size={13} className="text-[#E30613]" /> contato@emporiodosoculos.com.br</span>
            <a href="#localizacao" className="hover:text-white flex items-center gap-1.5 transition-colors"><Icon name="MapPin" size={13} className="text-[#E30613]" /> Nossas lojas</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#simulador" className="hover:text-white transition-colors">Ajuda</a>
            <a href={getWhatsAppLink('Olá! Gostaria de consultar os meus pedidos.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Meus pedidos</a>
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-700">
              {storeData.instagramUrl && <a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Instagram" size={14} /></a>}
              {storeData.facebookUrl && <a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Facebook" size={14} /></a>}
              <a href="#" className="hover:text-white transition-colors"><Icon name="Youtube" size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== HEADER PRINCIPAL (União de design e novas ações) ===================== */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-white shadow-lg py-2 border-b border-slate-100' : 'top-0 sm:top-18 bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <a href="#hero" className="flex items-center transition-transform hover:scale-101 shrink-0">
              <Logo className="h-10 sm:h-11" dark={scrolled || true} />
            </a>
            
            {/* Barra de Busca Premium */}
            <div className="hidden md:flex items-center flex-1 max-w-md bg-slate-100 hover:bg-slate-200/70 border border-transparent focus-within:border-[#E30613]/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#E30613]/10 px-4 py-2 transition-all">
              <input 
                type="text" 
                placeholder="Busque por marca, modelo ou estilo..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 font-medium"
              />
              <button className="text-slate-400 hover:text-[#E30613] transition-colors">
                <Icon name="Search" size={16} />
              </button>
            </div>

            {/* Ações de Conta, Favoritos, Carrinho e WhatsApp */}
            <div className="flex items-center space-x-5 shrink-0">
              
              <div className="hidden lg:flex items-center space-x-4">
                <a href={getWhatsAppLink('Olá! Quero gerenciar a minha conta de atacado.')} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-slate-500 hover:text-[#E30613] transition-colors">
                  <Icon name="User" size={18} />
                  <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Conta</span>
                </a>
                <a href={getWhatsAppLink('Olá! Gostaria de consultar os itens da minha lista de favoritos.')} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-slate-500 hover:text-[#E30613] transition-colors">
                  <Icon name="Heart" size={18} />
                  <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Favoritos</span>
                </a>
                <a href={getWhatsAppLink('Olá! Quero finalizar o orçamento dos 2 itens do meu carrinho.')} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-slate-500 hover:text-[#E30613] transition-colors relative">
                  <Icon name="ShoppingCart" size={18} />
                  <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Carrinho</span>
                  <span className="absolute -top-1.5 -right-2 bg-[#E30613] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">2</span>
                </a>
              </div>

              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-[#25d366] hover:bg-[#1da851] transition-all border border-[#25d366] shadow-md"
              >
                <Icon name="MessageSquare" className="mr-2" size={14} /> Fale conosco
              </a>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-700 hover:text-[#E30613] transition-colors">
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>

            </div>
          </div>
        </div>

        {/* ===================== MENU DE NAVEGAÇÃO COM SUBMENUS DROPDOWN (Estilo Diniz/Ray-Ban) ===================== */}
        <nav className="hidden lg:block border-t border-slate-100 mt-2 bg-white text-slate-700 text-xs font-bold uppercase tracking-wider">
          <div className="max-w-7xl mx-auto px-8">
            <ul className="flex items-center justify-start space-x-1">
              <li>
                <a href="#hero" className="block py-3 px-4 border-b-2 border-transparent text-[#E30613] border-[#E30613]">Início</a>
              </li>
              
              {/* Dropdown Óculos de Sol */}
              <li className="relative group submenu-hover">
                <a href="#produtos" onClick={() => setActiveCategory('sol')} className="flex items-center py-3 px-4 border-b-2 border-transparent hover:border-[#E30613] hover:text-[#E30613] transition-all gap-1">
                  Óculos de Sol <Icon name="ChevronDown" size={11} />
                </a>
                <ul className="absolute hidden submenu-dropdown top-full left-0 bg-white border border-slate-100 shadow-2xl py-2 min-w-[200px] z-50 text-slate-700 text-left normal-case font-medium">
                  <li><a href="#produtos" onClick={() => { setActiveCategory('sol'); setSearchQuery(''); }} className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors">🕶️ Coleção Masculina</a></li>
                  <li><a href="#produtos" onClick={() => { setActiveCategory('sol'); setSearchQuery(''); }} className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors">💃 Coleção Feminina</a></li>
                  <li><a href="#produtos" onClick={() => { setActiveCategory('sol'); setSearchQuery(''); }} className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors">🔥 Unissex Concept</a></li>
                  <li><a href="#produtos" onClick={() => { setActiveCategory('sol'); setSearchQuery(''); }} className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors">🚴 Linha Esportiva</a></li>
                </ul>
              </li>

              {/* Dropdown Óculos de Grau */}
              <li className="relative group submenu-hover">
                <a href="#produtos" onClick={() => setActiveCategory('grau')} className="flex items-center py-3 px-4 border-b-2 border-transparent hover:border-[#E30613] hover:text-[#E30613] transition-all gap-1">
                  Óculos de Grau <Icon name="ChevronDown" size={11} />
                </a>
                <ul className="absolute hidden submenu-dropdown top-full left-0 bg-white border border-slate-100 shadow-2xl py-2 min-w-[200px] z-50 text-slate-700 text-left normal-case font-medium">
                  <li><a href="#produtos" onClick={() => { setActiveCategory('grau'); setSearchQuery(''); }} className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors">👓 Masculino Premium</a></li>
                  <li><a href="#produtos" onClick={() => { setActiveCategory('grau'); setSearchQuery(''); }} className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors">👩 Feminino Visagista</a></li>
                  <li><a href="#produtos" onClick={() => { setActiveCategory('grau'); setSearchQuery(''); }} className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors">🧒 Infantil Flexível</a></li>
                </ul>
              </li>

              <li>
                <a href="#produtos" onClick={() => setActiveCategory('lente')} className="block py-3 px-4 border-b-2 border-transparent hover:border-[#E30613] hover:text-[#E30613] transition-all">Lentes de Contato</a>
              </li>

              {/* Dropdown Marcas */}
              <li className="relative group submenu-hover">
                <a href="#produtos" className="flex items-center py-3 px-4 border-b-2 border-transparent hover:border-[#E30613] hover:text-[#E30613] transition-all gap-1">
                  Marcas <Icon name="ChevronDown" size={11} />
                </a>
                <ul className="absolute hidden submenu-dropdown top-full left-0 bg-white border border-slate-100 shadow-2xl py-2 min-w-[200px] z-50 text-slate-700 text-left normal-case font-medium">
                  {brands.map((b) => (
                    <li key={b.name}>
                      <a 
                        href="#produtos" 
                        onClick={() => { setActiveCategory('sol'); setSearchQuery(b.name); }} 
                        className="block px-4 py-2 hover:bg-slate-50 hover:text-[#E30613] transition-colors font-bold uppercase text-[10px] tracking-wider"
                      >
                        {b.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li><a href="#produtos" onClick={() => { setActiveCategory('sol'); setSearchQuery('Ray-Ban'); }} className="block py-3 px-4 border-b-2 border-transparent hover:border-[#E30613] hover:text-[#E30613] transition-all text-[#E30613]">Ofertas</a></li>
              <li><a href="#produtos" onClick={() => { setActiveCategory('lente'); setSearchQuery(''); }} className="block py-3 px-4 border-b-2 border-transparent hover:border-[#E30613] hover:text-[#E30613] transition-all">Lentes</a></li>
              <li><a href="#simulador" className="block py-3 px-4 border-b-2 border-transparent hover:border-[#E30613] hover:text-[#E30613] transition-all">Visagismo</a></li>
            </ul>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F172A] border-t border-slate-800 px-4 pt-4 pb-6 space-y-4 shadow-2xl text-slate-300 text-sm font-semibold">
            {/* Campo de Busca Mobile */}
            <div className="flex items-center bg-slate-800 border border-slate-700 px-3 py-2">
              <input 
                type="text" 
                placeholder="Busque por marca ou modelo..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-slate-500 font-medium"
              />
              <Icon name="Search" size={14} className="text-slate-500" />
            </div>
            
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-800 hover:text-[#E30613]">Início</a>
            
            <div>
              <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Coleções</span>
              <div className="grid grid-cols-2 gap-2 pl-2">
                <a href="#produtos" onClick={() => { setMobileMenuOpen(false); setActiveCategory('sol'); }} className="block py-1 text-xs hover:text-[#E30613]">🕶️ Óculos de Sol</a>
                <a href="#produtos" onClick={() => { setMobileMenuOpen(false); setActiveCategory('grau'); }} className="block py-1 text-xs hover:text-[#E30613]">👓 Óculos de Grau</a>
                <a href="#produtos" onClick={() => { setMobileMenuOpen(false); setActiveCategory('lente'); }} className="block py-1 text-xs hover:text-[#E30613]">🧪 Lentes Especiais</a>
              </div>
            </div>

            <div>
              <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Nossas Marcas</span>
              <div className="grid grid-cols-3 gap-2 pl-2 text-[10px] uppercase font-bold">
                {brands.map(b => (
                  <a key={b.name} href="#produtos" onClick={() => { setMobileMenuOpen(false); setActiveCategory('sol'); setSearchQuery(b.name); }} className="block py-1 hover:text-[#E30613]">{b.name}</a>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <a href={getWhatsAppLink('Olá, gostaria de acessar a minha conta.')} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-slate-300 hover:text-[#E30613]"><Icon name="User" size={16} className="mr-2" /> Minha Conta</a>
              <a href={getWhatsAppLink('Olá, gostaria de ver meus favoritos.')} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-slate-300 hover:text-[#E30613]"><Icon name="Heart" size={16} className="mr-2" /> Favoritos</a>
              <a href={getWhatsAppLink('Olá, gostaria de fechar meu carrinho.')} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-slate-300 hover:text-[#E30613]"><Icon name="ShoppingCart" size={16} className="mr-2" /> Carrinho (2 itens)</a>
            </div>

            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#25d366] hover:bg-[#1da851]">
              <Icon name="MessageSquare" className="mr-2" size={16} /> WhatsApp Atendimento
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION - Ray-Ban Cinematic Dark Aesthetics com textos do novo HTML */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-60 md:pb-36 bg-slate-950 text-white overflow-hidden border-b-4 border-[#E30613]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] rounded-full bg-[#E30613] filter blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/12 w-[650px] h-[650px] rounded-full bg-[#E30613] filter blur-[180px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Comercial em High Contrast */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-none text-xs font-black tracking-widest uppercase border border-[#E30613]/50 bg-[#E30613]/25 text-[#E30613]">
                🔥 ATACADÃO DE ÓCULOS DE NATAL/RN
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[0.95] text-white uppercase">
                Estilo único, <br />
                <span className="text-[#E30613] italic font-medium">preço de fábrica.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                As melhores marcas de óculos de sol e de grau com os preços do atacado de verdade. Venha conferir no showroom do Carrefour Zona Sul na <strong>Av. Prudente de Morais, 3720 – Natal/RN</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-white bg-[#E30613] hover:bg-[#B5020B] rounded-none transition-all shadow-lg hover:shadow-[#E30613]/30">
                  <Icon name="Phone" className="mr-2" size={16} /> Falar com Atendente
                </a>
                <a href="#simulador" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-white border border-slate-700 hover:border-white hover:bg-white/10 rounded-none transition-all">
                  <Icon name="Eye" className="mr-2" size={16} /> Mapeamento Visagista
                </a>
              </div>
            </div>

            {/* Imagem de Destaque */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 border border-[#E30613]/40 transform translate-x-3 translate-y-3 pointer-events-none"></div>
                <div className="relative bg-black p-3 border border-slate-800 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800" 
                    alt="Modelo Óculos de Sol Ray-Ban Style" 
                    className="w-full h-[400px] object-cover filter contrast-[1.08] brightness-[0.92]" 
                  />
                  <div className="absolute bottom-6 left-6 bg-slate-950/95 backdrop-blur-sm border-l-4 border-[#E30613] text-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#E30613] font-black">Lentes Computadorizadas</p>
                    <p className="text-xs text-slate-300 font-light mt-0.5">Montagem rápida em até 1 hora</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== CARROSSEL DE GRIFES PARCEIRAS (Ray-Ban + Diniz Style) ===================== */}
      <section className="py-10 bg-[#070d1e] border-y border-[#E30613]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[10px] tracking-widest uppercase text-slate-400 font-bold mb-6">Grifes e Marcas Disponíveis</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 items-center justify-items-center opacity-85">
            {brands.map((brand, idx) => (
              <div key={idx} className="text-center group pointer-events-none">
                <span className="font-display text-base sm:text-lg tracking-widest text-slate-300 font-semibold italic border-b border-[#E30613]/20 pb-1 group-hover:text-[#E30613] transition-colors">
                  {brand.name}
                </span>
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-1">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BENEFÍCIOS E DIFERENCIAIS (Trust Badges Estilo Diniz + Novo HTML) ===================== */}
      <section className="py-8 bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none border border-[#E30613]/25">
                <Icon name="Tag" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Preço de Atacado</h4>
              <p className="text-[10px] text-slate-400">Valores imbatíveis direto de fábrica para você economizar.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none border border-[#E30613]/25">
                <Icon name="Activity" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Laboratório Próprio</h4>
              <p className="text-[10px] text-slate-400">Precisão digital alemã na montagem ágil das suas lentes.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none border border-[#E30613]/25">
                <Icon name="Award" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Originalidade Garantida</h4>
              <p className="text-[10px] text-slate-400">Garantia e nota fiscal nas principais grifes mundiais.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none border border-[#E30613]/25">
                <Icon name="Truck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Entrega Expressa</h4>
              <p className="text-[10px] text-slate-400">Atendimento ultra rápido em toda a Natal e região metropolitana.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center col-span-2 md:col-span-1">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none border border-[#E30613]/25">
                <Icon name="Lock" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Compra 100% Segura</h4>
              <p className="text-[10px] text-slate-400">Ambiente físico protegido com selos de conformidade ANVISA.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SIMULADOR DE VISAGISMO DIGITAL */}
      <section id="simulador" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">Design Sob Medida</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Mapeamento de Linhas e <span className="text-[#E30613] italic font-medium">Visagismo Digital</span>
            </h2>
            <div className="w-16 h-1 bg-[#E30613] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Selecione o formato do seu rosto abaixo para mapearmos as linhas de expressão correspondentes e indicarmos os óculos ideais para você.
            </p>
          </div>

          <div className="bg-[#F7F6F2] border border-slate-200 rounded-none p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Seleção do Rosto */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-lg font-display font-black text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wider">Qual o seu formato facial?</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {faceShapes.map((shape) => (
                    <button
                      key={shape.name}
                      onClick={() => setSelectedFaceShape(shape.name)}
                      className={`p-5 text-left border rounded-none transition-all duration-300 ${
                        selectedFaceShape === shape.name
                          ? 'bg-[#E30613] text-white border-[#E30613] shadow-lg'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-[#E30613]'
                      }`}
                    >
                      <span className="block font-display font-black text-lg uppercase tracking-wide">{shape.name}</span>
                      <span className="block text-xs opacity-75 mt-1 line-clamp-1">{shape.description}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-white p-6 border border-slate-200 shadow-inner space-y-4 mt-6">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center">
                    <Icon name="Award" className="text-[#E30613] mr-2" size={18} />
                    Armações Recomendadas para Rosto {selectedFaceShape}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faceShapes.find(s => s.name === selectedFaceShape)?.description}
                  </p>
                  <div className="bg-[#E30613]/5 p-4 border-l-2 border-[#E30613] text-xs text-slate-700 leading-relaxed">
                    🎯 <strong>Dica do Visagista:</strong> {faceShapes.find(s => s.name === selectedFaceShape)?.tips}
                  </div>
                  
                  <div className="pt-2">
                    <a 
                      href={getWhatsAppLink(`Olá, fiz o mapeamento de visagismo digital para o rosto ${selectedFaceShape}. Gostaria de ver o catálogo de modelos disponíveis para esse formato.`)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#E30613] hover:text-[#B5020B]"
                    >
                      Ver modelos no WhatsApp <Icon name="ChevronRight" className="ml-1" size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Simulador Interativo */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
                
                <div className="relative w-full max-w-xs h-80 border border-slate-200 bg-[#0F172A] rounded-none p-6 flex flex-col items-center justify-between shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f005_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                  
                  <div className="text-[10px] uppercase tracking-widest text-[#E30613] font-bold">Mapeamento Visagista Digital</div>

                  <svg className="w-44 h-44" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Linhas guias do Rosto */}
                    {selectedFaceShape === 'Oval' && (
                      <rect x="52" y="32" width="96" height="136" rx="48" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                    )}
                    {selectedFaceShape === 'Redondo' && (
                      <circle cx="100" cy="100" r="66" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                    )}
                    {selectedFaceShape === 'Quadrado' && (
                      <rect x="42" y="42" width="116" height="116" rx="14" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                    )}
                    {selectedFaceShape === 'Coração' && (
                      <path d="M100,158 C45,108 45,46 100,46 C155,46 155,108 100,158 Z" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                    )}

                    {/* Detalhes faciais */}
                    <path d="M68,76 Q80,72 90,76" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M110,76 Q120,72 132,76" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M100,85 L100,108 Q100,113 105,113" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M82,132 Q100,140 118,132" stroke="#E30613" strokeWidth="2" strokeLinecap="round" />

                    {/* Óculos recomendados */}
                    {selectedFaceShape === 'Oval' && (
                      <g className="transition-all duration-300">
                        <rect x="54" y="80" width="38" height="22" rx="2" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.12"/>
                        <rect x="108" y="80" width="38" height="22" rx="2" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.12"/>
                        <line x1="92" y1="88" x2="108" y2="88" stroke="#E30613" strokeWidth="3"/>
                        <line x1="54" y1="86" x2="42" y2="81" stroke="#E30613" strokeWidth="2"/>
                        <line x1="146" y1="86" x2="158" y2="81" stroke="#E30613" strokeWidth="2"/>
                      </g>
                    )}
                    {selectedFaceShape === 'Redondo' && (
                      <g className="transition-all duration-300">
                        <rect x="52" y="78" width="40" height="24" rx="0" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.15"/>
                        <rect x="108" y="78" width="40" height="24" rx="0" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.15"/>
                        <line x1="92" y1="86" x2="108" y2="86" stroke="#E30613" strokeWidth="3"/>
                        <line x1="52" y1="84" x2="40" y2="78" stroke="#E30613" strokeWidth="2"/>
                        <line x1="148" y1="84" x2="160" y2="78" stroke="#E30613" strokeWidth="2"/>
                      </g>
                    )}
                    {selectedFaceShape === 'Quadrado' && (
                      <g className="transition-all duration-300">
                        <circle cx="71" cy="90" r="17" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.15"/>
                        <circle cx="129" cy="90" r="17" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.15"/>
                        <line x1="88" y1="90" x2="112" y2="90" stroke="#E30613" strokeWidth="3"/>
                        <line x1="54" y1="88" x2="42" y2="82" stroke="#E30613" strokeWidth="2"/>
                        <line x1="146" y1="88" x2="158" y2="82" stroke="#E30613" strokeWidth="2"/>
                      </g>
                    )}
                    {selectedFaceShape === 'Coração' && (
                      <g className="transition-all duration-300">
                        <path d="M53,78 Q72,78 88,80 Q88,102 70,102 Q53,102 53,78 Z" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.12"/>
                        <path d="M112,80 Q128,78 147,78 Q147,102 130,102 Q112,102 112,80 Z" stroke="#E30613" strokeWidth="3" fill="#E30613" fillOpacity="0.12"/>
                        <line x1="88" y1="82" x2="112" y2="82" stroke="#E30613" strokeWidth="3"/>
                        <line x1="90" y1="86" x2="110" y2="86" stroke="#E30613" strokeWidth="2"/>
                        <line x1="53" y1="82" x2="41" y2="76" stroke="#E30613" strokeWidth="2"/>
                        <line x1="147" y1="82" x2="159" y2="76" stroke="#E30613" strokeWidth="2"/>
                      </g>
                    )}
                  </svg>

                  <div className="text-[9px] text-[#E30613] font-mono tracking-wider flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]"></span>
                    Alinhamento Óptico Ideal
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400 font-medium">Recomendação baseada em visagismo clássico</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===================== SEÇÃO: TECNOLOGIA DE LENTES (WOW Factor) ===================== */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E30613] filter blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">Tecnologia & Conforto</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase">
              Alta tecnologia para a <span className="text-[#E30613] italic font-medium">sua visão</span>
            </h2>
            <div className="w-16 h-1 bg-[#E30613] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Não vendemos apenas armações. Oferecemos tratamentos de última geração para proteger seus olhos no dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#E30613] transition-all">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none inline-block">
                <Icon name="Laptop" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Filtro de Luz Azul</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Protege seus olhos contra a luz nociva de telas de computador e smartphones, reduzindo a fadiga ocular e a insônia.</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#E30613] transition-all">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none inline-block">
                <Icon name="Sun" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Lentes Polarizadas</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Bloqueiam reflexos de luz intensos em superfícies como asfalto e água. Ideal para dirigir sob luz solar forte.</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#E30613] transition-all">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none inline-block">
                <Icon name="ShieldAlert" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Anti-risco & Anti-sujeira</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Tratamento hidrofóbico especial que repele poeira, impressões digitais e água, facilitando a limpeza das lentes.</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#E30613] transition-all">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none inline-block">
                <Icon name="Activity" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Tratamento UV400</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Proteção total e definitiva contra os raios UVA e UVB nocivos do sol, prevenindo o envelhecimento ocular precoce.</p>
            </div>

          </div>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS COM FILTRAGEM E NOVAS MARCAS DO ATACADO */}
      <section id="produtos" className="py-24 bg-[#FAF9F6] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">Coleções de Vitrine</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              PRODUTOS EM <span className="text-[#E30613] italic font-medium">PREÇO DE ATACADO</span>
            </h2>
            <div className="w-16 h-1 bg-[#E30613] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Navegue através dos filtros para visualizar as grifes originais. Use a busca no topo para refinar por modelo (ex: "Wayfarer").
            </p>
            {searchQuery && (
              <div className="inline-flex items-center gap-2 bg-[#E30613]/10 border border-[#E30613]/25 px-3 py-1 text-xs text-[#E30613]">
                🔍 Filtrado por: <strong>"{searchQuery}"</strong>
                <button onClick={() => setSearchQuery('')} className="font-bold underline ml-1">Limpar</button>
              </div>
            )}
          </div>

          {/* Abas */}
          <div className="flex justify-center space-x-1 md:space-x-8 border-b border-slate-200 pb-px mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 pb-4 px-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 relative border-b-2 ${
                  activeCategory === cat.id
                    ? 'text-[#E30613] border-[#E30613]'
                    : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <Icon name={cat.icon} size={16} className={activeCategory === cat.id ? 'text-[#E30613]' : 'text-slate-400'} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Cards de Produtos */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white border border-slate-200">
              <Icon name="SearchCode" className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-sm text-slate-500 font-bold">Nenhum produto correspondente a esta busca nesta categoria.</p>
              <button onClick={() => { setSearchQuery(''); }} className="mt-2 text-xs text-[#E30613] font-bold underline">Mostrar todos</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-none border border-slate-200 overflow-hidden flex flex-col group hover:shadow-2xl hover:border-[#E30613]/50 transition-all duration-300 relative"
                >
                  {/* Fita / Badge de Tag (Novo, Oferta, Premium) */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-[#E30613] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-none z-20 shadow-md">
                      {product.tag}
                    </span>
                  )}

                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy" 
                    />
                    
                    {/* Efeito meio a meio da Lente Fotocromática */}
                    {product.hasSplitVisual && (
                      <div className="absolute inset-0 flex pointer-events-none z-10">
                        <div className="w-1/2 h-full bg-transparent relative">
                          <span className="absolute bottom-2 left-2 text-[9px] font-black uppercase tracking-wider text-slate-800 bg-white/90 px-2 py-0.5 border border-slate-200">No Ambiente</span>
                        </div>
                        <div className="w-1/2 h-full bg-slate-950/65 border-l-2 border-dashed border-white/60 backdrop-contrast-[1.1] relative">
                          <span className="absolute bottom-2 right-2 text-[9px] font-black uppercase tracking-wider text-white bg-[#E30613] px-2 py-0.5">Sob o Sol</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-[#E30613]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-950 border border-white">Orçamento WhatsApp</span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-display font-extrabold text-slate-900 uppercase tracking-wide">{product.name}</h3>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#E30613] bg-[#E30613]/5 border border-[#E30613]/20 px-2 py-0.5">
                          {product.brand || 'Original'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{product.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block text-[9px] text-slate-400 uppercase tracking-widest">Valor de Atacado</span>
                        <span className="text-base font-black text-[#E30613]">{product.price}</span>
                        {product.installments && (
                          <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-tighter">{product.installments}</span>
                        )}
                      </div>
                      <a 
                        href={getWhatsAppLink(`Gostaria de consultar opções, cores e condições de atacado para: ${product.brand ? '[' + product.brand + '] ' : ''}${product.name} (${product.price})`)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#E30613] hover:bg-[#B5020B] transition-all border border-[#E30613]"
                      >
                        Comprar <Icon name="ChevronRight" className="ml-1" size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BANNER EXAME DE VISTA GRATUITO */}
          <div className="mt-16 bg-[#E30613] text-white p-8 md:p-12 relative overflow-hidden shadow-lg border border-white/20">
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(45deg,#fff_25%,transparent_25%),linear-gradient(-45deg,#fff_25%,transparent_25%)] bg-[size:30px_30px]"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-none text-[10px] font-bold tracking-widest uppercase bg-white/20 text-white">
                  🩺 SAÚDE VISUAL DO TRABALHADOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  Exame de Vista Cortesia <span className="italic block mt-1">Computadorizado e Gratuito</span>
                </h3>
                <p className="text-white/95 text-sm max-w-3xl leading-relaxed">
                  Na compra do seu óculos de grau completo (Armação + Lentes) em qualquer uma de nossas óticas parceiras em Natal, a triagem visual computadorizada com o optometrista parceiro é cortesia nossa. Traga sua receita ou agende seu exame!
                </p>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right">
                <a 
                  href={getWhatsAppLink('Olá! Gostaria de agendar o meu exame de vista cortesia e consultar os modelos de armações de grau.')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#E30613] bg-white hover:bg-slate-100 transition-all"
                >
                  <Icon name="Calendar" className="mr-2" size={14} /> Agendar Agora
                </a>
              </div>

            </div>
          </div>

          {/* REDE SOCIAL E INSTAGRAM */}
          <div className="mt-8 border border-slate-200 bg-white p-6 md:p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4 text-left">
              <span className="p-3 bg-[#E30613]/10 text-[#E30613] rounded-none">
                <Icon name="Instagram" size={24} />
              </span>
              <div>
                <h4 className="font-display font-black text-slate-900 text-base uppercase tracking-wider">Acompanhe no Instagram</h4>
                <p className="text-xs text-slate-500">Siga @emporiodosoculosrn e fique por dentro das novidades, lançamentos e promoções relâmpago.</p>
              </div>
            </div>
            <a 
              href="https://www.instagram.com/emporiodosoculosrn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-[#E30613] transition-all"
            >
              Visitar @emporiodosoculosrn <Icon name="ExternalLink" className="ml-2" size={12} />
            </a>
          </div>

        </div>
      </section>

      {/* SEÇÃO TÉCNICA - LABORATÓRIO */}
      <section id="sobre" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Foto Real do Laboratório */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-3 border-2 border-[#E30613]/25 transform -translate-x-2 translate-y-2 pointer-events-none"></div>
                <div className="relative bg-[#0F172A] p-2 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Laboratório Computadorizado" 
                    className="w-full h-96 object-cover filter brightness-95" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Descrição e Qualidade */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E30613] bg-[#E30613]/10 px-3 py-1 border border-[#E30613]/20">Precisão Micrométrica</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 leading-tight uppercase">
                  Laboratório computadorizado <span className="text-[#E30613] italic font-medium">próprio e ágil</span>
                </h2>
              </div>
              
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light text-center lg:text-left">
                {storeData.aboutText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 p-5 bg-[#F7F6F2] border border-slate-200">
                  <span className="p-3 bg-[#E30613] text-white rounded-none">
                    <Icon name="Award" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide">Qualidade Garantida</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Montagem e ajuste rápido das lentes respeitando rigorosamente a receita médica.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-5 bg-[#F7F6F2] border border-slate-200">
                  <span className="p-3 bg-[#E30613] text-white rounded-none">
                    <Icon name="Timer" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide">Óculos Pronto no Dia</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Dependendo do grau e da disponibilidade de estoque, lentes montadas em tempo recorde.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== SEÇÃO: DEPOIMENTOS DE CLIENTES (WOW Factor) ===================== */}
      <section className="py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">Quem compra, aprova</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              O que dizem nossos <span className="text-[#E30613] italic font-medium">clientes</span>
            </h2>
            <div className="w-16 h-1 bg-[#E30613] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              A satisfação dos nossos clientes de Natal e região metropolitana é nossa maior prioridade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-[#E30613] mb-4">
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Fui no showroom no Carrefour da Prudente e o atendimento foi sensacional. Comprei um óculos completo com lente Transitions e ficou pronto muito rápido. Preço de atacado mesmo!"
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Mariana Souza" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Mariana Souza</h4>
                  <span className="text-[10px] text-slate-400">Cliente de Lagoa Nova</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-[#E30613] mb-4">
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Melhor preço de Ray-Ban em Natal. Já pesquisei em vários shoppings e o preço deles no pix é imbatível. Originalidade e nota fiscal garantida. Recomendo demais!"
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Ricardo Alves" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Ricardo Alves</h4>
                  <span className="text-[10px] text-slate-400">Cliente de Capim Macio</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-[#E30613] mb-4">
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
                <Icon name="Star" size={16} className="fill-[#E30613] text-[#E30613]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Precisei de um óculos de grau urgente com filtro de luz azul pois trabalho muito no computador. Fizeram a montagem em menos de 1 hora no laboratório próprio. Nota 10!"
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Beatriz Cavalcanti" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Beatriz Cavalcanti</h4>
                  <span className="text-[10px] text-slate-400">Cliente de Ponta Negra</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== SEÇÃO: FAQ INTERATIVO (WOW Factor) ===================== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">Dúvidas Frequentes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Perguntas <span className="text-[#E30613] italic font-medium">Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-[#E30613] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Encontre respostas rápidas para as principais dúvidas sobre nossos atendimentos, prazos e produtos.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Como funciona o Exame de Vista Cortesia?",
                a: "Na compra de qualquer óculos de grau completo (armação + lentes) em nosso showroom, o valor da consulta de triagem computadorizada com o optometrista parceiro é 100% gratuito, pago pela própria loja como cortesia."
              },
              {
                q: "Qual o prazo médio de montagem dos óculos?",
                a: "Para lentes em estoque (graus comuns), a montagem em nosso laboratório próprio computadorizado é realizada em até 1 hora. Para lentes especiais ou de fabricação laboratorial (ex: multifocais de alta definição), o prazo varia de 2 a 5 dias úteis."
              },
              {
                q: "Os óculos e grifes são realmente originais?",
                a: "Sim, absolutamente. Todas as armações e óculos de sol expostos em nossa vitrine (Ray-Ban, Oakley, Persol, Versace, etc.) são 100% originais, acompanhados de estojo oficial, certificado do fabricante, garantia nacional de 1 ano e nota fiscal eletrônica."
              },
              {
                q: "Quais são as formas de pagamento aceitas?",
                a: "Aceitamos cartões de crédito (parcelamento em até 10x sem juros ou 12x dependendo do produto), pagamento via Pix com desconto adicional, boleto bancário e também dispomos de crediário próprio mediante aprovação de cadastro na loja."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left text-slate-950 font-display font-black text-sm uppercase tracking-wide"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name={openFaqIndex === idx ? "Minus" : "Plus"}
                    className={`text-[#E30613] transition-transform duration-300`}
                    size={16}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === idx ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-slate-600 leading-relaxed font-light bg-white">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SEÇÃO: INSTAGRAM REEL GALLERY (WOW Factor) ===================== */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-t-4 border-[#E30613]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">#emporiodosoculosrn</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase">
              Siga nosso <span className="text-[#E30613] italic font-medium">Instagram</span>
            </h2>
            <div className="w-16 h-1 bg-[#E30613] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Veja nossos últimos lançamentos e fotos de clientes que usam e recomendam a maior ótica atacadista de Natal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400"
            ].map((img, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/emporiodosoculosrn/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-slate-900 border border-slate-800 block"
              >
                <img
                  src={img}
                  alt={`Instagram Post ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 bg-[#E30613]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <Icon name="Instagram" size={24} className="text-white" />
                  <span className="text-[9px] uppercase tracking-wider font-bold text-white mt-1.5">Ver Post</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/emporiodosoculosrn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-xs font-black uppercase tracking-wider text-white bg-[#E30613] hover:bg-[#B5020B] transition-all"
            >
              <Icon name="Instagram" className="mr-2" size={16} /> @emporiodosoculosrn
            </a>
          </div>
        </div>
      </section>

      {/* ===================== LOCALIZAÇÃO E MAPA DETALHADO ===================== */}
      <section id="localizacao" className="py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">Venha nos Visitar</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">Nosso Showroom no Atacadão</h2>
            <div className="w-16 h-1 bg-[#E30613] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Estamos localizados no Carrefour Prudente de Morais com estacionamento privativo grátis e ambiente climatizado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Contatos */}
            <div className="lg:col-span-5 bg-white p-8 border border-slate-200 flex flex-col justify-between space-y-8 shadow-sm">
              <div className="space-y-6">
                <h3 className="text-lg font-display font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">Endereço e Contatos</h3>
                
                <div className="space-y-4">
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 text-slate-500 shrink-0">
                      <Icon name="MapPin" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Localização Oficial</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{storeData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 text-slate-500 shrink-0">
                      <Icon name="Phone" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">WhatsApp Atendimento</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{storeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 text-slate-500 shrink-0">
                      <Icon name="Clock" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Horários de Showroom</h4>
                      <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Botões de Google Maps e Waze */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#E30613] hover:bg-[#B5020B] transition-all"
                >
                  <Icon name="Phone" className="mr-2" size={16} /> Chamar no WhatsApp
                </a>
                
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={storeData.googleMapsDirectionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center px-4 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-center"
                  >
                    <Icon name="Navigation" className="mr-1.5 text-slate-500" size={13} /> Google Maps
                  </a>
                  <a 
                    href="https://www.waze.com/ul?ll=-5.811394599999999,-35.216391&navigate=yes" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center px-4 py-3.5 text-[10px] font-bold uppercase tracking-wider text-white bg-sky-500 hover:bg-sky-600 transition-all text-center"
                  >
                    <Icon name="Compass" className="mr-1.5" size={13} /> Abrir no Waze
                  </a>
                </div>
              </div>
            </div>

            {/* Iframe Mapa */}
            <div className="lg:col-span-7 h-96 lg:h-auto border border-slate-200 bg-white p-2">
              <iframe 
                src={storeData.googleMapsEmbedUrl} 
                className="w-full h-full border-0 filter brightness-[0.98] contrast-[1.02]" 
                allowFullScreen={false} 
                loading="lazy" 
                title="Localização da Ótica em Natal"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== FOOTER COMPLETO DE 4 COLUNAS (Do Novo HTML) ===================== */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t-2 border-[#E30613]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Coluna 1: Institucional */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Institucional</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre a Empório dos Óculos</a></li>
                <li><a href="#localizacao" className="hover:text-white transition-colors">Nossas lojas</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de falar sobre trabalhar na ótica.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de informações sobre parcerias e franquias.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Seja um franqueado</a></li>
              </ul>
            </div>
            
            {/* Coluna 2: Atendimento */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Atendimento</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#simulador" className="hover:text-white transition-colors">Central de ajuda</a></li>
                <li><a href={getWhatsAppLink('Olá! Quero tirar dúvidas sobre trocas e devoluções.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Política de troca e devolução</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de consultar as políticas de privacidade.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
              </ul>
            </div>
            
            {/* Coluna 3: Redes Sociais */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Acompanhe-nos</h4>
              <ul className="space-y-2 text-xs">
                {storeData.instagramUrl && <li><a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Instagram" size={13} className="mr-2 text-[#E30613]" /> Instagram</a></li>}
                {storeData.facebookUrl && <li><a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Facebook" size={13} className="mr-2 text-[#E30613]" /> Facebook</a></li>}
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Icon name="Youtube" size={13} className="mr-2 text-[#E30613]" /> YouTube</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Icon name="Smile" size={13} className="mr-2 text-[#E30613]" /> TikTok</a></li>
              </ul>
            </div>
            
            {/* Coluna 4: Formas de Pagamento */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Formas de Pagamento</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">💳 Cartões</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">⚡ Pix</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">📄 Boleto</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">✍️ Crediário</span>
              </div>
            </div>

          </div>

          {/* Rodapé inferior com Logo e CNPJ */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs">
            <div className="space-y-2">
              <Logo className="h-10 mx-auto md:mx-0" horizontal={true} />
              <p className="text-[10px] text-slate-500 font-light max-w-md leading-relaxed mt-2">
                © {new Date().getFullYear()} Empório dos Óculos – Atacado da Prudente. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-2 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              <p>CNPJ: 22.456.918/0001-82</p>
              <p>
                Desenvolvido por{' '}
                <a 
                  href="https://github.com/FalAiquoc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:text-white transition-colors text-slate-400"
                >
                  Diogo Falcão (FalAiquoc)
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
