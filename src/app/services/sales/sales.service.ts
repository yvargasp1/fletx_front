import { Injectable } from '@angular/core';
import { Sale } from '../../models/Sale.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}
  private URL = environment.api;

  public saveSale(data: Sale[]) {
    return this.http.post<any>(`${this.URL}/sales`, data);
  }
  public getAll() {
    return this.http.get<any>(`${this.URL}/sales`);
  }
  public deleteSale(id: any) {
    return this.http.delete<Sale>(`${this.URL}/sales/${id}`);
  }
}
