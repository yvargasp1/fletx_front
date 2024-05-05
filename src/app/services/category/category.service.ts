import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/Category.dto';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private URL = environment.api;

  constructor(private http :HttpClient){

  }

  public getAll(){
    return this.http.get<any>(`${this.URL}/categories`)
  }

  public saveCategory(data:Category){
    return this.http.post<Category>(`${this.URL}/categories`,data);
  }
}
