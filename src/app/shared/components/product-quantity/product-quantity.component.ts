import { Component, Input } from "@angular/core";
import { Product } from "shared/models/product";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.css"],
})
export class ProductQuantityComponent {
  @Input("product") product: Product;
  @Input("shopping-cart") shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  //   getQuantity() {
  //     if (!this.shoppingCart) return 0;

  //     let item = this.shoppingCart.itemsMap[this.product.key];
  //     return item ? item.quantity : 0;
  //   }
}
