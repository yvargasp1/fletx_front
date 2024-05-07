import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/Product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private URL = environment.api;

  public saveProduct(data: Product) {
    return this.http.post<Product>(`${this.URL}/products`, data);
  }
  public editProduct(id: any, data: Product) {
    return this.http.patch<Product>(`${this.URL}/products/${id}`, data);
  }

  public getProducts(
    sort: string | null,
    category: any | null,
    order: any | null
  ) {
    let params = new HttpParams();

    if (sort) {
      params = params.set('sort', sort);
    }

    if (category) {
      params = params.set('category', category);
    }
    if (order) {
      params = params.set('order', order);
    }
    return this.http.get<any>(`${this.URL}/products`, { params });
  }
  public deleteProduct(id: any) {
    return this.http.delete<Product>(`${this.URL}/products/${id}`);
  }
}
