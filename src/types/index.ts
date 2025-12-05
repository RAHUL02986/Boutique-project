export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
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
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
