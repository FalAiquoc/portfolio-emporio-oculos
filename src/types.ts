export interface ProductOrService {
  id: string;
  name: string;
  description: string;
  price?: string;
  iconName: string; // Ex: 'Activity', 'ShoppingBag', etc.
  imageUrl?: string;
  category?: string; // Ex: 'grau', 'sol', 'lente'
  brand?: string; // Ex: 'Ray-Ban', 'Oakley'
  installments?: string; // Ex: 'ou 10x de R$ 91,07'
  tag?: string; // Ex: 'Novo', 'Oferta', 'Premium'
  hasSplitVisual?: boolean; // Define se o produto exibe o efeito visual de lente dividida (meio a meio)
}

export interface StoreData {
  name: string;
  tagline: string;
  description: string;
  aboutText: string;
  aboutImage?: string;
  logoUrl?: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  googleMapsEmbedUrl?: string;
  googleMapsDirectionsUrl?: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  colors: {
    primaryHex: string;
    accentHex: string;
    // Variações hexadecimais adicionais se necessário
    bgHex?: string;
  };
  typography: {
    displayFontFamily: string;
    bodyFontFamily: string;
    importUrl: string; // Ex: Google Fonts @import url
  };
  features: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
  products: Array<ProductOrService>;
  instagramUrl?: string;
  facebookUrl?: string;
  brands?: Array<{ name: string; desc: string }>;
}
