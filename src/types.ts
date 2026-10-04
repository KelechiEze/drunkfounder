export * from './data/slides';

export interface CartItem {
  id: string;
  slideId: string;
  name: string;
  volume: string;
  price: number;
  quantity: number;
  image: string;
}
