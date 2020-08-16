import { Injectable, Query } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list("/orders").valueChanges();
  }

  getOrderByUser(userId) {
    return this.db
      .list("/orders", (query) => query.orderByChild("userId").equalTo(userId))
      .valueChanges();
  }
}
