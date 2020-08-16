import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "shared/services/product.service";
import { Subscription } from "rxjs";
import { Product } from "app/shared/models/product";
import { ColumnMode } from "@swimlane/ngx-datatable/public-api";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  rows = [];
  ColumnMode: ColumnMode;
  itemsCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.rows = this.products = products;
    });
  }

  filter(query) {
    this.rows = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
