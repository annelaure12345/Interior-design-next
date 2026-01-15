export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'furniture' | 'decor' | 'lighting' | 'textiles' | 'accessories';
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  email: string;
  address: string;
  phone: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}
