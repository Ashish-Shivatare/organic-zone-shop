import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Product } from "shared/models/product";
import { take, map } from "rxjs/operators";
import { ShoppingCart } from "shared/models/shopping-cart";
import { ShoppingCartItem } from "shared/models/shopping-cart-item";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .object("/shopping-carts/" + cartId)
      .snapshotChanges()
      .pipe(map((x) => new ShoppingCart(x.payload.child("items").val())));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: ShoppingCartItem) => {
        let quantity = (item ? item.quantity || 0 : 0) + change;

        if (!quantity) items$.remove();
        else
          items$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity,
          });
      });
  }
}
