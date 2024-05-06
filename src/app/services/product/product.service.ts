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

  public getProducts(
    sort: string | null,
    lte: number | null,
    gte: number | null,
    category: number | null
  ) {
    let params = new HttpParams();

    if (sort) {
      params = params.set('sort', sort);
    }
    if (lte) {
      params = params.set('lte', lte);
    }
    if (gte) {
      params = params.set('gte', gte);
    }
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<any>(`${this.URL}/products`, { params });
  }
}
