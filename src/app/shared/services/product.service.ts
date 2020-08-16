import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { Product } from "shared/models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  productList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  getAll(): Observable<Product[]> {
    return (this.productList = this.db.list("/products"))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(productId): Observable<Product> {
    return this.db
      .object<Product>("/products/" + productId)
      .valueChanges()
      .pipe(take(1));
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }
}
