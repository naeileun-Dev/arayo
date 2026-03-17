export interface ServiceItem {
  key: string;
  label: string;
  isActive: boolean;
}

export interface QuoteItem {
  id: string;
  title: string;
  state: 'used' | 'new' | 'hold' | 'sold';
  contactName: string;
  phone: string;
  priceLabel: string;
  price: string;
  priceTag?: string;
  manufacturer: string;
  modelName: string;
  manufactureDate: string;
  location: string;
  warrantyPeriod: string;
  equipmentType: string;
  description: string;
  services: ServiceItem[];
}

export interface ReceivedQuoteScreenProps {
  quotes?: QuoteItem[];
  onClose?: () => void;
  onContact?: (quoteId: string) => void;
  onChat?: (quoteId: string) => void;
  onCall?: (quoteId: string) => void;
  onMessage?: (quoteId: string) => void;
}
