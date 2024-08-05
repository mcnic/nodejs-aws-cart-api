import { Exclude } from 'class-transformer';
import { CartItem } from '../../cart/models';
import { User } from 'src/users';

export enum OrderStatuses {
  CREATED = 'CREATED',
  SHIPPED = 'SHIPPED',
}
export class Order {
  id?: string;
  @Exclude()
  user_id: string;
  @Exclude()
  user: User;
  @Exclude()
  cart_id: string;
  items: CartItem[];
  payment?: Payment;
  delivery?: Delivery;
  comments?: string;
  status: OrderStatuses;
  total: number;
}

export type Payment = {
  type: string;
  address?: any;
  creditCard?: any;
};

export type Delivery = {
  type: string;
  address: any;
};

export type OrderDto = Omit<Order, 'id'>;

export type OrderItem = {
  productId: string;
  count: number;
};

export type OrderResponse = {
  id: string;
  addderss: any;
  items: OrderItem[];
  statusHistory: any;
}[];
