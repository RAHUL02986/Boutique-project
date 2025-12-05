export interface Product {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  inStock: boolean;
  featured: boolean;
  sizes?: string[];
  colors?: string[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}
