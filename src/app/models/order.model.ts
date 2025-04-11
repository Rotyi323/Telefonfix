import { CartItem } from './cart-item.model';

export interface Order {
  name: string;
  email: string;
  items: CartItem[];
  message?: string;
}
