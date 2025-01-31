export class ShoppingCartItem {
  key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  payload: any;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
