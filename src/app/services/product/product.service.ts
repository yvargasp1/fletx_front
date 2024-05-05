import { HttpClient } from '@angular/common/http';
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
}
