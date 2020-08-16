import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/auth.service";
import { AppUser } from "shared/models/app-user";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Observable } from "rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"],
})
export class BsNavbarComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faLeaf = faLeaf;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));

    this.cart$ = await this.shoppingCartService.getCart();
    // .valueChanges()
    // .pipe(map((x) => new ShoppingCart(x.items)));
  }

  logout() {
    this.auth.logout();
  }
}
