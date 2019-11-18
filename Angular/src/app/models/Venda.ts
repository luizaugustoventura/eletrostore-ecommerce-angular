
export class Venda {
  customerId: string;
  products: [{
    productId: string;
    quantity: number;
  }];
  totalPrice: number;
  date?: Date;
}
