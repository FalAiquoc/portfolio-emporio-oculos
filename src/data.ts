import type { StoreData } from './types';

export const storeData: StoreData = {
  name: 'Empório dos Óculos',
  tagline: 'O maior atacadão de óculos de Natal com preços de fábrica',
  description: 'Sua ótica de confiança em Lagoa Nova. Oferecemos as melhores marcas de armações, lentes de alta tecnologia e atendimento especializado para cuidar da sua saúde visual.',
  aboutText: 'Desde nossa fundação, a Empório dos Óculos tem como missão democratizar o acesso a óculos de qualidade em Natal. Combinamos a maior variedade de armações modernas, laboratório próprio de montagem computadorizada rápida e preços competitivos de atacado para garantir a melhor experiência para você e sua família.',
  aboutImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200',
  phone: '(84) 2030-3145',
  phoneFormatted: '8420303145',
  whatsappNumber: '5584987832401',
  whatsappMessage: 'Olá! Gostaria de agendar um atendimento ou solicitar orçamento de óculos.',
  address: 'Av. Prudente de Morais, 3720 - Lagoa Nova, Natal - RN, 59020-400',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.213271167727!2d-35.216391!3d-5.811394599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b301c435be799b%3A0xe54e6fa16b0b2302!2sAv.%20Prudente%20de%20Morais%2C%203720%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN%2C%2059020-400!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr',
  googleMapsDirectionsUrl: 'https://maps.app.goo.gl/u1XvXQ5V9c7s6b6C7',
  businessHours: {
    weekdays: 'Segunda a Sexta: 08:00 às 21:00',
    saturday: 'Sábado: 08:00 às 21:00',
    sunday: 'Domingo: Fechado',
  },
  colors: {
    primaryHex: '#0b132b', // Azul Escuro Sofisticado
    accentHex: '#d4af37',  // Dourado
  },
  typography: {
    displayFontFamily: 'Playfair Display',
    bodyFontFamily: 'Inter',
    importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap',
  },
  features: [
    {
      title: 'Laboratório Computadorizado',
      description: 'Montagem de óculos em tempo recorde com precisão digital alemã.',
      iconName: 'Activity',
    },
    {
      title: 'Preço de Atacado',
      description: 'Preços de fábrica direto para você, com condições especiais no pix.',
      iconName: 'Tag',
    },
    {
      title: 'Exame Rápido',
      description: 'Estrutura parceira para exames computadorizados e triagem da visão.',
      iconName: 'Eye',
    },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Armações de Grau Premium',
      description: 'Modelos de grife, acetato, titânio e metal com garantia e designs atuais.',
      price: 'A partir de R$ 99,90',
      iconName: 'Glasses',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-2',
      name: 'Óculos de Sol Proteção UV400',
      description: 'Coleção solar moderna com lentes polarizadas e proteção total contra raios UV.',
      price: 'A partir de R$ 120,00',
      iconName: 'Sun',
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-3',
      name: 'Lentes de Alta Tecnologia',
      description: 'Lentes antirreflexo, filtro azul (blue control), multifocais e fotocromáticas.',
      price: 'Sob consulta de receita',
      iconName: 'ShieldCheck',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600',
    },
  ],
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
};
