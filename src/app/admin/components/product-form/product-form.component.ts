import { Component, OnInit } from "@angular/core";
import { CategoryService } from "shared/services/category.service";
import { ProductService } from "shared/services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product: any = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.productService.get(this.id).subscribe((p) => (this.product = p));
    }
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }

  ngOnInit(): void {}
}
