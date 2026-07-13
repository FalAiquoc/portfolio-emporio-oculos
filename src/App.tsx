import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedFaceShape, setSelectedFaceShape] = useState<string>('Oval');

  // Recomendações de armações baseadas no formato do rosto
  const faceShapes = [
    { name: 'Oval', description: 'Combina com quase todas as armações. Ideal: Armações retangulares e quadradas.', tips: 'Evite armações muito largas que possam quebrar a harmonia natural.' },
    { name: 'Redondo', description: 'Precisa de linhas marcantes. Ideal: Armações retangulares e quadradas com cantos retos.', tips: 'Evite armações redondas que acentuam o formato do rosto.' },
    { name: 'Quadrado', description: 'Precisa suavizar as linhas fortes. Ideal: Armações redondas, ovais ou estilo gatinho.', tips: 'Evite modelos muito angulares ou com linhas retas rígidas.' },
    { name: 'Coração', description: 'Testa mais larga e queixo fino. Ideal: Armações levemente mais largas na parte inferior.', tips: 'Armações do tipo aviador ou sem aro são ótimas escolhas.' }
  ];

  // Injeção de fontes e cores
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

    // Cores da Ótica
    root.style.setProperty('--p-50', '#f8fafc');
    root.style.setProperty('--p-100', '#f1f5f9');
    root.style.setProperty('--p-200', '#e2e8f0');
    root.style.setProperty('--p-300', '#cbd5e1');
    root.style.setProperty('--p-400', '#94a3b8');
    root.style.setProperty('--p-500', storeData.colors.primaryHex);
    root.style.setProperty('--p-600', '#1e293b');
    root.style.setProperty('--p-700', '#0f172a');
    root.style.setProperty('--p-800', '#020617');
    root.style.setProperty('--p-900', '#000000');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex);
    root.style.setProperty('--a-600', '#b8942b');

    document.title = `${storeData.name} — Atacado de Óculos Natal`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (msg?: string) => {
    const defaultMsg = msg || storeData.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encodeURIComponent(defaultMsg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0b132b]/95 backdrop-blur-md shadow-lg border-b border-amber-500/20 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#hero" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-semibold tracking-wide text-white">
                EMPÓRIO<span className="text-amber-500 font-sans font-bold text-lg ml-1">DOS ÓCULOS</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#simulador" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">Visagismo</a>
              <a href="#produtos" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">Armações</a>
              <a href="#sobre" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">Laboratório</a>
              <a href="#localizacao" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">Visitar</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-full transition-all hover:scale-105 shadow-md shadow-amber-500/10">
                <Icon name="Phone" className="mr-2" size={16} /> Falar com Consultor
              </a>
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-[#0b132b] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500 filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500 filter blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-amber-500/30 bg-amber-500/10 text-amber-400">
                ⭐ O Maior Atacadão de Natal/RN
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight leading-[1.1] text-white">
                Sua saúde visual com <span className="text-amber-500 italic block mt-1">estilo & exclusividade</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Armações de alta costura e lentes de precisão digital computadorizada. Preços especiais de atacado direto para você no coração de Lagoa Nova.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-full shadow-lg shadow-amber-500/20 transition-all hover:scale-105">
                  <Icon name="Phone" className="mr-2" size={20} /> Solicitar Orçamento
                </a>
                <a href="#simulador" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white border border-slate-600 hover:border-amber-500 hover:bg-amber-500/10 rounded-full transition-all">
                  <Icon name="Eye" className="mr-2" size={20} /> Teste de Visagismo
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 rounded-2xl bg-amber-500/10 transform rotate-6 scale-105 filter blur-sm"></div>
                <div className="relative bg-[#162238] p-5 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800" alt="Óculos de Sol Premium" className="w-full h-80 object-cover rounded-xl shadow-inner transition-transform duration-500 hover:scale-105" />
                  <div className="absolute top-8 right-8 bg-emerald-500 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-lg uppercase tracking-wider animate-bounce">
                    Aberto agora!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULADOR DE VISAGISMO */}
      <section id="simulador" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900">
              Descubra os Óculos <span className="text-amber-600 italic">ideais para você</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-lg">
              Nosso sistema de visagismo mapeia o formato do seu rosto e indica as melhores armações para harmonizar suas linhas expressivas.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 lg:p-12 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-slate-800">Escolha o formato do seu rosto:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {faceShapes.map((shape) => (
                    <button
                      key={shape.name}
                      onClick={() => setSelectedFaceShape(shape.name)}
                      className={`p-4 rounded-xl text-center border font-semibold transition-all ${
                        selectedFaceShape === shape.name
                          ? 'bg-[#0b132b] text-white border-[#0b132b] shadow-lg scale-105'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-[#0b132b] hover:bg-slate-50'
                      }`}
                    >
                      {shape.name}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                  <h4 className="text-lg font-bold text-[#0b132b] flex items-center">
                    <Icon name="Award" className="text-amber-500 mr-2" size={20} />
                    Resultado Recomendado:
                  </h4>
                  <p className="text-slate-700">
                    {faceShapes.find(s => s.name === selectedFaceShape)?.description}
                  </p>
                  <p className="text-sm text-slate-500 italic bg-amber-500/10 p-3 rounded-lg border-l-4 border-amber-500">
                    💡 <strong>Dica de Estilo:</strong> {faceShapes.find(s => s.name === selectedFaceShape)?.tips}
                  </p>
                  <a href={getWhatsAppLink(`Olá, fiz o teste de visagismo para o rosto ${selectedFaceShape} e gostaria de ver as armações recomendadas disponíveis.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-500 hover:underline">
                    Ver modelos disponíveis via WhatsApp <Icon name="ChevronRight" className="ml-1" size={16} />
                  </a>
                </div>
              </div>

              {/* Lado Gráfico do Simulador */}
              <div className="relative border border-slate-200 bg-white rounded-2xl p-6 flex flex-col items-center justify-center space-y-6 min-h-[350px] shadow-inner overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-radial-grid"></div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Simulador Facial Digital</h4>
                
                {/* Linha guia do Rosto */}
                <div className={`w-40 h-52 border-2 border-dashed border-[#0b132b]/40 relative flex items-center justify-center transition-all duration-500 ${
                  selectedFaceShape === 'Oval' ? 'rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%]' :
                  selectedFaceShape === 'Redondo' ? 'rounded-full' :
                  selectedFaceShape === 'Quadrado' ? 'rounded-2xl' :
                  'rounded-[40%_40%_50%_50%_/_30%_30%_70%_70%]'
                }`}>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest absolute top-4">{selectedFaceShape}</span>
                  
                  {/* Óculos de Grau Renderizados por CSS */}
                  <div className="w-28 h-8 flex items-center justify-between relative transition-all duration-300">
                    <div className={`w-12 h-8 border-2 border-[#0b132b] bg-slate-100/50 shadow-inner ${
                      selectedFaceShape === 'Quadrado' ? 'rounded-full' :
                      selectedFaceShape === 'Redondo' ? 'rounded-md' :
                      selectedFaceShape === 'Coração' ? 'rounded-[8px_8px_12px_12px]' :
                      'rounded-md'
                    }`}></div>
                    <div className="w-4 h-[2px] bg-[#0b132b]"></div>
                    <div className={`w-12 h-8 border-2 border-[#0b132b] bg-slate-100/50 shadow-inner ${
                      selectedFaceShape === 'Quadrado' ? 'rounded-full' :
                      selectedFaceShape === 'Redondo' ? 'rounded-md' :
                      selectedFaceShape === 'Coração' ? 'rounded-[8px_8px_12px_12px]' :
                      'rounded-md'
                    }`}></div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-medium">Harmonia perfeita detectada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section id="produtos" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900">
              Coleções <span className="text-amber-600 italic">mais queridas</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-lg">
              Explore uma seleção especial das nossas armações mais procuradas. Preços de atacado válidos para pagamentos no Pix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">Orçamento rápido via WhatsApp</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                        <Icon name={product.iconName} size={16} />
                      </span>
                      <h3 className="text-lg font-serif font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-bold text-slate-700">{product.price}</span>
                    <a href={getWhatsAppLink(`Gostaria de consultar a disponibilidade do produto: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-400 rounded-full transition-all">
                      Consultar <Icon name="ChevronRight" className="ml-1" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO TÉCNICA - LABORATÓRIO */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-[#0b132b] p-2">
                <img src={storeData.aboutImage} alt="Laboratório Clínico Digital" className="w-full h-[400px] object-cover rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/80 via-transparent to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Montagem Express</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900 leading-tight">
                  Precisão digital com <span className="text-amber-600 italic">laboratório de montagem próprio</span>
                </h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                {storeData.aboutText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Icon name="Award" className="text-amber-500" size={32} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Qualidade Alemã</h4>
                    <p className="text-xs text-slate-500">Lentes recortadas com precisão digital.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Icon name="Activity" className="text-[#0b132b]" size={32} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Óculos em 1 Hora</h4>
                    <p className="text-xs text-slate-500">Montagem rápida em casos sob consulta.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATOS */}
      <section id="localizacao" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900">Venha nos Visitar em Lagoa Nova</h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-lg">Ambiente amplo com showroom completo de armações e estacionamento próprio gratuito.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-100 flex flex-col justify-between space-y-8 shadow-sm">
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-slate-800">Contatos & Horários</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-500">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Endereço</h4>
                      <p className="text-sm text-slate-500">{storeData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-500">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Telefone</h4>
                      <p className="text-sm text-slate-500">{storeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-500">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Funcionamento</h4>
                      <div className="text-sm text-slate-500 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-full transition-all shadow-md shadow-amber-500/10">
                  <Icon name="Phone" className="mr-2" size={18} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all">
                  <Icon name="MapPin" className="mr-2 text-slate-500" size={18} /> Abrir no Google Maps
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full rounded-2xl border-0" allowFullScreen={false} loading="lazy" title="Localização da Ótica"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b132b] text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-3">
              <span className="text-xl font-serif text-white tracking-wide">
                EMPÓRIO<span className="text-amber-500 font-sans font-bold text-sm ml-1">DOS ÓCULOS</span>
              </span>
              <p className="text-xs text-slate-500 max-w-sm mx-auto md:mx-0">
                {storeData.tagline}
              </p>
            </div>
            <div className="text-center md:text-right space-y-4">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} Empório dos Óculos. Todos os direitos reservados.
              </p>
              <p className="text-xs text-slate-500">
                Desenvolvido com carinho por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
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
