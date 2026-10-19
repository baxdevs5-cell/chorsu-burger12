export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'light' | 'dark';

export type Category = 'all' | 'burger' | 'combo' | 'chicken';

export interface Product {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  price: number;
  category: 'burger' | 'combo' | 'chicken';
  image: string;
  calories: number;
  weightGrams: number;
  badge?: Record<Language, string>;
  rating: number;
  ingredients: Record<Language, string[]>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BonusReward {
  id: string;
  coinsRequired: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  code: string;
  discountPercentage?: number;
  freeItemName?: Record<Language, string>;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'coin' | 'cart' | 'info';
  timestamp: number;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  address: string;
  paymentMethod: 'cash' | 'card' | 'payme' | 'click';
  notes?: string;
  promoCode?: string;
}
